import { useState, useEffect } from "react";
import Card from "./Card.tsx";

const apiKey = import.meta.env.VITE_TMDB_KEY;
const url = "https://api.themoviedb.org/3/movie/popular";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_RAT}`,
  },
};

export default function MovieDashboard() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Fetch failed: ", error);
      }
    };
    getMovies();
  });

  return (
    <div>
      <div id="top">
        <h1 id="pageTitle">Movie Pulse</h1>
        <div className="searchBox">
          <input type="text" placeholder="Search movie..." />
          <button id="movieSearchBtn">Search</button>
        </div>
      </div>

      {/* <div id="middle">
        </div> */}

      <div id="bottom">
        {/* {movies.map((movie) => (
            <Card
                imageSrc={imageSrc}
                rating={rating}
                title={title}
                year={year}
            />
            ))} */}
      </div>
    </div>
  );
}
