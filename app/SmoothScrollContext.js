"use client";
import React, { createContext, useState, useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

export const SmoothScrollContext = createContext({
  scroll: null,
});

export const SmoothScrollProvider = ({ children }) => {
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    if (!scroll) {
      setScroll(new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
      }));
    }

    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, [scroll]);

  return (
    <SmoothScrollContext.Provider value={{ scroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
