import React, { useEffect, useRef, useState } from 'react';
import { ImageDragEffect, windowWidth } from '../../common/helpers';
import PokemonImg from '../../assets/images/Pokemon.png';
import { useDistortionEffect } from '../../common/hooks';
import './Main.scss';

const Main: React.FC = () => {
  const [pokemons, setPokemons] = useState<React.ElementType[]>([]);
  const pokemonRef = useRef<SVGSVGElement | null>(null);
  const pokemonWrapRef = useRef<HTMLDivElement | null>(null);
  const { scale, doDistortionEffect } = useDistortionEffect();
  const isDesktop = windowWidth > 991;

  useEffect(() => {
    let dragPokemon: ImageDragEffect | null = null;

    if (pokemonRef.current && pokemonWrapRef.current && isDesktop) {
      dragPokemon = new ImageDragEffect({
        drag: pokemonRef.current,
        wrap: pokemonWrapRef.current,
        src: PokemonImg,
      });
      setPokemons(dragPokemon.nodes);
    }

    document.documentElement.classList.add('doc-overflow');

    if (isDesktop) {
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
        {pokemons.length > 0 &&
          pokemons.map((Pokemon, key) => <Pokemon key={key} />)}
        {isDesktop ? (
          <svg className="pokemon-svg" ref={pokemonRef}>
            <filter id="distortionFilter">
              <feTurbulence
                type="turbulence"
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
        ) : (
          <img src={PokemonImg} className="pokemon-svg" alt="Pokemon" />
        )}
      </div>
    </div>
  );
};

export default Main;
