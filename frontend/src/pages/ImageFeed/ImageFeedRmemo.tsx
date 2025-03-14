import { useEffect, useState } from "react";
import { articleType } from "./ImageFeedInfScroll";
import UlComp from "../../comp/imageFeedUlRmemo";
import React from "react";

function ImageFeedRmemo() {
  const [entries, setEntries] = useState<articleType[]>([]);
  const [error] = useState<string | null>(null);

  function shuffleArray<T>(array: T[]): T[] {
    const newArr = [...array];

    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    // const returnArray = newArr.slice(0, 100);

    return array;
  }

  useEffect(() => {
    const cachedData = localStorage.getItem("picsumImages");

    if (cachedData) {
      const data: articleType[] = JSON.parse(cachedData);
      data.length > 0
        ? setEntries(data)
        : console.log("entries not set by localstorage");
      return;
    }

    fetch(`https://picsum.photos/v2/list?page=${8}&limit=500`)
      .then((resp) => resp.json())
      .then((data) => {
        try {
          if (data) {
            const list: articleType[] = shuffleArray(data);
            console.log("nu kör sätt entries" + list);
            localStorage.setItem("picsumImages", JSON.stringify(list));
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
    <div>
      <h1>React memo list</h1>
      <UlComp list={entries} />
    </div>
  );
}

export default React.memo(ImageFeedRmemo);
