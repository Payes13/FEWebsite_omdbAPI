import { useEffect, useRef, useState, useCallback } from "react";

import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";
import "./App.css";

function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = search === "";
      return;
    }

    if (search === "") {
      setError("No puedes buscar con un input vacio");
      return;
    }

    if (search.length < 3) {
      setError("Tu busqueda debe tener mas de 2 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { searchMovies, getMovies, loading } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 500), [])

  const handleSubmit = (e) => {
    e.preventDefault();

    getMovies({ search });
  };

  const handleChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch)
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="container">
      <main className="main-container">
        <h1>API MOVIES FILMFLIX</h1>

        <form onSubmit={handleSubmit} className="form">
          <input
            onChange={handleChange}
            type="text"
            className="form-input"
            placeholder="The Matrix, Hulk..."
          />
          <input onChange={handleSort} checked={sort} type="checkbox" />
          <button className="form-btn">Search</button>
        </form>
      </main>

      {error && <p>{error}</p>}
      {loading && "Cargando peliculas"}
      <section className="section-container">
        <ul>{searchMovies && <Movies movies={searchMovies} />}</ul>
      </section>
    </div>
  );
}

export default App;
