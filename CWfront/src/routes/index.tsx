import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";
import GoToAdventureButton from "../components/profile/GoToAdventureButton";
import GoToProfileButton from "../components/profile/GoToProfileButton";
import LandingCards from "../components/landingCards";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div className="m-4 mt-40">
        <h2 className="text-4xl font-bold text-center font-serif m-2">
          Hello magic user!
        </h2>
        <h2 className="font-bold text-center text-2xl font-serif m-4 mb-20">
          Welcome to Codewarts. The place to learn code magic.
        </h2>
      </div>

      <section className="relative flex justify-center items-center bg-center ">
        <div className="relative w-4/5 p-10 bg-base-100 border-2 shadow-md">
          <SignedIn>
            <div className="flex flex-col items-center space-y-4 m-8">
              <p className="text-center text-xl text-amber-300 font-serif p-4">
                Ready for another adventure?
              </p>
              <div className="flex flex-col">
                <GoToAdventureButton linkTo="/adventures" text="Adventures" />
                <GoToProfileButton linkTo="/Profile" text="Profile" />
                <div className="flex justify-center mt-12">
                  <SignedIn>
                    <SignOutButton>
                      {/* <button className="bg-[rgba(255,255,255,0.11)] hover:bg-[rgb(90,114,118)] h-12 text-white font-bold py-2 px-4 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center border border-white rounded">
              Sign out
            </button> */}
                      <img src="/logout.png" alt="logout" width={30} />
                    </SignOutButton>
                  </SignedIn>
                </div>
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex flex-col items-center space-y-4 m-8">
              <p className="text-center text-2xl text-amber-300 font-serif p-4">
                Please log in or try an adventure!
              </p>
              <div className="">
                <SignInButton mode="modal">
                  <button className="m-4 bg-[rgba(255,255,255,0.11)]  h-16 text-white font-bold py-2 px-8 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center border border-white rounded-md">
                    Sign In/ sign up
                  </button>
                </SignInButton>
              </div>

              <div className="flex flex-col gap-4">
                <GoToAdventureButton
                  linkTo="/adventures"
                  text="Test adventure"
                />
              </div>
            </div>
          </SignedOut>
        </div>
      </section>

      <section className="flex justify-center mt-10">
        <LandingCards />
      </section>
    </>
  );
}

export default Index;
