import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
        <Link to="/adventures" className="[&.active]:font-bold">
          Adventures
        </Link>
        <Link to="/questions" className="[&.active]:font-bold">
          Questions
        </Link>
        <SignedIn>
          <UserButton />{" "}
          {/* Displays the user avatar and dropdown for sign out */}
        </SignedIn>
        {/* If signed out, show the sign-in button */}
        <SignedOut>
          <SignInButton mode="modal">
            <button>Sign In</button>
          </SignInButton>
        </SignedOut>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
