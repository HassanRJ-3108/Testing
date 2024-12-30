import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevOffset, setPrevOffset] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      const currentOffset = window.pageYOffset;
      const isScrolledDown = prevOffset < currentOffset;
      const isScrolledUp = prevOffset > currentOffset;
      const isScrolledToTop = currentOffset < 10;

      setVisible(isScrolledToTop || isScrolledUp);
      setScrollDirection(isScrolledDown ? "down" : "up");
      setPrevOffset(currentOffset);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [prevOffset]);

  return { scrollDirection, visible };
}

