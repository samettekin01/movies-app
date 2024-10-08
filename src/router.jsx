import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./components/page/MainPage/MainPage";
import Detail from "./components/page/Detail/Detail";
import Search from "./components/page/Search/Search";

export const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        {
            index: true,
            element: <MainPage />
        },
        {
            path: "/:type/:id",
            element: <Detail />
        },
        {
            path: "/movies",
            element: <Search />
        },
        {
            path: "/tv",
            element: <Search />
        }
    ]
}])