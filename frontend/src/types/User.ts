type User = {
  username?: string;
  email: string;
  organization?: string;
  role: "user" | "admin";
  authToken?: string;
};

export default User;
