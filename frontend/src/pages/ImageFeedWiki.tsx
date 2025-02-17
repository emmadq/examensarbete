<<<<<<< HEAD
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
=======
import { CircularProgress, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
>>>>>>> a78592a0adb1a3e148fe374a25f29ef2d2073995

function ImageFeedWiki() {
  type articleType = {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
  };
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
    const totalPages = 10;
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=500`)
      .then((resp) => resp.json())
      .then((data) => {
        try {
          if (data) {
            setEntries(shuffleArray(data));
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

      <ul>
        {entries.map((e) => (
          <li key={e.id} style={{ listStyleType: "none" }}>
            <Paper elevation={10}>
              <br />
              <h2>{e.author}</h2>
              {e.url && (
                <img
                  src={e.download_url}
                  alt={e.author}
                  width={600}
                  height={400}
                />
              )}
              {e.url && (
                <p>
                  <a href={e.url} target="_blank" rel="noopener noreferrer">
                    Mer info
                  </a>
                </p>
              )}
              <br />
            </Paper>
            <br />
            <br />
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageFeedWiki;
