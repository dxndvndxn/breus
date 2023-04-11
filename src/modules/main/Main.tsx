import React, { useEffect, useRef, useState } from 'react';
import { ImageDragEffect } from '../../common/helpers';
import PokemonImg from '../../assets/images/Pokemon.png';
import './Main.scss';

const Main: React.FC = () => {
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
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="main">
      <div className="pokemon-wrap" ref={pokemonWrapRef}>
        {pokemons.map((Pokemon, key) => (
          <Pokemon key={key} />
        ))}
        <img
          src={PokemonImg}
          className="pokemon"
          alt="Pokemon"
          ref={pokemonRef}
        />
      </div>
    </div>
  );
};

export default Main;
