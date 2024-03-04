type User = {
  username: string;
  email: string;
  role: "user" | "admin";
  authToken?: string;
};

export default User;
