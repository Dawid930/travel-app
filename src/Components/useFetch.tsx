import { useEffect, useState } from "react";
import { Travel } from "../Interface/Travel";




const useFetch = (url: string) => {
    //const [data, setData] = useState<Travel[] | [] | {[key:string]:any}>({}) // Travel[]| []
    const [data, setData] = useState<any>(null) // Travel[]| []
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState<string | null>(null) //mukodik a TS-kieg nelkul is, miert?

    useEffect(() => {
        const abortCont = new AbortController();
    
          fetch(url, { signal: abortCont.signal })
          .then(res => {
            if (!res.ok) { // error coming back from server
              throw Error('could not fetch the data for that resource');
            } 
            return res.json();
          })
          .then(data => {
            setIsPending(false);
            setData(data);
            setError(null);
          })
          .catch(err => {
            if (err.name === 'AbortError') {
              console.log('fetch aborted')
            } else {
              // auto catches network / connection error
              setIsPending(false);
              setError(err.message);
            }
          })
        
        // abort the fetch
        return () => abortCont.abort();
      }, [url])
    
      return { data, isPending, error };
};

export default useFetch;
