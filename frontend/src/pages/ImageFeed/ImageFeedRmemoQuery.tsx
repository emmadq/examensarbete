import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { articleType } from "./ImageFeedInfScroll";
import UlComp from "../../comp/imageFeedUlRmemo";

async function fetchPicsumImages(): Promise<articleType[]> {
  const resp = await fetch("https://picsum.photos/v2/list?page=8&limit=500");
  if (!resp.ok) {
    throw new Error("Network response was not ok");
  }
  return resp.json();
}

function ImageFeedRmemo() {
  const [entries, setEntries] = useState<articleType[]>([]);

  const { data, isLoading, error } = useQuery<articleType[], Error>({
    queryKey: ["picsumImages"],
    queryFn: fetchPicsumImages,
  });

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
    if (data) {
      setEntries(shuffleArray(data));
      return;
    }
  }, [data]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return (
      <>
        <h2>Loading...</h2>;
      </>
    );
  }

  return (
    <div>
      <h1>React memo query list</h1>
      <UlComp list={entries} />
    </div>
  );
}

export default React.memo(ImageFeedRmemo);
