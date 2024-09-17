const url = import.meta.env.VITE_API_URL;

export interface User {
  id: number;
  name: string;
  userName: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${url}/api/Users`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
