import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
// import BigDataCovid from "./pages/BigDataCovid.tsx";
// import ImageFeed from "./pages/ImageFeedBaseList.tsx";
// import ImageFeedLazy from "./pages/ImageFeedLazyRmemo.tsx";
import Nav from "./pages/Nav.tsx";

// import Statistics from "./pages/Statistics.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
// import BigDataCovidPagination from "./pages/BigDataCovidPagination.tsx";

const queryClient = new QueryClient();

const AppL = lazy(() => import("./App.tsx"));
const BigDataCovidL = lazy(() => import("./pages/BigDataCovid.tsx"));
const ImageFeedShowL = lazy(() => import("./pages/ShowPages.tsx"));
const ImageFeedL = lazy(() => import("./pages/ImageFeedBaseList.tsx"));
const ImageFeedRmemoL = lazy(() => import("./pages/ImageFeedRmemo.tsx"));
const ImageFeedCallbaclMemoL = lazy(
  () => import("./pages/ImageFeedCallbackMemo.tsx")
);
const ImageFeedLazyL = lazy(() => import("./pages/ImageFeedLazyRmemo.tsx"));
const ImageFeedInfScrollL = lazy(
  () => import("./pages/ImageFeedInfScroll.tsx")
);
const ImageFeedInfScrollCallbackL = lazy(
  () => import("./pages/ImageFeedInfScrollCallback.tsx")
);

const StatisticsL = lazy(() => import("./pages/Statistics.tsx"));
const BigDataCovidPaginationL = lazy(
  () => import("./pages/BigDataCovidPagination.tsx")
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Nav>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route index element={<AppL />} />
              <Route path="/coviddata" element={<BigDataCovidL />} />
              <Route
                path="/coviddatapagination"
                element={<BigDataCovidPaginationL />}
              />
              <Route path="/ShowImageFeed" element={<ImageFeedShowL />} />
              <Route path="/article" element={<ImageFeedL />} />
              <Route path="/articleRmemo" element={<ImageFeedRmemoL />} />
              <Route
                path="/articleRmemoCallbMemo"
                element={<ImageFeedCallbaclMemoL />}
              />

              <Route path="/articleLazy" element={<ImageFeedLazyL />} />
              <Route
                path="/articleInfScroll"
                element={<ImageFeedInfScrollL />}
              />
              <Route
                path="/articleInfScrollCallback"
                element={<ImageFeedInfScrollCallbackL />}
              />
              <Route path="/statistics" element={<StatisticsL />} />
            </Routes>
          </Suspense>
        </Nav>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
