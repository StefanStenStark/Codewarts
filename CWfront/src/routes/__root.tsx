import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-4 flex justify-center items-center relative h-12 mt-8">
        <div className="absolute left-0 top-1/2 w-2/5 border-t border-[#FFCA00] transform -translate-y-1/2"></div>

        <Link
          to="/"
          className="[&.active]:font-bold z-50 transform translate-y-8"
        >
          <img src="./logo-gold.png" width={160} alt="Logo" />
        </Link>

        <div className="absolute right-0 top-1/2 w-2/5 border-t border-[#FFCA00] transform -translate-y-1/2"></div>
      </div>
      <main className="container mx-auto max-w-screen-lg relative">
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </>
  ),
});
