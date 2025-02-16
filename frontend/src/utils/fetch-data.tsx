import { useState, useEffect } from "react";
/**
 * 
 * @param url - string
 * @param method - string
 * @returns state, error
 */
 const useFetch = (url:string, method:object) => {
  const [state, setState] = useState();
  const [error, setError] = useState(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { ...method });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setState(data);
      } catch (err) {
        setError(err.message); // Catch and set error message
      }
    };

    fetchData();
  }, []); // 

  return { state, error };
};

export default useFetch;
