import { useEffect, useState } from "react";
import "./App.css";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import { fetchUsers, User } from "./Api";

function App() {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      const result = await fetchUsers();
      setUserList(result);
    }
    getUsers();
  }, []);

  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
          <h1 className="text-3xl font-bold underline">Hello world!</h1>

          {userList.map((User) => (
            <p>there is something: {User.name}</p>
          ))}
        </SignedOut>
        <SignedIn>
          <UserButton />
          <h1 className="text-3xl font-bold underline">
            Welcome Wizards and Witches!
          </h1>
          <button className="btn btn-primary">Button</button>
        </SignedIn>
      </header>
    </>
  );
}

export default App;
