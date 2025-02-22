"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";

interface Character {
  id: number;
  name: string;
  status: string;
  created: string;
  species: string;
  url: string;
}

interface CharacterProps {
  characters: Character[];
  isLargeCard: boolean;
}

const ShowDataFromFetch: React.FC<CharacterProps> = ({
  characters,
  isLargeCard,
}) => {
  console.log(characters);
  const cardClassName = isLargeCard ? styles.largeCard : styles.smallCard;

  const redirect = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <>
      {characters.map((character, index) => (
        <a
          key={character.id}
          href={`${character.url}`}
          //   onClick={() => redirect(character.url)}
          className={`${styles.card} ${cardClassName}`}
        >
          <h2>
            {character.name} - {character.species}
          </h2>
          <div className={styles.bottomCards}>
            {character.status === "Alive" && (
              <p>
                Status:{" "}
                <span className={styles.spanGreen}>{character.status}</span>
              </p>
            )}
            {character.status === "Dead" && (
              <p>
                Status:{" "}
                <span className={styles.spanRed}>{character.status}</span>
              </p>
            )}
            {character.status !== "Alive" && character.status !== "Dead" && (
              <p>Status: {character.status}</p>
            )}

            <p>Created: {new Date(character.created).toLocaleDateString()}</p>
          </div>
        </a>
      ))}
    </>
  );
};
export default ShowDataFromFetch;
