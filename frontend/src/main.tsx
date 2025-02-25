import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import BigDataCovid from "./pages/BigDataCovid.tsx";
import ImageFeedWiki from "./pages/ImageFeedWiki.tsx";
import Statistics from "./pages/Statistics.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import BigDataCovidQuery from "./pages/BigDataCovidQuery.tsx";
import { BigDataCovidMemoQuery } from "./pages/BigDataCovidMemoQuery.tsx";
import BigDataCovidMemo from "./pages/BigDataCovidMemo/BigDataCovidMemo.tsx";
import BigDataCovidCallback from "./pages/BigDataCovidCallback/BigDataCovidCallback.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="/coviddata" element={<BigDataCovid />} />
          <Route path="/coviddatamq" element={<BigDataCovidMemoQuery />} />
          <Route path="/wikiarticle" element={<ImageFeedWiki />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/covidmemo" element={<BigDataCovidMemo />} />
          <Route path="/coviddataquery" element={<BigDataCovidQuery />} />
          <Route path="/covidcallback" element={<BigDataCovidCallback />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
