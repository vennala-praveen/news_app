import React, { useEffect, useState } from 'react';
import Card from './Card'; 


const NewsApp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const API_KEY = "195ce1489c504a078ab714b1ec53a06c";

  const getData = async () => {
    if (!search) return; 
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
    );
    const jsonData = await response.json();
    let dt = jsonData.articles.slice(0, 10);
    setNewsData(dt);
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleInput = (e) => setSearch(e.target.value);

  return (
    <div>
      <nav>
        <div>
          <h1>Daily News</h1>
        </div>

        <ul style={{ display: "flex", gap: "30px" }}>
          <li><a style={{ fontWeight: 600, fontSize: "17px" }}>All News</a></li>
          <li><a style={{ fontWeight: 600, fontSize: "17px" }}>Trending</a></li>
        </ul>

        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
          />
          <button onClick={getData}>Search</button>
        </div>
      </nav>

      <div>
        <p className="head">👉 Stay Updated with Daily News</p>
      </div>

      <div className="categoryBtn">
        {["sports","cinemas","politics","health","fitness","stocks","discovery","shopping","weather","watches"]
          .map((cat) => (
            <button key={cat} onClick={() => setSearch(cat)} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
      </div>

      <div>
        {newsData ? <Card data={newsData} /> : null}
      </div>
    </div>
  );
};

export default NewsApp;
