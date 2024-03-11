import Banner from "./components/Banner";
import img from "../assets/default-pfp.png";

const AdminConsole = () => {
  const sampleUsers = [
    {
      id: 15490455,
      username: "John Doe",
      email: "fake1@email.com",
      role: "Admin",
    },
    {
      id: 22304588,
      username: "Mike Hunt",
      email: "fake2@email.com",
      role: "User",
    },
    {
      id: 30294938,
      username: "Drakes Snake",
      email: "fake3@email.com",
      role: "User",
    },
    {
      id: 42438945,
      username: "Jane Doe",
      email: "fake4@email.com",
      role: "User",
    },
    {
      id: 52748375,
      username: "Skim Beeble",
      email: "fake5@email.com",
      role: "User",
    },
    {
      id: 62934754,
      username: "Me When The",
      email: "fake6@email.com",
      role: "User",
    },
    {
      id: 71365438,
      username: "Shaq",
      email: "fake7@email.com",
      role: "User",
    },
    {
      id: 83382363,
      username: "Shiqawalee YG",
      email: "fake8@email.com",
      role: "User",
    },
    {
      id: 99837483,
      username: "Viktor Reznov",
      email: "fake9@email.com",
      role: "User",
    },
  ];

  return (
    <>
      <Banner />
      <div
        id="topo"
        className="flex flex-col items-center gap-y-4 bg-neutral-900 w-full h-screen"
      >
        <div className="flex flex-col flex-wrap items-center gap-y-4 w-full h-screen pt-32">
          {sampleUsers
            .filter((user) => user.role === "User")
            .map((user) => (
              <div
                className="w-1/3 h-20 flex flex-row items-center p-4 gap-x-4 rounded-3xl bg-neutral-800"
                key={user.id}
              >
                <img
                  src={img}
                  alt="Profile Picture"
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-white font-bold">{user.username}</span>
                  <span className="text-white text-sm">{user.email}</span>
                  <span className="text-white text-sm">{user.role}</span>
                </div>
                <span className="text-white text-sm ml-auto">
                  Employee ID. {user.id}
                </span>
                <svg
                  className="ml-auto w-5 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fff"
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                  />
                </svg>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AdminConsole;
