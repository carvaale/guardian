import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../constants/constants";
import { Record } from "../types/Record";
import Banner from "./components/Banner";



export const DataLeakAnalytics = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [keyword, setKeyword] = useState("");
  const [piiSearchResults, setPiiSearchResults] = useState<Record[]>([]);

  
  const AUTH_URL = API_URL + "/api/data_leak";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post(`${AUTH_URL}/find_leak`, {
      startTime: startTime,
      endTime: endTime,
      keyword: keyword
  }, {
      headers: { 'Content-Type': 'application/json' }
  })
      .then((response)  => {
        console.log("Response data", response.data);
        if (response.data.length > 0) {
          setPiiSearchResults(response.data);
          console.log("piiSearchResults",piiSearchResults)
        } else {
          setPiiSearchResults([]);
        }

      })
      .catch((error) => {
        console.error(error);
      });
    }
    
    useEffect(() => {
      if (piiSearchResults.length > 0) {
        console.log("Leaked records found:", piiSearchResults.length);
      } else {
        console.log("No leaks found.");
      }
    }, [piiSearchResults]); // Dependency array ensures this runs after piiSearchResults updates
    

  return (
    <>
      <Banner />
      <div
        id="topo"
        className="flex flex-row justify-evenly items-center w-full h-screen pt-20"
      >
        <div className="w-3/4 m-10 flex flex-row justify-between space-x-10 rounded-3xl bg-neutral-800 p-10">
          <form
            className="w-1/2 flex flex-col items-start justify-center gap-y-2"
            onSubmit={handleSubmit}
          >
            <h1 className="text-xl text-center font-bold text-white">
              Data Leak Analytics
            </h1>
            <span className="text-white text-sm">
              Data Leak Analytics provides information on previous interactions
              with a public LLM. All prompts are saved locally and can be sifted
              through here to detect potential data leaks.
            </span>
            <span className="text-white text-sm">
              Select a start time, end time, and specify a keyword to decect
              data leaks within your organization.
            </span>
            <div id="bar" className="w-full bg-neutral-50" />
            <div className="flex flex-row gap-x-2 w-1/2">
              <div className="flex flex-col">
                <label htmlFor="start" className="text-white text-sm">
                  Start Time
                </label>
                <input
                  name="start"
                  type="time"
                  step="60"
                  className="border-2"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="end" className="text-white text-sm">
                  End Time
                </label>
                <input
                  name="end"
                  type="time"
                  className="border-2"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-3 w-1/2">
              <label htmlFor="keyword" className="text-white text-sm">
                Keyword
              </label>
              <input
                name="keyword"
                type="text"
                className="border-2"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              ></input>
              <button className="h-9 px-3 w-1/2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white">
                Search
              </button>
            </div>
          </form>
          <div className="w-1/2 flex justify-center items-center">
            {piiSearchResults.length > 0 ? (
              <div>
                <h2 className="text-red-500 font-bold">Leaked Records:</h2>
                <table className="w-full border mt-2">
                  <thead>
                    <tr className="bg-red-200">
                      <th className="border p-2">Record #</th>
                      <th className="border p-2">User ID</th>
                      <th className="border p-2">Leaked Keyword</th>
                      <th className="border p-2">Time Leaked</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {piiSearchResults.map((record, index) => (
                      <tr key={index} className="bg-red-100">
                        <td className="border p-2">{index + 1}</td>
                        <td className="border p-2">{record.user_id}</td>
                        <td className="border p-2">{record.response}</td>
                        <td className="border p-2">{record.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="w-3/4 h-3/4 flex items-center justify-center bg-green-400 rounded-xl">
                <span className="text-white font-bold">
                  <span className="text-4xl">0</span> Leaks Found.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
