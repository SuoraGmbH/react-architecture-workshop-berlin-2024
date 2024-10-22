import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Raycast } from "./routes/Raycast/Raycast";
import { ProjectsRoute } from "./routes/Projects/ProjectsRoute";
import { RootLayout } from "./RootLayout";
import { Home } from "./routes/Home";
import { ProjectRoute } from "./routes/Projects/ProjectRoute";
import { ClientsRoute } from "./routes/Clients/ClientsRoute";
import { ClientRoute } from "./routes/Clients/ClientRoute";

export const routes: (RouteObject & { hideInNavbar?: boolean })[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/foo",
    element: <div>Hello foo!</div>,
  },
  {
    path: "/raycast",
    element: <Raycast />,
  },
  {
    path: "/projects",
    element: <ProjectsRoute />,
  },
  {
    path: "/projects/:projectId",
    element: <ProjectRoute />,
    hideInNavbar: true,
  },
  {
    path: "/clients",
    element: <ClientsRoute />,
  },
  {
    path: "/clients/:clientId",
    element: <ClientRoute />,
    hideInNavbar: true,
  },
];

const rootRoute: RouteObject = {
  path: "/",
  element: <RootLayout />,
  children: routes,
};

export const router = createBrowserRouter([rootRoute]);
