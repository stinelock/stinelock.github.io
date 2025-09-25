import React, { useState, useEffect, useRef } from "react";

export default function LazyImage({ src, alt }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : undefined} // billedet loader først når det er synligt
      alt={alt}
      loading="lazy"
      className={`lazy-img ${isLoaded ? "loaded" : ""}`}
      onLoad={() => setIsLoaded(true)}
    />
  );
}
