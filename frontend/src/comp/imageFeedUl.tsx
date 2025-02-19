import Paper from "@mui/material/Paper";
import { articleType } from "../pages/ImageFeed copy";
import React from "react";

interface UlProps {
  list: articleType[];
  sentinelRef?: React.RefObject<HTMLDivElement>;
}

function Ul({ list, sentinelRef }: UlProps) {
  return (
    <>
      <ul>
        {list.map((e) => (
          <li key={e.id + "-" + e.author} style={{ listStyleType: "none" }}>
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
      <div
        ref={sentinelRef}
        style={{ height: "200px", backgroundColor: "red" }}
      ></div>
    </>
  );
}

export default React.memo(Ul);
