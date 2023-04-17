import "./App.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import AddRecipe from "./pages/AddRecipe/AddRecipe";
import ViewRecipe from "./pages/ViewRecipe/ViewRecipe";
import EditRecipe from "./pages/EditRecipe/EditRecipe";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/new",
      element: <AddRecipe />,
    },
    {
      path: "/recipe/:id",
      element: <ViewRecipe />,
    },
    {
      path: "/edit/:id",
      element: <EditRecipe />,
    },
  ]);

  return (
    <div className="App">
      <Header />
      <main className="container">{element}</main>
      <Footer />
    </div>
  );
}

export default App;
