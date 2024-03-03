import Banner from "./componenets/Banner";

const Settings = () => {

  const updatePersonalSettings = () => {
    console.log('Updating Personal Info');
  }

  const updateModelSettings = () => {
    console.log('Updating Model Settings');
  }



  return (
    <>
    <Banner />
    <div id="topo" className="flex flex-row justify-evenly items-center w-full h-screen pt-36 p-20 gap-x-10">
      <div className="flex items-center justify-center">
        <form action="">
            <div className="rounded-3xl bg-neutral-800 p-10">
              <h1 className="text-xl text-center font-bold text-gray-400 dark:text-white">Account Settings</h1>
              <div id="bar" className='w-full bg-neutral-50 my-2'/>
              <div className="mt-8 space-y-4">
                  <input className="w-full bg-transparent text-gray-300 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Username" type="text" name="username"/>
                  <input className="w-full bg-transparent text-gray-300 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Email" type="email" name="email"/>
                  <input className="w-full bg-transparent text-gray-300 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Password" type="password" name="password"/>
                  <input className="w-full bg-transparent text-gray-300 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Organization" type="text" name="organization"/>
                  <input className="w-full bg-transparent text-gray-300 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Role" type="text" name="role" disabled/>
                  <button className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white" type="submit">
                    Update Account
                  </button>
              </div>
            </div>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <form action="">
        <div className="rounded-3xl bg-neutral-800 p-10">
              <h1 className="text-xl text-center font-bold text-gray-400 dark:text-white">LLM Settings</h1>
              <div id="bar" className='w-full bg-neutral-50 my-2'/>
              <div className="mt-8 space-y-4">
                  <select className="w-full bg-transparent text-gray-400 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 invalid:border-red-500 dark:placeholder-gray-300" name="models">
                    <option value="llama27bTB">Meta Llama2 7B - TB</option>
                    <option value="llama27b">Meta Llama2 7B</option>
                    <option value="llama214b">Meta Llama2 14B</option>
                    <option value="llama270b">Meta Llama2 70B</option>
                  </select>
                  <input className="w-full bg-transparent text-gray-400 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Temperature" type="number" name="temperature"/>
                  <input className="w-full bg-transparent text-gray-400 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Token Length" type="number" name="tokenLength"/>
                  <input className="w-full bg-transparent text-gray-400 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Top-P" type="number" name="topP"/>
                  <input className="w-full bg-transparent text-gray-400 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Top-K" type="number" name="topK"/>
                  <button className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white" type="submit">
                    Update LLM
                  </button>
              </div>
            </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Settings;
