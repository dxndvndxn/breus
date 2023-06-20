import React, { useEffect, useRef, useState } from 'react';
import { ImageDragEffect } from '../../common/helpers';
import PokemonImg from '../../assets/images/Pokemon.png';
import { useDistortionEffect } from '../../common/hooks';
import './Main.scss';

const Main: React.FC = () => {
  const [pokemons, setPokemons] = useState<React.ElementType[]>([]);
  const pokemonRef = useRef<SVGSVGElement | null>(null);
  const pokemonWrapRef = useRef<HTMLDivElement | null>(null);
  const { scale, doDistortionEffect } = useDistortionEffect();

  useEffect(() => {
    let dragPokemon: ImageDragEffect | null = null;

    // TODO вывести в константу
    if (
      pokemonRef.current &&
      pokemonWrapRef.current &&
      window.innerWidth > 991
    ) {
      dragPokemon = new ImageDragEffect({
        drag: pokemonRef.current,
        wrap: pokemonWrapRef.current,
        src: PokemonImg,
      });
      setPokemons(dragPokemon.nodes);
    }

    document.documentElement.classList.add('doc-overflow');

    // TODO вывести в константу
    if (window.innerWidth > 991) {
      doDistortionEffect(200);
    }

    return () => {
      document.documentElement.classList.remove('doc-overflow');

      if (dragPokemon) dragPokemon.destroy();
    };
  }, []);

  return (
    <div className="main">
      <div className="pokemon-wrap" ref={pokemonWrapRef}>
        {pokemons.length &&
          pokemons.map((Pokemon, key) => <Pokemon key={key} />)}
        <svg className="pokemon-svg" ref={pokemonRef}>
          <filter id="distortionFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              result="noise"
              numOctaves="5"
              stitchTiles="stitch"
              seed="1"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="R"
              filterUnits="userSpaceOnUse"
            />
          </filter>
          <g filter="url(#distortionFilter)">
            <image className="pokemon-svg__image" xlinkHref={PokemonImg} />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Main;
