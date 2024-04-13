type User = {
  username?: string;
  email: string;
  organization?: string;
  role: "user" | "admin";
  access_token?: string;
};

export default User;
