import { useState, useEffect } from "react";
import Card from "./Card.tsx";

const apiKey = import.meta.env.VITE_TMDB_KEY;
const asdfurl = "https://api.themoviedb.org/3/movie/popular";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_RAT}`,
  },
};

export default function MovieDashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [query, setQuery] = useState("");

  useEffect(() => {
    let ignore = false;
    if (page === 1) setIsLoading(true);
    setError(null);

    const getMovies = async (searchUrl, searchQuery) => {
      try {
        const response = await fetch(`${searchUrl + searchQuery}`, options);
        const resjson = await response.json();
        if (!ignore) {
          setTotalPages(resjson.total_pages);
          page === 1
            ? setData(resjson.results)
            : setData((prevData) => [...prevData, ...resjson.results]);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Fetch failed: ", error);
          setError("Failed to fetch movies. Please try again");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    const timerId = setTimeout(() => {
      if (query === "") {
        let useUrl = `https://api.themoviedb.org/3/movie/popular?page=${page}`;
        getMovies(useUrl, "");
      } else {
        let useUrl = `https://api.themoviedb.org/3/search/movie?page=${page}&query=`;
        getMovies(useUrl, query);
      }
    }, 1000);
    return () => {
      clearTimeout(timerId);
      ignore = true;
    };
  }, [query, page]);

  return (
    <div>
      <div id="top">
        <h1 id="pageTitle">MoviePulse</h1>
        <h3 id="subheading">Find any movie's ratings</h3>
        <div className="searchBox">
          <input
            value={query}
            type="text"
            placeholder="Search movies..."
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* <div id="middle">
        </div> */}

      <div id="cards">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : error !== null ? (
          <p>{error}</p>
        ) : data.length === 0 ? (
          <p id="noneshown">No results found</p>
        ) : (
          data.map((movie) => (
            <Card
              key={movie.id}
              imageSrc={movie.poster_path}
              rating={movie.vote_average}
              title={movie.title}
              date={movie.release_date}
            />
          ))
        )}
      </div>
      {!isLoading && page < totalPages && (
        <button id="loadMoreBtn" onClick={() => setPage((prev) => prev + 1)}>
          Load More
        </button>
      )}
    </div>
  );
}
