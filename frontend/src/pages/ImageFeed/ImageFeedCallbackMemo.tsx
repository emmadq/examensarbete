import { useEffect, useMemo, useState } from "react";
import { articleType } from "./ImageFeedInfScroll";
import UlComp from "../../comp/imageFeedUlRmemo";
import useShuffleArray from "../../comp/shuffleArray";

function ImageFeedCallbackMemo() {
  const [entries, setEntries] = useState<articleType[]>([]);
  const [error] = useState<string | null>(null);

  const shuffleArray = useShuffleArray<articleType>();

  const containerStyle: React.CSSProperties = useMemo(
    () => ({
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    }),
    []
  );

  useEffect(() => {
    const cachedData = localStorage.getItem("picsumImagesCallback");

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
            localStorage.setItem("picsumImagesCallback", JSON.stringify(list));
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
    <div style={containerStyle}>
      <div>
        <h1>React memo list + callback + usememo</h1>
        <UlComp list={entries} />
      </div>
    </div>
  );
}

export default ImageFeedCallbackMemo;
