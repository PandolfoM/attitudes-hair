import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./style.css";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
