import React from 'react';
import { lerp, distance, clamp, map } from './mathUtils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Draggabilly from 'draggabilly';

interface IImageDragEffect {
  drag: HTMLImageElement;
  wrap: HTMLDivElement;
  trailsAmount?: number;
}

interface DraggingPos {
  previous: {
    x: number;
    y: number;
  };
  current: {
    x: number;
    y: number;
  };
  amt: number;
}

interface TrailsTranslation extends Omit<DraggingPos, 'amt'> {
  amt: (value: number) => number;
}

export class ImageDragEffect {
  public nodes: React.ElementType[] = [];

  private DOM: {
    drag: HTMLImageElement;
    wrap: HTMLDivElement;
  };

  private readonly trailsTotal: number;

  private draggie: any;

  private draggingPos: DraggingPos;

  private trailsTranslation: TrailsTranslation[];

  constructor({ drag, trailsAmount = 5, wrap }: IImageDragEffect) {
    this.DOM = {
      drag,
      wrap,
    };
    this.trailsTotal = trailsAmount;

    for (let i = 0; i <= this.trailsTotal - 1; ++i) {
      const element: React.ElementType = () => (
        <div
          className="img-trail"
          style={{
            backgroundImage: `url(${this.DOM.drag.src})`,
          }}
        />
      );

      this.nodes.push(element);
    }

    this.draggingPos = {
      previous: { x: 0, y: 0 },
      current: { x: 0, y: 0 },
      amt: 0.1,
    };

    this.trailsTranslation = [...new Array(this.trailsTotal)].map(() => ({
      previous: {
        x: 0,
        y: 0,
      },
      current: {
        x: 0,
        y: 0,
      },
      amt: (position: number) => 0.15 + 0.05 * position,
    }));

    this.draggie = new Draggabilly(this.DOM.drag);

    this.initEvents();
    requestAnimationFrame(() => this.render());
  }

  get trails() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return [...this.DOM.wrap.querySelectorAll('.img-trail')];
  }

  private initEvents(): void {
    const onDragStart = () => {
      // Reset
      this.draggingPos.previous = { x: 0, y: 0 };
    };

    const onDragMove = (...context: any) => {
      const [, , moveVector] = context;

      this.draggingPos.current = moveVector;
      for (let i = 0; i <= this.trailsTotal - 1; ++i) {
        this.trailsTranslation[i].current = this.draggie.position;
      }
    };

    const onPointerDown = () => {
      this.DOM.drag.style.opacity = '0.8';
      document.body.style.cursor = 'grabbing';
      this.DOM.drag.style.cursor = 'grabbing';
    };

    const onPointerUp = () => {
      this.DOM.drag.style.opacity = '1';
      document.body.style.cursor = 'default';
      this.DOM.drag.style.cursor = 'grab';
    };

    this.draggie.on('pointerDown', onPointerDown);
    this.draggie.on('dragStart', onDragStart);
    this.draggie.on('dragMove', onDragMove);
    this.draggie.on('pointerUp', onPointerUp);
  }

  private render(): void {
    this.draggingPos.previous.x = lerp(
      this.draggingPos.previous.x,
      this.draggingPos.current.x,
      this.draggingPos.amt
    );
    this.draggingPos.previous.y = lerp(
      this.draggingPos.previous.y,
      this.draggingPos.current.y,
      this.draggingPos.amt
    );

    for (let i = 0; i <= this.trailsTotal - 1; ++i) {
      this.trailsTranslation[i].previous.x = lerp(
        this.trailsTranslation[i].previous.x,
        this.trailsTranslation[i].current.x,
        this.trailsTranslation[i].amt(i)
      );
      this.trailsTranslation[i].previous.y = lerp(
        this.trailsTranslation[i].previous.y,
        this.trailsTranslation[i].current.y,
        this.trailsTranslation[i].amt(i)
      );
    }
    this.layout();
    // loop
    requestAnimationFrame(() => this.render());
  }

  layout() {
    const draggingDistance = distance(
      this.draggingPos.previous.x,
      this.draggingPos.previous.y,
      this.draggingPos.current.x,
      this.draggingPos.current.y
    );

    for (let i = 0; i <= this.trailsTotal - 1; ++i) {
      const brightnessVal = clamp(
        map(
          draggingDistance,
          0,
          400,
          100,
          100 + (this.trailsTotal - 1 - i) * 40
        ),
        100,
        100 + (this.trailsTotal - 1 - i) * 40
      );

      this.trails[i].style.filter = `brightness(${brightnessVal}%)`;
      this.trails[
        i
      ].style.transform = `translate3d(${this.trailsTranslation[i].previous.x}px,${this.trailsTranslation[i].previous.y}px,0)`;
    }
  }
}
