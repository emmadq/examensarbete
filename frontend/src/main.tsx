import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import BigDataCovid from "./pages/BigDataCovid.tsx";
import ImageFeedWiki from "./pages/ImageFeedWiki.tsx";
import Statistics from "./pages/Statistics.tsx";

import { BrowserRouter, Routes, Route } from "react-router";
import BigDataCovidPagination from "./pages/Pagination/BigDataCovidPagination.tsx";
import BigDataCovidLocalStorage from "./pages/LocalStorage/BigDataCovidLocalStorage.tsx";

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="/coviddata" element={<BigDataCovid />} />
          <Route
            path="/coviddatalocalstorage"
            element={<BigDataCovidLocalStorage />}
          />
          <Route
            path="/coviddatapagination"
            element={<BigDataCovidPagination />}
          />
          <Route path="/wikiarticle" element={<ImageFeedWiki />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </BrowserRouter>
    </PersistQueryClientProvider>
  </StrictMode>
);
