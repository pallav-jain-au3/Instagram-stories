import React, { useState, useEffect } from 'react';
import './ImageLoader.css';

interface ImageLoaderProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, width, height, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (error) {
    return (
      <div
        className={`image-error ${className || ''}`}
        style={{ width, height }}
      >
        Failed to load image
      </div>
    );
  }

  return (
    <div
      className={`image-container ${className || ''}`}
      style={{ width, height }}
    >
      {isLoading && (
        <div className="image-loading">
          <div className="loading-spinner" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={isLoading ? 'loading' : ''}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
};

export default React.memo(ImageLoader); 