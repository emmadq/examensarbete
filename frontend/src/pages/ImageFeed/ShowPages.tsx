import Base from "./ImageFeedBaseList";
import LazyRmemo from "./ImageFeedLazyRmemo";
import Rmemo from "./ImageFeedRmemo";
import InfScroll from "./ImageFeedInfScroll";
import RmemoCallbackMemo from "./ImageFeedCallbackMemo";
import InfScrollCallback from "./ImageFeedInfScrollCallback";
import RmemoQuery from "./ImageFeedRmemoQuery.tsx";
import { useState } from "react";

function ShowImageFeed() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((prev) => prev + 1);
    // window.location.reload();
  };

  const handleClick2 = () => {
    // localStorage.removeItem("picsumImages");
    localStorage.clear();
  };

  return (
    <>
      <button onClick={handleClick}>Rerender {counter}</button>
      <button onClick={handleClick2}>Clear localStorage</button>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Base />
        <Rmemo />
        <RmemoCallbackMemo />
        <LazyRmemo />
        <RmemoQuery />
        <InfScroll />
        <InfScrollCallback />
      </div>
    </>
  );
}

export default ShowImageFeed;
