import notFoundMockMovies from "../mocks/notFoundMockMovies.json";

function ListMovies({ movies }) {
  return movies?.map((movie) => {
    return (
      <li key={movie.imdbID}>
        <img src={movie.image} alt={movie.Title} />
        <h3>{movie.title}</h3>
        <span>{movie.year}</span>
      </li>
    );
  });
}

function NotFound() {
  return <p>{notFoundMockMovies.Error}</p>;
}

export function Movies({ movies }) {
  const foundMovies = movies?.length > 0;

  return foundMovies ? <ListMovies movies={movies} /> : <NotFound />;
}
