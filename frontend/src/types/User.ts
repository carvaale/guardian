type User = {
  username: string;
  role: "user" | "admin";
  authToken?: string;
};

export default User;
