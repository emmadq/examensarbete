import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Ul from "../comp/imageFeedUl";

export type articleType = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

function ImageFeed() {
  const [entries, setEntries] = useState<articleType[]>([]);
  const [page, setPage] = useState(1);

  const [error] = useState<string | null>(null);

  function shuffleArray<T>(array: T[]): T[] {
    const newArr = [...array];

    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    const returnArray = newArr.slice(0, 10);

    return returnArray;
  }

  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log("IntersectionObserver fired!", entries);

        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [sentinelRef]);

  useEffect(() => {
    // const cachedData = localStorage.getItem("picsumImagesPagination");

    // if (cachedData) {
    //   setEntries(JSON.parse(cachedData));
    //   return;
    // }

    const totalPages = 10;
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=100`)
      .then((resp) => resp.json())
      .then((data) => {
        try {
          if (data) {
            const newData: articleType[] = shuffleArray(data);
            setEntries((prev) => [...prev, ...newData]);

            // localStorage.setItem(
            //   "picsumImagesPagination",
            //   JSON.stringify(entries)
            // );
          }
        } catch (e) {
          console.log(e);
        }
      });
  }, [page]);

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

  console.log(page);

  return (
    <div>
      <h1>Slumpmässiga bilder från Unsplash</h1>

      <Ul list={entries} sentinelRef={sentinelRef} />
      <div style={{ height: "200px" }}></div>
    </div>
  );
}

export default ImageFeed;
