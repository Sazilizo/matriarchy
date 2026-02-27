import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import App from "./App"
import { ProductsProvider } from "./Context/ProductsContext"
import "./index.css"

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)