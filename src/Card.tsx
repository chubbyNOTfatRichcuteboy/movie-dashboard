export default function Card({ imageSrc, title, rating, year }) {
  return (
    <>
      <div className="card">
        <img src={imageSrc} className="cardMoviePoster" alt={title} />
        <p className="cardMovieTitleYear">
          <strong>{title}</strong> ({year})
        </p>
        <p className="cardMovieRating">⭐{rating}</p>
      </div>
    </>
  );
}
