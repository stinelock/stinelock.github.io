import { useState, useRef, useEffect } from "react";

export default function LazyImage({ src, alt }) {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {isVisible && (
        <img
          src={src}
          alt={alt}
          ref={ref}
          onLoad={() => setLoaded(true)}
          className={`lazy-img ${loaded ? "loaded" : ""}`}
        />
      )}
      {!isVisible && (
        <img ref={ref} alt={alt} className="lazy-placeholder" />
      )}
    </>
  );
}


