export default function Card({ imageSrc, title, rating, date }) {
  const year = date.substring(0, 4);
  const baseURL = "https://image.tmdb.org/t/p/w500/";
  return (
    <>
      <div className="card">
        <img src={baseURL + imageSrc} className="cardMoviePoster" alt={title} />
        <p className="cardMovieTitleYear">
          <strong>{title}</strong> ({year})
        </p>
        <p className="cardMovieRating">⭐{rating.toFixed(1)}</p>
      </div>
    </>
  );
}
