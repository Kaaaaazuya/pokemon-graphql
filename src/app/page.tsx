"use client";
import { Provider } from "urql";
import { client } from "@/lib/graphql";

const App = () => (
  <Provider value={client}>
    <App />
  </Provider>
);
