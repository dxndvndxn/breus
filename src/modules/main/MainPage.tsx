import React, { useEffect, useRef, useState } from 'react';
import { ImageDragEffect } from '../../common/helpers';
import './MainPage.scss';

const MainPage: React.FC = () => {
  const [pokemons, setPokemons] = useState<React.ElementType[]>([]);
  const pokemonRef = useRef<HTMLImageElement | null>(null);
  const pokemonWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (pokemonRef.current && pokemonWrapRef.current) {
      const { nodes } = new ImageDragEffect({
        drag: pokemonRef.current,
        wrap: pokemonWrapRef.current,
      });
      setPokemons(nodes);
    }
  }, []);

  return (
    <div className="main">
      <div className="pokemon-wrap" ref={pokemonWrapRef}>
        {pokemons.map((Pokemon, key) => (
          <Pokemon key={key} />
        ))}
        <img
          src="/images/Pokemon.png"
          className="pokemon"
          alt="Pokemon"
          ref={pokemonRef}
        />
        {/*<div*/}
        {/*  style={{ backgroundImage: `url('/images/Pokemon.png')` }}*/}
        {/*  className="pokemon"*/}
        {/*  ref={pokemonRef}*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default MainPage;
