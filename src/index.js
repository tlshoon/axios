import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import List from "./List";
import Profile from "./Profile";
import Counter from "./Counter";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <List />
      <Profile />
      <Counter />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
