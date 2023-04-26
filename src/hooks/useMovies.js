import { useRef, useState, useMemo, useCallback } from "react";
import { searchNewMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch.current === search) return;

    try {
      setLoading(true);
      previousSearch.current = search;
      const newMovies = await searchNewMovies({ search });
      setSearchMovies(newMovies);
    } catch (error) {
      throw new Error("Error al recuperar las peliculas");
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...searchMovies].sort((a, b) => a.title.localeCompare(b.title))
      : searchMovies;
  }, [sort, searchMovies]);

  return { searchMovies: sortedMovies, getMovies, loading };
}
