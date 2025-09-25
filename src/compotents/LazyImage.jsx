import React, { useState } from "react";

export default function LazyImage({ src, alt}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`lazy-img ${isLoaded ? "loaded" : ""}`}
      onLoad={() => setIsLoaded(true)}
    />
  );
}
