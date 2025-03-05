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
  const [imageCount, setImageCount] = useState(0);
  const [view, setView] = useState<articleType[]>([]);

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
  }, [view]);

  useEffect(() => {
    if (entriess.length > 0) {
      setView((prev) => [
        ...prev,
        ...entriess.slice(imageCount, imageCount + 10),
      ]);
      console.log("image count: " + imageCount + " view: " + view);
      setImageCount(imageCount + 10);
    }
  }, [entriess, page]);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${8}&limit=500`)
      .then((resp) => resp.json())
      .then((data) => {
        try {
          if (data) {
            const newData: articleType[] = shuffleArray(data);
            setEntries(newData);
          }
        } catch (e) {
          console.log(e);
        }
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (view.length === 0) {
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

        <Ul list={view} />
        <div
          ref={sentinelRef}
          style={{
            height: "300px",
            width: "60%",
            marginLeft: "80px",
            marginBottom: "80px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default ImageFeedInfScrollCallback;
