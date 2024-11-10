import { useState, useEffect } from 'react';
import Header from './component/Header';
import Sidebar from './component/Sidebar';
import MainContent from './component/MainContent';
import './assets/scss/main.css'; // Import the SCSS file directly



function App() {
  const [topAnime, SetTopAnime] = useState([]);
  const [search, SetSearch] = useState('');
  const [animeList, SetAnimeList] = useState([]);

  // Fetch top anime
  const GetTopAnime = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/anime');
      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        SetTopAnime(data.data.slice(0, 5)); // Top 5 anime
      } else {
        SetTopAnime([]);
      }
    } catch (error) {
      console.error('Error fetching top anime:', error);
      SetTopAnime([]);
    }
  };

  // Fetch anime based on search query
  const FetchAnime = async (query) => {
    if (query.trim() === '') {
      SetAnimeList([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&order_by=title&sort=asc&limit=10`
      );
      const temp = await response.json();
      if (temp.data && Array.isArray(temp.data)) {
        SetAnimeList(temp.data);
      } else {
        SetAnimeList([]);
      }
    } catch (error) {
      console.error('Error fetching anime list:', error);
      SetAnimeList([]);
    }
  };

  // Automatically fetch anime when search input changes
  const HandleSearchChange = (e) => {
    SetSearch(e.target.value);
    FetchAnime(e.target.value);
  };

  // Fetch top anime on component mount
  useEffect(() => {
    GetTopAnime();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent
          search={search}
          SetSearch={SetSearch}
          HandleSearchChange={HandleSearchChange}
          animeList={animeList}
        />
      </div>
    </div>
  );
}

export default App;
