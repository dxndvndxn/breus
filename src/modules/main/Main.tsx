import React, { useEffect, useRef, useState } from 'react';
import { ImageDragEffect, windowWidth } from '../../common/helpers';
import PokemonImg from '../../assets/images/Pokemon.webp';
import './Main.scss';
import { useAppSelector } from '../../common/store';

export const Main: React.FC = () => {
  const [pokemons, setPokemons] = useState<React.ElementType[]>([]);
  const pokemonRef = useRef<SVGSVGElement | any | null>(null);
  const pokemonWrapRef = useRef<HTMLDivElement | null>(null);
  const { firstLoad } = useAppSelector((state) => state.appReducer);
  const isDesktop = windowWidth > 991;

  useEffect(() => {
    let dragPokemon: ImageDragEffect | null = null;

    if (pokemonRef.current && pokemonWrapRef.current && isDesktop) {
      dragPokemon = new ImageDragEffect({
        drag: pokemonRef.current,
        wrap: pokemonWrapRef.current,
        src: PokemonImg,
        trailsAmount: 6,
      });
      setPokemons(dragPokemon.nodes);
    }

    document.documentElement.classList.add('doc-overflow');

    return () => {
      document.documentElement.classList.remove('doc-overflow');

      if (dragPokemon) dragPokemon.destroy();
    };
  }, []);

  return (
    <div className="main">
      <div className="pokemon-wrap" ref={pokemonWrapRef}>
        {pokemons.length > 0 &&
          pokemons.map((Pokemon, key) => (
            <Pokemon key={key} className="pokemon-svg_none" />
          ))}
        <div className="pokemon-svg-wrap" ref={pokemonRef}>
          <svg
            className={`pokemon-svg`}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            {(isDesktop || firstLoad) && (
              <filter id="distortionFilter">
                <feTurbulence
                  type="noise"
                  baseFrequency="0.01 0.01"
                  numOctaves="5"
                  stitchTiles="noStitch"
                  seed="1"
                />
                <feDisplacementMap
                  id="pokemonDisplacement"
                  in="SourceGraphic"
                  xChannelSelector="R"
                  yChannelSelector="B"
                />
              </filter>
            )}
            <image
              className="pokemon-svg__image"
              style={{ display: !isDesktop && !firstLoad ? 'block' : 'none' }}
              xlinkHref={PokemonImg}
            />
            {(isDesktop || firstLoad) && (
              <g filter="url(#distortionFilter)" className="pokemon-svg__g">
                <image className="pokemon-svg__image" xlinkHref={PokemonImg} />
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};
