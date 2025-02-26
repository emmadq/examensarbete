import Paper from "@mui/material/Paper";
import { articleType } from "../pages/ImageFeedInfScroll";
import React from "react";

interface UlProps {
  list: articleType[];
}

function UlRmemo({ list }: UlProps) {
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {list.map((e, index) => (
        <li key={index + e.id} style={{ listStyleType: "none" }}>
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
  );
}

export default React.memo(UlRmemo);
