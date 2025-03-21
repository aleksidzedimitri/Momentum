import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StoreProvider } from "./store/ContextProvider.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OpenAPI as OpenAPIConfig } from "../openapi/requests/core/OpenAPI";


OpenAPIConfig.BASE = "https://momentum.redberryinternship.ge/api";

const queryClient = new QueryClient({ defaultOptions: {} });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StoreProvider>
          {" "}
          <App />
        </StoreProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
