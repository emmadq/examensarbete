import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import BigDataCovid from "./pages/BigDataCovid.tsx";
import ImageFeed from "./pages/ImageFeed.tsx";
import ImageFeedLazy from "./pages/ImageFeedLazyRmemo.tsx";

import Statistics from "./pages/Statistics.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import BigDataCovidPagination from "./pages/BigDataCovidPagination.tsx";

const queryClient = new QueryClient();

const AppL = lazy(() => import("./App.tsx"));
const BigDataCovidL = lazy(() => import("./pages/BigDataCovid.tsx"));
const ImageFeedL = lazy(() => import("./pages/ImageFeed.tsx"));
const ImageFeedLazyL = lazy(() => import("./pages/ImageFeedLazyRmemo.tsx"));
const ImageFeedPaginationL = lazy(
  () => import("./pages/ImageFeedInfScroll.tsx")
);

const StatisticsL = lazy(() => import("./pages/Statistics.tsx"));
const BigDataCovidPaginationL = lazy(
  () => import("./pages/BigDataCovidPagination.tsx")
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<AppL />} />
            <Route path="/coviddata" element={<BigDataCovidL />} />
            <Route
              path="/coviddatapagination"
              element={<BigDataCovidPaginationL />}
            />
            <Route path="/article" element={<ImageFeedL />} />
            <Route path="/articleLazy" element={<ImageFeedLazyL />} />
            <Route path="/articlePagi" element={<ImageFeedPaginationL />} />

            <Route path="/statistics" element={<StatisticsL />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
