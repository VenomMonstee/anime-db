function Sidebar({ topAnime = [] }) {
  return (
    <aside>
      <nav>
        <h3>Top Anime</h3>
        {topAnime.length === 0 && <p>No Anime Found</p>}
        {topAnime.map((anime, index) => (
          <a 
            key={index} 
            href={anime.url} // Use the valid URL from API response
            target="_blank" 
            rel="noreferrer"
          >
            {anime.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar