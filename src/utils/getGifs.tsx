// getGifs.tsx
import { GiphyImage } from "./GiphyImage";

export const getGifs = async (category: string) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=KLR7DbWIMUTYh0tHQcezfS6oVsDrnaBy&q=${category}&limit=8`;
  const resp = await fetch(url);
  const { data } = await resp.json();

  const gifs = data.map((img: GiphyImage) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }));

  return gifs;
};
