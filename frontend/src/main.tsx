import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
// import BigDataCovid from "./pages/BigDataCovid.tsx";
// import ImageFeed from "./pages/ImageFeedBaseList.tsx";
// import ImageFeedLazy from "./pages/ImageFeedLazyRmemo.tsx";
import Nav from "./pages/Nav.tsx";

// import Statistics from "./pages/Statistics.tsx";

import { BrowserRouter, Routes, Route } from "react-router";

import BigDataCovidLocalStorage from "./pages/LocalStorage/BigDataCovidLocalStorage.tsx";
import BigDataCovidQuery from "./pages/BigDataCovidQuery.tsx";
import { BigDataCovidMemoQuery } from "./pages/BigDataCovidMemoQuery.tsx";
import BigDataCovidMemo from "./pages/BigDataCovidMemo/BigDataCovidMemo.tsx";
import BigDataCovidCallback from "./pages/BigDataCovidCallback/BigDataCovidCallback.tsx";
import BigDataCovid from "./pages/BigDataCovid.tsx";
import Statistics from "./pages/Statistics.tsx";

import { QueryClient } from "@tanstack/react-query";
import {
  persistQueryClient,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import NoPaginationStandalone from "./pages/Pagination/NoPaginationStandalone.tsx";
import PaginationStandalone from "./pages/Pagination/PaginationStandalone.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient: queryClient,
  persister: localStoragePersister,
  maxAge: Infinity,
});

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
const BigDataCovidPagination = lazy(
  () => import("./pages/Pagination/BigDataCovidPagination.tsx")
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      <BrowserRouter>
        <Nav>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/coviddata" element={<BigDataCovid />} />
              <Route path="/coviddatamq" element={<BigDataCovidMemoQuery />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/covidmemo" element={<BigDataCovidMemo />} />
              <Route path="/coviddataquery" element={<BigDataCovidQuery />} />
              <Route path="/covidcallback" element={<BigDataCovidCallback />} />
              <Route index element={<AppL />} />
              <Route path="/coviddata" element={<BigDataCovidL />} />

              <Route
                path="/coviddatapagination"
                element={<PaginationStandalone />}
              />
              <Route
                path="/coviddatanopagination"
                element={<NoPaginationStandalone />}
              />
              <Route
                path="/paginationcomparison"
                element={<BigDataCovidPagination />}
              />
              <Route
                path="/coviddatalocalstorage"
                element={<BigDataCovidLocalStorage />}
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
    </PersistQueryClientProvider>
  </StrictMode>
);
