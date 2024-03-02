import axios from 'axios';
import {useState} from 'react';

import  Banner  from './componenets/Banner';
export const DataLeakAnalytics = () => {

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [keyword, setKeyword] = useState('');
    const [piiSearchResults, setPiiSearchResults] = useState<string[]>([]) ;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Start Time: ', startTime);
        console.log('End Time: ', endTime);
        axios.post('API_URL', {startTime, endTime})
        .then(response => {
            const piiRecords:string[] = response.data;
            if(piiRecords.length > 0){
                setPiiSearchResults(piiRecords);
            }
            else{
                setPiiSearchResults([]);
            }
        })
        .catch(error => {
            console.error(error);
        })
        //only uncomment the 3 lines below if you wanna test out what leaked records would look like.
        // const dummyApiResponse = generateDummyApiResponse();
        // const filteredRecords = dummyApiResponse.filter(record => record.includes(keyword));
        // setPiiSearchResults(filteredRecords);

    }

    //below function is for testing purposes only. gets dummy response of what leaked records would look like.
    // const generateDummyApiResponse = () => {
    //     const randomRecords = Math.floor(Math.random() * 5) + 1;
    //     const dummyRecords: string[] = []; // Array to hold dummy records

    //     for (let i = 0; i < randomRecords; i++) {
    //       dummyRecords.push(`Dummy PII Record ${i + 1} - Contains keyword: ${keyword}`);
    //     }

    //     return dummyRecords;
    //   };

    return(
        <>
        <Banner />
        <div id="topo" className="flex flex-row justify-evenly items-center w-full h-screen pt-20">
          <div className="w-3/4 m-10 flex flex-row justify-between space-x-10 rounded-3xl bg-neutral-800 p-10">
              <form className="w-1/2 flex flex-col items-start justify-center gap-y-2" onSubmit={handleSubmit} >
                  <h1 className="text-xl text-center font-bold text-white">Data Leak Analytics</h1>
                  <span className='text-white text-sm'>Data Leak Analytics provides information on previous interactions with a public LLM. All prompts are saved locally and can be sifted through here to detect potential data leaks.</span>
                  <span className='text-white text-sm'>Select a start time, end time, and specify a keyword to decect data leaks within your organization.</span>
                  <div className='flex flex-row gap-x-2 w-1/2'>
                    <div className='flex flex-col'>
                    <label htmlFor="start" className = 'text-white text-sm'>Start Time</label>
                    <input name="start" type = 'time' className = 'border-2' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="end" className = 'text-white text-sm'>End Time</label>
                    <input  name="end" type='time' className = 'border-2' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                  </div>
                  <div className='flex flex-col gap-y-3 w-1/2'>
                    <label htmlFor="keyword" className = 'text-white text-sm'>Keyword</label>
                    <input name="keyword" type ='text' className = 'border-2' value={keyword} onChange={(e) => setKeyword(e.target.value)}></input>
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
                      <th className='border p-2'>Record #</th>
                    <th className="border p-2">Record</th>
                  </tr>
                </thead>
                <tbody>
                  {piiSearchResults.map((record, index) => (
                    <tr key={index} className="bg-red-100">
                      <td className = 'border p-2'>{index+1}</td>
                      <td className="border p-2">{record}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            ) : (
              <div className="w-3/4 h-3/4 flex items-center justify-center bg-green-400 rounded-xl">
                <span className="text-white font-bold"><span className="text-4xl">0</span> Leaks Found.</span>
              </div>
            )}
          </div>
          </div>
        </div>
        </>
    )
}
