import { useState } from "react";

const usePost = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (element) => {
    if (!url) {
      setError("No URL provided");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Posting to:", url, "Body:", element);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(element),
      });

      console.log("Post response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Post success:", result);
      setData(result);
      return result;
    } catch (err) {
      console.error("Post error:", err);
      setError(err.message || "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { postData, data, loading, error };
};

export default usePost;
