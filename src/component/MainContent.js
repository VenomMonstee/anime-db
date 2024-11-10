function MainContent({ HandleSearchChange, search, animeList }) {
  return (
    <main>
      <div className="main-head">
        <form className="search-box">
          <input
            type="search"
            placeholder="Search for an anime..."
            required
            value={search}
            onChange={HandleSearchChange} // Trigger search on input change
          />
        </form>
      </div>
      <div className="anime-list">
        {animeList.length > 0 ? (
          animeList.map((anime) => (
            <div className="anime-card" key={anime.mal_id}>
              <a href={anime.url} target="_blank" rel="noopener noreferrer">
                <figure>
                  <img src={anime.images.jpg.image_url} alt={anime.title} />
                </figure>
                <h3>{anime.title}</h3>
              </a>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </main>
  );
}

export default MainContent;
