import { lazy, StrictMode, Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

export const appInsights = new ApplicationInsights({
  config: {
    connectionString:
      "InstrumentationKey=8306e9ca-07b4-48d2-9249-0d3fdb584010;IngestionEndpoint=https://swedencentral-0.in.applicationinsights.azure.com/;LiveEndpoint=https://swedencentral.livediagnostics.monitor.azure.com/;ApplicationId=63fed691-1c69-4fdf-bae6-aa88ed91c68e",
    enableAutoRouteTracking: true,
  },
});
appInsights.loadAppInsights();
appInsights.trackPageView();

function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    const pageName = location.pathname;
    appInsights.trackPageView({ name: pageName });
  }, [location]);

  return null;
}

const AppL = lazy(() => import("./App.tsx"));
const BigDataCovidPaginationL = lazy(
  () => import("./pages/PaginationStandalone.tsx")
);
const ImageFeedInfScrollCallbackL = lazy(
  () => import("./pages/ImageFeedInfScrollCallback.tsx")
);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RouteChangeTracker />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<AppL />} />

          <Route path="/coviddatalist" element={<BigDataCovidPaginationL />} />
          <Route
            path="/imageFeedList"
            element={<ImageFeedInfScrollCallbackL />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
