import React, { useState } from "react";
import { getGifs } from "../../utils/getGifs";
import { GiphyImage } from "../../utils/GiphyImage";
import { RiDeleteBin6Line, RiHistoryLine, RiSearchLine } from "react-icons/ri";
import "../../styles/buscar.css";

const Buscar: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [gifs, setGifs] = useState<GiphyImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const handleSearch = async (searchCategory?: string) => {
    const query = searchCategory || category;
    if (!query) return;

    setLoading(true);
    try {
      const fetchedGifs = await getGifs(query);
      console.log("GIFs obtenidos:", fetchedGifs);
      setGifs(fetchedGifs);

      if (!searchHistory.includes(query)) {
        setSearchHistory([query, ...searchHistory].slice(0, 10));
      }
    } catch (error) {
      console.error("Error al obtener GIFs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (query: string) => {
    setCategory(query);
    handleSearch(query);
    setShowHistory(false);
  };

  const handleDeleteHistory = (index: number) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="container">
      <h1>Listado de GIFs</h1>
      <div className="input-container">
        <RiSearchLine className="search-icon" />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
          placeholder="Buscar GIFs..."
        />
        {showHistory && searchHistory.length > 0 && (
          <ul className="search-history">
            <div className="history-header">
              <span className="history-text">Historial</span>
              <button
                onClick={handleClearHistory}
                className="clear-history-btn"
              >
                Eliminar todo
              </button>
            </div>
            {searchHistory.map((item, index) => (
              <li key={index} onClick={() => handleHistoryClick(item)}>
                <div className="history-item">
                  <RiHistoryLine className="history-icon" />
                  {item}
                </div>
                <RiDeleteBin6Line
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteHistory(index);
                  }}
                  className="delete-icon"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {loading && <p>Cargando...</p>}
      <div>
        {gifs.length > 0 ? (
          <div className="gif-container">
            {gifs.map((gif, index) => (
              <div className="gif-item" key={index}>
                <h3>{gif.title}</h3>
                {gif.images && gif.images.downsized_medium ? (
                  <img src={gif.images.downsized_medium.url} alt={gif.title} />
                ) : (
                  <img
                    src={`https://media4.giphy.com/media/${gif.id}/giphy.gif`}
                    alt={gif.title}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No se encontraron GIFs</p>
        )}
      </div>
    </div>
  );
};

export default Buscar;
