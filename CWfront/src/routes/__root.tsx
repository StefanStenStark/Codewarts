import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import BlinkingLogo from "../components/BlinkLogo";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-4 flex justify-center items-center relative h-12 mt-8">
        <div className="absolute left-0 top-1/2 w-2/5 border-t border-[#FFCA00] transform -translate-y-1/2"></div>

        <BlinkingLogo />

        <div className="absolute right-0 top-1/2 w-2/5 border-t border-[#FFCA00] transform -translate-y-1/2"></div>
      </div>
      <main className="container mx-auto max-w-screen-lg relative">
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </>
  ),
});
