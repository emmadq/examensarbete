import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

function ImageFeedWiki() {
  type articleType = {
    pageid: number;
    title: string;
    extract?: string; // Sammanfattning
    thumbnail?: {
      source: string;
      width: number;
      height: number;
    };
    fullurl?: string;
  };
  const [pages, setPages] = useState<articleType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomArticles = async () => {
      try {
        const url =
          "https://en.wikipedia.org/w/api.php?" +
          new URLSearchParams({
            action: "query",
            generator: "random",
            grnnamespace: "0", // Bara artiklar (ns=0)
            grnlimit: "100", // Hämta 10 sidor
            prop: "extracts|pageimages|info",
            exintro: "2", // Hämta bara introduktionsdelen
            explaintext: "1", // Ta bort HTML, ge ren text
            pithumbsize: "200", // Storlek på ev. thumbnail-bild
            inprop: "url", // Lägg till fullurl i svaret
            formatversion: "2",
            origin: "*", // CORS
            format: "json",
          }).toString();

        const response = await fetch(url);
        const data = await response.json();

        if (data?.query?.pages) {
          setPages(data.query.pages);
        }
      } catch (err) {
        console.error(err);
        setError("Kunde inte hämta data från Wikipedia.");
      }
    };

    fetchRandomArticles();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Slumpmässiga Wikipedia-artiklar</h1>
      <ul>
        {pages.map((page) => (
          <li key={page.pageid} style={{ listStyleType: "none" }}>
            <Paper elevation={7}>
              <h2>{page.title}</h2>
              {page.thumbnail && (
                <img
                  src={page.thumbnail.source}
                  alt={page.title}
                  width={page.thumbnail.width}
                  height={page.thumbnail.height}
                />
              )}
              {page.extract && <p>{page.extract}</p>}
              {page.fullurl && (
                <p>
                  <a
                    href={page.fullurl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Läs mer
                  </a>
                </p>
              )}
            </Paper>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageFeedWiki;
