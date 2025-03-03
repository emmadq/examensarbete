import { useEffect, useRef, useState } from "react";
import Ul from "../../comp/imageFeedUlRmemo";
import useShuffleArray from "../../comp/shuffleArray";

export type articleType = {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

function ImageFeedInfScrollCallback() {
  const [entriess, setEntries] = useState<articleType[]>([]);
  const [page, setPage] = useState(0);

  const [error] = useState<string | null>(null);
  const shuffleArray = useShuffleArray<articleType>();

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
      { rootMargin: "0px", threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${8}&limit=${10}`)
      .then((resp) => resp.json())
      .then((data) => {
        try {
          if (data) {
            const newData: articleType[] = shuffleArray(data);
            setEntries((prev) => [...prev, ...newData]);
          }
        } catch (e) {
          console.log(e);
        }
      });
  }, [page]);

  if (error) {
    return <div>{error}</div>;
  }

  if (entriess.length < 0) {
    return (
      <>
        <h2>Loading...</h2>;
      </>
    );
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
        <h1>Infinite Scroll + callback list</h1>

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

export default ImageFeedInfScrollCallback;
