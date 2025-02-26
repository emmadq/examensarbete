import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
// import BigDataCovid from "./pages/BigDataCovid.tsx";
// import ImageFeed from "./pages/ImageFeedBaseList.tsx";
// import ImageFeedLazy from "./pages/ImageFeedLazyRmemo.tsx";
// import Statistics from "./pages/Statistics.tsx";
// import BigDataCovidLocalStorage from "./pages/LocalStorage/BigDataCovidLocalStorage.tsx";
// import BigDataCovidQuery from "./pages/BigDataCovidQuery.tsx";
// import BigDataCovidMemoQuery from "./pages/BigDataCovidMemoQuery.tsx";
// import BigDataCovidMemo from "./pages/BigDataCovidMemo/BigDataCovidMemo.tsx";
// import BigDataCovidCallback from "./pages/BigDataCovidCallback/BigDataCovidCallback.tsx";
// import BigDataCovid from "./pages/BigDataCovid.tsx";
// import NoPaginationStandalone from "./pages/Pagination/NoPaginationStandalone.tsx";
// import PaginationStandalone from "./pages/Pagination/PaginationStandalone.tsx";

import Nav from "./pages/Nav.tsx";

import { BrowserRouter, Routes, Route } from "react-router";

import { QueryClient } from "@tanstack/react-query";
import {
  persistQueryClient,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

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
const BigDataCovidLocalStorageL = lazy(
  () => import("./pages/LocalStorage/BigDataCovidLocalStorage.tsx")
);
const BigDataCovidQueryL = lazy(() => import("./pages/BigDataCovidQuery.tsx"));
const BigDataCovidMemoQueryL = lazy(
  () => import("./pages/BigDataCovidMemoQuery.tsx")
);
const BigDataCovidMemoL = lazy(
  () => import("./pages/BigDataCovidMemo/BigDataCovidMemo.tsx")
);
const BigDataCovidCallbackL = lazy(
  () => import("./pages/BigDataCovidCallback/BigDataCovidCallback.tsx")
);
const BigDataCovidPaginationL = lazy(
  () => import("./pages/Pagination/BigDataCovidPagination.tsx")
);
const NoPaginationStandaloneL = lazy(
  () => import("./pages/Pagination/NoPaginationStandalone.tsx")
);
const PaginationStandaloneL = lazy(
  () => import("./pages/Pagination/PaginationStandalone.tsx")
);
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
              <Route index element={<AppL />} />
              <Route path="/coviddata" element={<BigDataCovidL />} />
              <Route path="/coviddatamq" element={<BigDataCovidMemoQueryL />} />
              <Route path="/covidmemo" element={<BigDataCovidMemoL />} />
              <Route path="/coviddataquery" element={<BigDataCovidQueryL />} />
              <Route
                path="/covidcallback"
                element={<BigDataCovidCallbackL />}
              />
              <Route
                path="/coviddatapagination"
                element={<BigDataCovidPaginationL />}
              />
              <Route
                path="/coviddatalocalstorage"
                element={<BigDataCovidLocalStorageL />}
              />
              <Route
                path="/coviddatalocalstorage"
                element={<NoPaginationStandaloneL />}
              />
              <Route
                path="/coviddatalocalstorage"
                element={<PaginationStandaloneL />}
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
