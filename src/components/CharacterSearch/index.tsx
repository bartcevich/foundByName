"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import ShowDataFromFetch from "../ShowDataFromFetch";

interface Character {
  id: number;
  name: string;
  status: string;
  created: string;
  species: string;
  url: string;
}

const CharacterSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [charactersMoreTwo, setCharactersMoreTwo] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (searchTerm.length < 3) {
      setCharacters([]);
      setCharactersMoreTwo([]);
      return;
    }

    const fetchCharacters = async () => {
      setLoading(true);
      setCharacters([]);
      setCharactersMoreTwo([]);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${searchTerm}`
        );
        const data = await response.json();
        if (data.results.length > 2) {
          const forGetTwoElements = data.results;
          const [first, second, ...all] = forGetTwoElements;
          setCharactersMoreTwo(all);
          setCharacters([first, second]);
        } else {
          setCharacters(data.results || []);
        }
      } catch (error) {
        console.error("Ошибка при fetching данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [searchTerm]);

  const redirect = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.elementsTop}>
        <input
          type="text"
          className={styles.userInput}
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={inputRef}
        />

        {searchTerm.length < 3 ? (
          <p className={styles.searchResult}>
            The search starts with 3 letters
          </p>
        ) : (
          <p className={styles.searchResult}>
            Found characters: {characters.length + charactersMoreTwo.length}
          </p>
        )}
      </div>
      {loading && <p>Загрузка...</p>}

      {characters.length > 0 ? (
        <div className={styles.cardsContainerLarge}>
          <ShowDataFromFetch characters={characters} isLargeCard={true} />
        </div>
      ) : (
        searchTerm.length >= 3 && <p>Персонажи не найдены.</p>
      )}
      {charactersMoreTwo.length > 0 && (
        <div className={styles.cardsContainerSmall}>
          <ShowDataFromFetch
            characters={charactersMoreTwo}
            isLargeCard={false}
          />
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
