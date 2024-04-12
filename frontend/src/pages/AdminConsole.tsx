import Banner from "./components/Banner";
import img from "../assets/default-pfp.png";
import { API_URL } from "../constants/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { ModalHook } from "../hooks/ModalHook";
const AdminConsole = () => {
  const [showModal, setShowModal] = useState(false);

  const AUTH_URL = API_URL + "/api/admin";
  type UsersData = {
    user_id:number,
    email:string,
    role:string
    username:string
  }
  const [sampleData, setSampleData] = useState<UsersData[]>([]); 
  const [currentUserToDelete, setCurrentUserToDelete] = useState<number> (-1); 

  
  const getUsers = async  () => {
      try{
      const response = await axios.get<UsersData[]>(`${AUTH_URL}/get_users`,
      {
      headers:{
        "Content-Type":"application/x-www-form-urlencoded",
      }
    })
      setSampleData(response.data)
  }catch(error){
    console.error(error);
        }
  };

  const deleteUser = (user_id:number) => {
    console.log("I am in deleteUser")
    axios.delete(`${AUTH_URL}/delete_user/${user_id}`,
    {
      headers:{
        "Content-Type":"application/x-www-form-urlencoded",
      }
    }
    ).then(() => {
      setSampleData(sampleData.filter((user) => user.user_id !== user_id));
      setShowModal(false);
      setCurrentUserToDelete(-1);
    });
  }

  useEffect(() => {
    getUsers();
  },[])

  useEffect(() => {
    if(!showModal){
      setCurrentUserToDelete(-1);
    }
  }, [showModal]);


  return (
    <>
      <Banner />
      <div
        id="topo"
        className="flex flex-col items-center gap-y-4 bg-neutral-900 w-full h-screen"
      >
        <div className="flex flex-col flex-wrap items-center gap-y-4 w-full h-screen pt-32">
          {sampleData
            .map((user) => (
              <div
                className="w-1/3 h-20 flex flex-row items-center p-4 gap-x-4 rounded-3xl bg-neutral-800"
                key={user.user_id}
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
                <div className="flex flex-col ml-auto"> 
                  <span className="text-white text-sm float">
                    Employee ID. {user.user_id}
                  </span>
                <div className="flex flex-row ml-auto items-center gap-x-4">
                <svg
                  className=" w-5 cursor-pointer pt-2"
                  //  onClick={() => ModalHandler(user.user_id)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fff"
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                  />
                </svg>

                
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 cursor-pointer pt-2"
                  fill="#fff"
                  onClick={() => {
                    setCurrentUserToDelete(user.user_id);
                    setShowModal(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3L21 21M18 6L17.6 12M17.2498 17.2527L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6H4M16 6L15.4559 4.36754C15.1837 3.55086 14.4194 3 13.5585 3H10.4416C9.94243 3 9.47576 3.18519 9.11865 3.5M11.6133 6H20M14 14V17M10 10V17"
                    stroke="#fff"
                  />
                </svg>
                
                </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <ModalHook
        show={showModal}  
        onDelete={() => {
          if(currentUserToDelete >= 0){
            deleteUser(currentUserToDelete);
          }
        }}
        onCancel={() => {
          setShowModal(false)
          setCurrentUserToDelete(-1)
          console.log("This si the show Modal", showModal)}
        }
      />
    </>
  );
};

export default AdminConsole;
