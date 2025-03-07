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

// import Nav from "./pages/Nav.tsx";

import { BrowserRouter, Routes, Route } from "react-router";

import { QueryClient } from "@tanstack/react-query";
import {
  persistQueryClient,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

const appInsights = new ApplicationInsights({
  config: {
    connectionString:
      "InstrumentationKey=b9c4691a-4678-47b8-bbc6-38c76c160349;IngestionEndpoint=https://swedencentral-0.in.applicationinsights.azure.com/;LiveEndpoint=https://swedencentral.livediagnostics.monitor.azure.com/;ApplicationId=10395cec-e376-4e3b-9184-63739c5e1255",
    enableAutoRouteTracking: true,
  },
});
appInsights.loadAppInsights();
appInsights.trackPageView();

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
const ReactQueryWithLocalStorageL = lazy(
  () => import("./pages/LocalStorage/ReactQueryWithLocalStorage.tsx")
);
const BigDataCovidQueryL = lazy(
  () => import("./pages/QueryReactMemo/BigDataCovidQuery.tsx")
);
const BigDataCovidMemoQueryL = lazy(
  () => import("./pages/QueryReactMemo/BigDataCovidMemoQuery.tsx")
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
const ImageFeedShowL = lazy(() => import("./pages/ImageFeed/ShowPages.tsx"));
const ImageFeedL = lazy(
  () => import("./pages/ImageFeed/ImageFeedBaseList.tsx")
);
const ImageFeedRmemoL = lazy(
  () => import("./pages/ImageFeed/ImageFeedRmemo.tsx")
);
const ImageFeedRmemoQueryL = lazy(
  () => import("./pages/ImageFeed/ImageFeedRmemoQuery.tsx")
);
const ImageFeedCallbaclMemoL = lazy(
  () => import("./pages/ImageFeed/ImageFeedCallbackMemo.tsx")
);
const ImageFeedLazyL = lazy(
  () => import("./pages/ImageFeed/ImageFeedLazyRmemo.tsx")
);
const ImageFeedInfScrollL = lazy(
  () => import("./pages/ImageFeed/ImageFeedInfScroll.tsx")
);
const ImageFeedInfScrollCallbackL = lazy(
  () => import("./pages/ImageFeed/ImageFeedInfScrollCallback.tsx")
);

const StatisticsL = lazy(() => import("./pages/Statistics.tsx"));

const BigDataCovidReactMemoL = lazy(
  () => import("./pages/QueryReactMemo/BigDataCovidReactMemo.tsx")
);
const QueryComparisonL = lazy(
  () => import("./pages/QueryReactMemo/QueryComparison.tsx")
);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      <BrowserRouter>
        {/* <Nav> */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<AppL />} />
            <Route path="/coviddata" element={<BigDataCovidL />} />
            <Route path="/covidmemo" element={<BigDataCovidMemoL />} />

            <Route
              path="/covidreactmemo"
              element={<BigDataCovidReactMemoL />}
            />
            <Route path="/coviddatamq" element={<BigDataCovidMemoQueryL />} />
            <Route path="/coviddataquery" element={<BigDataCovidQueryL />} />
            <Route path="/querycomparison" element={<QueryComparisonL />} />
            <Route path="/covidcallback" element={<BigDataCovidCallbackL />} />
            <Route
              path="/bigdatacovidpagination"
              element={<BigDataCovidPaginationL />}
            />
            <Route
              path="/ReactQueryWithLocalStorage"
              element={<ReactQueryWithLocalStorageL />}
            />
            <Route
              path="/coviddatanopagination"
              element={<NoPaginationStandaloneL />}
            />
            <Route
              path="/coviddatapaginationstandalone"
              element={<PaginationStandaloneL />}
            />
            <Route path="/ShowImageFeed" element={<ImageFeedShowL />} />
            <Route path="/article" element={<ImageFeedL />} />
            <Route path="/articleRmemo" element={<ImageFeedRmemoL />} />
            <Route
              path="/articleRmemoQuery"
              element={<ImageFeedRmemoQueryL />}
            />

            <Route
              path="/articleRmemoCallbMemo"
              element={<ImageFeedCallbaclMemoL />}
            />

            <Route path="/articleLazy" element={<ImageFeedLazyL />} />
            <Route path="/articleInfScroll" element={<ImageFeedInfScrollL />} />
            <Route
              path="/articleInfScrollCallback"
              element={<ImageFeedInfScrollCallbackL />}
            />
            <Route path="/statistics" element={<StatisticsL />} />
          </Routes>
        </Suspense>
        {/* </Nav> */}
      </BrowserRouter>
    </PersistQueryClientProvider>
  </StrictMode>
);
