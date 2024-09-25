import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";
import GoToAdventureButton from "../components/GoToAdventureButton";
import GoToProfileButton from "../components/GoToProfileButton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative flex justify-center items-center p-6 bg-purple-950 bg-center bg-opacity-30">
        <div className="relative w-4/5 p-6 bg-base-100 shadow-md">
          <SignedIn>
            <div className="absolute top-0 left-0 m-4">
              <SignOutButton>
                <button className="bg-[rgba(255,255,255,0.11)] hover:bg-[rgb(90,114,118)] h-12 text-white font-bold py-2 px-4 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center border border-white rounded">
                  Sign out
                </button>
              </SignOutButton>
            </div>
          </SignedIn>

          <h2 className="text-2xl font-bold text-center font-serif">
            Hello magic user!
          </h2>
          <h2 className="font-bold text-center font-serif">
            Welcome to CodeWarts
          </h2>

          <SignedIn>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-center font-serif">
                Ready for another adventure?
              </p>

              <GoToProfileButton linkTo="/Profile" text="Spell book" />
              <GoToAdventureButton linkTo="/adventures" text="Adventures" />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-center font-serif">
                A place to learn the magic of coding.
              </p>
              <p className="text-center font-serif">
                Please log in or try an adventure!
              </p>
              <SignInButton mode="modal">
                <button className="m-8 bg-[rgba(255,255,255,0.11)] hover:bg-[rgb(90,114,118)] h-16 text-white font-bold py-2 px-8 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center border border-white">
                  Sign In/ sign up
                </button>
              </SignInButton>
              <GoToAdventureButton linkTo="/adventures" text="Test adventure" />
            </div>
          </SignedOut>
        </div>
      </section>
    </>
  );
}

export default Index;
