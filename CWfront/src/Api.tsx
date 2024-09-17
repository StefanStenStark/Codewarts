export interface User {
  Id: number;
  Name: string;
  UserName: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("http://localhost:5033/api/Users");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
