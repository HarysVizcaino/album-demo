import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const url = "https://jsonplaceholder.typicode.com/photos";

function App() {
  const [albumsCover, setAlbumCovers] = useState([]);
  const fetchAlbums = async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data; 
  }

  const groudByAlbumId = (albums) => {
      return albums.reduce((previous, current) => {
        const key = current['albumId'];
        if (!previous[key]) previous[key] = [];
        previous[key].push(current)
        return previous;
      }, {})
  };

  const getLastTwo = (albums) => {
    let lastTwo = [];
    for (const album in albums) {
      const actAlbum = albums[album]
      lastTwo.push(actAlbum.slice(Math.max(actAlbum.length -2, 1)))
    }
    return lastTwo;
  }

  const getHighestId = (collections) => {
    let highest = 0;
    let max = 0;

    for (const key in collections) {
      collections[key].forEach(col => {
        if (col.id > max) {
          max = col.id;
        }
      });
    }
    if(max > highest) {
      highest = max
    };
    return highest
  }

  const AlbumFrame = ({ albums }) => {
    return (
      <section className="album-section">
        {albums.map(({ albumId, title, thumbnailUrl }, index) => (
          <div className="album-cover" key={index}>
            <h2>Album: { albumId }</h2>
            <img src={thumbnailUrl} />
            <h3>{title}</h3>
          </div>
        ))}
      </section>
    )
  }

  useEffect(() => {
    const asyncCall = async () => {
      const data  = await fetchAlbums();
      const result = groudByAlbumId(data);
      const lasttwoCover = getLastTwo(result);
      setAlbumCovers(lasttwoCover);
    };
    asyncCall(); 
  }, [])

  return (
    <div className="App">
      <header>
      </header>
      <div className="album-list">
      <p className="second">From each album the last two photographs should be displayed.</p>
      {albumsCover.map((album, index) => <AlbumFrame albums={album} key={index} />)}
      </div>
    </div>
  );
}

export default App;
