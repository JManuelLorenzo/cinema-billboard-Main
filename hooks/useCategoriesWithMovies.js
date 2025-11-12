import { useState, useEffect } from "react";

const useCategoriesWithMovies = (baseUrl, categories) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);

    Promise.all(
      categories.map(async (category) => {
        try {
          const response = await fetch(
            `${baseUrl}/movies?category=${encodeURIComponent(category.name)}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const movies = await response.json();
          return { category, movies };
        } catch (err) {
          console.error(`Error fetching movies for ${category.name}:`, err);
          return { category, movies: [] };
        }
      })
    )
      .then((results) => {
        setData(results);
      })
      .catch((err) => {
        console.error("Error fetching categories with movies:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [baseUrl, categories]);

  return { data, loading, error };
};

export default useCategoriesWithMovies;
