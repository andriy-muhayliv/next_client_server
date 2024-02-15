'use client'
import { useState } from 'react';

export default function Component() {
  const [concurrency, setConcurrency] = useState(10);
  const [isDisabled, setIsDisabled] = useState(false);
  const [results, setResults] = useState([]);

  const fetchApi = async (index) => {
    try {
      const response = await fetch(`/api/api?index=${index}`);
      const data = await response.json();
      setResults(prev => [...prev, data.index]);
    } catch (error) {
      console.error('Fetch error', error);
    }
  };

  const handleStart = () => {
    setIsDisabled(true);
    setResults([])
    let activeRequests = 0;
    let intervalId = null;
    let requestIndex = 1;

    const manageRequests = () => {
      while (activeRequests < concurrency && requestIndex <= 1000) {
        fetchApi(requestIndex++);
        activeRequests++;

        if (requestIndex > 1000) {
          clearInterval(intervalId);
          setIsDisabled(false);
        }
      }
    };

    manageRequests();
    intervalId = setInterval(() => {
      activeRequests = 0;
      manageRequests();
    }, 1000 / concurrency);
  };

  return (
   <div>
     <div className="flex items-center gap-2">
      <input
        type="number"
        className="input"
        required
        min="0"
        max="100"
        value={concurrency}
        onChange={(e) => setConcurrency(Number(e.target.value))}
        disabled={isDisabled}
      />
      <button onClick={handleStart} disabled={isDisabled} className='btn'>Start</button>
    </div>
    <div className='m-4 rounded h-[300px] border-2 overflow-auto'>
    <ul>
            {results.map((index, i) => (
              <li key={i}>{index}</li>
            ))}
          </ul>
    </div>
   </div>
  );
}