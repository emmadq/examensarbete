import { useCallback } from "react";

function shuffleArray<T>() {
  return useCallback((array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return array;
  }, []);
}

export default shuffleArray;
