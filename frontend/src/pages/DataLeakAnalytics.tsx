import axios from 'axios';
import {useState} from 'react';
const DataLeakAnalytics = () => {
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
        <div className='flex items-center justify-center text-4xl'>
            <h1> Data Leak Analytics</h1>
        </div>
        <div className="pt-20">
            <form className="flex justify-center items-center" onSubmit={handleSubmit} >
                <div className = 'mb-4'>
                    <label className = 'text-xl'>Start Time: </label>
                    <input type = 'time' className = 'border-2' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div className = 'mb-4 pl-10'>
                    <label className = 'text-xl'>End Time: </label>
                    <input type = 'time' className = 'border-2' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
                <div className ='mb-4 pl-10'>
                    <label className ='text-xl'>Keyword: </label>
                    <input type ='text' className = 'border-2' value={keyword} onChange={(e) => setKeyword(e.target.value)}></input>
                </div>
                <div className='pl-5'>
                <button className="mb-4 rounded-md bg-blue-500 focus:outline-none focus:shadow-outline-blue" type="submit">Search</button>
                </div>
            </form>
        </div>
        <div className="mt-8 flex justify-center items-center">
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
            <div style={{ color: 'green' }}>No leaks found</div>
          )}
        </div>
        </>
    )
}
export default DataLeakAnalytics;