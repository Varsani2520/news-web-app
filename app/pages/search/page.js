"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const SearchPage = () => {
  const router = useRouter();
  const { q } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!q) {
        // No search query provided
        return;
      }

      const apiKey = "69f2b0c4d53e40099e654bc7119426ac";
      const apiUrl = `https://newsapi.org/v2/everything?q=${q}&apiKey=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log("Search Results:", data.articles);
        setSearchResults(data.articles);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [q]);

  return (
    <div>
      <h1>Search Results for: {q}</h1>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
            {result.urlToImage && (
              <img src={result.urlToImage} alt={result.title} />
            )}
            <p>Source: {result.source.name}</p>
            <p>
              URL:{" "}
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.url}
              </a>
            </p>
          </li>
        ))}
      </ul>
      ``
    </div>
  );
};

export default SearchPage;
