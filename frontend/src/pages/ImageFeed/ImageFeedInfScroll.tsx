import { useEffect, useRef, useState } from "react";
import Ul from "../../comp/imageFeedUl";

export type articleType = {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

function ImageFeedInfScroll() {
  const [entriess, setEntries] = useState<articleType[]>([]);
  const [page, setPage] = useState(1);

  const [error] = useState<string | null>(null);

  function shuffleArray<T>(array: T[]): T[] {
    const newArr = [...array];

    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    const returnArray = newArr.slice(0, 10);
    console.log("return array: " + returnArray);
    return returnArray;
  }

  const sentinelRef = useRef(null);
  // const options = {
  //   root: null,
  //   rootMargin: "0px",
  //   threshold: 0.5,
  // };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { rootMargin: "0px", threshold: 0.6 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [entriess]);

  useEffect(() => {
    const totalPages = 20;
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=200`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data: " + data);
        try {
          if (data) {
            const newData: articleType[] = shuffleArray(data);
            console.log("newdata: " + newData);
            setEntries((prev) => [...prev, ...newData]);
          }
        } catch (e) {
          console.log(e);
        }
      });
  }, [page]);

  console.log("entries: " + entriess);
  console.log("page: " + page);

  if (error) {
    return <div>{error}</div>;
  }

  if (entriess.length < 0) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div>
        <h1>Infinite Scroll list</h1>

        <Ul list={entriess} />

        <div
          ref={sentinelRef}
          style={{
            height: "300px",
            width: "60%",
            marginLeft: "40px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default ImageFeedInfScroll;
