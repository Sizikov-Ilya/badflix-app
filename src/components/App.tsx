import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./ui/Layout";
import MovieDetail from "./pages/MovieDetail";
import Movies from "./pages/Movies";
import ActorDetail from "./pages/ActorDetail";
import { MOVIE_LISTS, TOP_LISTS } from "../constants";
import "bear-react-carousel/dist/index.css";

import MoviesListMain from "./pages/MoviesListMain";
import MoviesListTop from "./pages/MoviesListTop";
import NotFoundPage from "./NotFoundPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Movies />,
        },
        ...TOP_LISTS.map((el) => ({
          path: el.url,
          element: <MoviesListTop />,
        })),
        ...MOVIE_LISTS.map((el) => ({
          path: el.url,
          element: <MoviesListMain />,
        })),
        {
          path: "/movie/:id",
          element: <MovieDetail />,
        },
        {
          path: "/actor/:id",
          element: <ActorDetail />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
