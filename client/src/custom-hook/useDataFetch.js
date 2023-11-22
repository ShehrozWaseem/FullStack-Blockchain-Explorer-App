import { useState, useEffect } from 'react';

const useDataFetch = (url,saveToContext=()=>{}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
        setError(null);
      const response = await fetch(url);
      const result = await response.json();
      console.log(response,result)
      if (result?.error) {
        throw new Error(`${result?.error}. Please try again.`);
      }
      setData(result);
      saveToContext(result)
    } catch (error) {
      setError(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  const doTryAgain = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    doTryAgain,
  };
};

export default useDataFetch;
