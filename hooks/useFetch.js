import { useState, useEffect } from "react";

const useFetch = (url, refresh = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      setError("No URL provided");
      setData(null);
      return;
    }
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      console.log("Fetching from:", url);
      try {
        const response = await fetch(url);
        console.log("Fetch response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched data:", result);
        setData(result);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Unknown error");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, refresh]);

  return { data, loading, error };
};

export default useFetch;
