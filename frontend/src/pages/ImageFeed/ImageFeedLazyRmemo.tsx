import { lazy, Suspense, useEffect, useState } from "react";
import { articleType } from "./ImageFeedInfScroll";

const UlCompLazy = lazy(() => import("../../comp/imageFeedUlRmemo"));

function ImageFeedLazyRmemo() {
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
    const cachedData = localStorage.getItem("picsumImagesLazy");

    if (cachedData) {
      const data: articleType[] = JSON.parse(cachedData);
      data.length > 0
        ? setEntries(data)
        : console.log("entries not set by localstorage");
      return;
    }

    const totalPages = 10;
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=500`)
      .then((resp) => resp.json())
      .then((data) => {
        try {
          if (data) {
            const list: articleType[] = shuffleArray(data);
            console.log("nu kör sätt entries" + list);
            localStorage.setItem("picsumImagesLazy", JSON.stringify(list));
            setEntries(list);
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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div>
        <h1>Lazy load and React Memo List</h1>
        <Suspense>
          <UlCompLazy list={entries} />
        </Suspense>
      </div>
    </div>
  );
}

export default ImageFeedLazyRmemo;
