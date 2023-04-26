const API_KEY = '880e20f9'

export async function searchNewMovies({ search }) {
  if(search === '') return null

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    const response = await res.json();
    const a = response.Search;

    return a.map((item) => ({
      id: item.imdbID,
      image: item.Poster,
      title: item.Title,
      year: item.Year,
    }));
  } catch (error) {
    throw new Error("Error al buscar las peliculas");
  }
}
