// GiphyImage.tsx
export interface GiphyImage {
  id: string;
  title: string;
  images: {
    downsized_medium: {
      url: string;
    };
  };
}
