// src/App.jsx
import React from "react";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage";
import NewBookPage from "./pages/NewBookPage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <MainPage /> },
        { path: "/add-book", element: <NewBookPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
