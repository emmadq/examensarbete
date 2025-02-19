import { lazy, Suspense, useEffect, useState } from "react";

export type articleType = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

const UlCompLazy = lazy(() => import("../comp/imageFeedUl"));

function ImageFeed() {
  const [entries, setEntries] = useState<articleType[]>([]);
  const [error] = useState<string | null>(null);

  function shuffleArray<T>(array: T[]): T[] {
    const newArr = [...array];

    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    const returnArray = newArr.slice(0, 100);

    return returnArray;
  }

  useEffect(() => {
    const cachedData = localStorage.getItem("picsumImages");

    if (cachedData) {
      setEntries(JSON.parse(cachedData));
      return;
    }

    const totalPages = 10;
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=500`)
      .then((resp) => resp.json())
      .then((data) => {
        try {
          if (data) {
            setEntries(shuffleArray(data));

            localStorage.setItem("picsumImages", JSON.stringify(entries));
          }
        } catch (e) {
          console.log(e);
        }
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (entries.length === 0) {
    return (
      <>
        <h2>Loading...</h2>;
      </>
    );
  }

  return (
    <div>
      <h1>Slumpmässiga bilder från Unsplash</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <UlCompLazy list={entries} />
      </Suspense>
    </div>
  );
}

export default ImageFeed;
