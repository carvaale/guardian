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
    <div className="flex flex-row justify-around items-center bg-neutral-900 w-full h-screen pt-20">
      <div className="w-4/12 flex flex-col bg-white rounded-lg">
        <h1>Usr info</h1>
        <input type="text" placeholder="Name"/>
        <input type="text" placeholder="Email"/>
        <input type="text" placeholder="Organization"/>
        <input type="text" placeholder="Role" disabled/>
        <button onClick={updatePersonalSettings}>Update Info</button>
      </div>
      <div className="w-4/12 flex flex-col bg-white rounded-lg">
        <h1>Model info</h1>
        <label htmlFor="llm-models">LLM Model</label>
        <select name="llm-models" id="llm-models">
          <option value="Meta Llama2-7B">Meta Llama2-7B</option>
          <option value="Meta Llama2-13B">Meta Llama2-13B</option>
          <option value="Meta Llama2-70B">Meta Llama2-70B</option>
          <option value="Meta Llama2-TB">Meta Llama2-TB</option>
        </select>
        <input type="text" placeholder="Temperature"/>
        <input type="text" placeholder="Token Length"/>
        <input type="text" placeholder="TopP"/>
        <input type="text" placeholder="TopK"/>
        <button onClick={updateModelSettings}>Update Model</button>
      </div>
    </div>
    </>
  )
}

export default Settings;
