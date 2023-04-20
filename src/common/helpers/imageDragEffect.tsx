import React from 'react';
import { lerp, distance, clamp, map } from './mathUtils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Draggabilly from 'draggabilly';

interface IImageDragEffect {
  drag: HTMLImageElement | SVGSVGElement;
  wrap: HTMLDivElement;
  src: string;
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
    drag: IImageDragEffect['drag'];
    wrap: HTMLDivElement;
  };

  private readonly trailsTotal: number;

  private draggie: any;

  private draggingPos: DraggingPos;

  private trailsTranslation: TrailsTranslation[];

  private isDragging = false;

  private animationFrameId = 0;

  constructor({ drag, trailsAmount = 5, wrap, src }: IImageDragEffect) {
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
            backgroundImage: `url(${src})`,
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
  }

  get trails() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return [...this.DOM.wrap.querySelectorAll('.img-trail')];
  }

  public destroy(): void {
    this.draggie.destroy();
  }

  private initEvents(): void {
    const onDragStart = () => {
      // Reset
      this.isDragging = true;
      this.draggingPos = {
        previous: { x: 0, y: 0 },
        current: { x: 0, y: 0 },
        amt: 0.1,
      };
      requestAnimationFrame(() => this.render());
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

    const onDragEnd = () => {
      this.isDragging = false;
    };

    this.draggie.on('pointerDown', onPointerDown);
    this.draggie.on('dragStart', onDragStart);
    this.draggie.on('dragMove', onDragMove);
    this.draggie.on('pointerUp', onPointerUp);
    this.draggie.on('dragEnd', onDragEnd);
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
      if (!this.isDragging && this.animationFrameId) {
        this.trailsTranslation[i].previous.x = lerp(
          this.draggie.position.x,
          this.draggie.position.x,
          this.trailsTranslation[i].amt(i)
        );
        this.trailsTranslation[i].previous.y = lerp(
          this.draggie.position.y,
          this.draggie.position.y,
          this.trailsTranslation[i].amt(i)
        );
      } else {
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
    }
    this.layout();

    // loop
    if (this.isDragging) {
      this.animationFrameId = requestAnimationFrame(() => this.render());
    }
    if (!this.isDragging && this.animationFrameId) {
      this.animationFrameId = 0;
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  layout() {
    const draggingDistance = distance(
      this.draggingPos.previous.x,
      this.draggingPos.previous.y,
      this.draggingPos.current.x,
      this.draggingPos.current.y
    );

    for (let i = 0; i <= this.trailsTotal - 1 && this.trails.length; ++i) {
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
      this.trails[i].style.opacity = '1';
      this.trails[
        i
      ].style.transform = `translate3d(${this.trailsTranslation[i].previous.x}px,${this.trailsTranslation[i].previous.y}px,0)`;
    }
  }
}
