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
          {userList.map((User) => (
            <p>there is something: {User.name}</p>
          ))}
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  );
}

export default App;
