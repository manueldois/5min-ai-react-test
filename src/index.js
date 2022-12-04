import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { MovieSearchPage, loader as MovieSearchPageLoader } from "./pages/MovieSearchPage.tsx";
import { MovieDetailPage, loader as MovieDetailPageLoader } from "./pages/MovieDetailPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MovieSearchPage />,
        loader: MovieSearchPageLoader,
    },
    {
        path: "movie/:id",
        element: <MovieDetailPage />,
        loader: MovieDetailPageLoader,
    },
]);

createRoot(document.getElementById("app")).render(
    <RouterProvider router={router} />
);

