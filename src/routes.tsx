import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import CharacterList from "./pages/CharacterList";
import CharacterDetail from "./pages/CharacterDetail";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen">
      <Outlet />
    </div>
  ),
});

const listRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CharacterList,
});

const detailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character/$id",
  component: CharacterDetail,
});

const routeTree = rootRoute.addChildren([listRoute, detailRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
