import { useEffect } from 'react';
import { gsap } from 'gsap';
import { PageName } from '../../app/routing/appRoutes';
import {
  enter as aboutPageEnter,
  exit as aboutPageExit,
} from '../../modules/about/transitions';
import {
  enter as contactsPageEnter,
  exit as contactsPageExit,
} from '../../modules/contacts/transitions';
import {
  enter as mainPageEnter,
  exit as mainPageExit,
} from '../../modules/main/transitions';
import {
  enter as portfoliosPageEnter,
  exit as portfoliosPageExit,
} from '../../modules/portfolios/transitions';
import {
  enter as notFoundPageEnter,
  exit as notFoundPageExit,
} from '../../app/transitions';
import { enter as usualPageEnter } from '../transitions';
import type { TransitionStatus } from 'react-transition-group';

type AnimationsList = {
  [value in PageName]: {
    entering: (tl: gsap.core.Timeline, isFirstLoad?: boolean) => void;
    exiting: (tl: gsap.core.Timeline, isFirstLoad?: boolean) => void;
  };
};
export const useTransitionAnimation = (
  pageName: PageName | undefined,
  status: TransitionStatus,
  disableAnimation: boolean
) => {
  status = status === 'entered' ? 'entering' : status;
  const animationsList: AnimationsList = {
    [PageName.MAIN]: {
      entering: mainPageEnter,
      exiting: mainPageExit,
    },
    [PageName.ABOUT]: {
      entering: aboutPageEnter,
      exiting: aboutPageExit,
    },
    [PageName.PORTFOLIOS]: {
      entering: portfoliosPageEnter,
      exiting: portfoliosPageExit,
    },
    [PageName.CONTACTS]: {
      entering: contactsPageEnter,
      exiting: contactsPageExit,
    },
    [PageName.NOT_FOUND]: {
      entering: notFoundPageEnter,
      exiting: notFoundPageExit,
    },
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (pageName && status) {
        const { entering, exiting } = animationsList[pageName];
        const enteringStatus = status === 'entering';
        const percentNode = document.querySelector<HTMLElement>(
          '.preloader__percent'
        );
        const preloader = document.querySelector<HTMLElement>('.preloader');

        if (enteringStatus && pageName === PageName.MAIN) {
          if (preloader && percentNode) {
            preloader.onanimationend = () => {
              preloader.remove();
              entering(tl, !disableAnimation);
            };
          } else {
            entering(tl, !disableAnimation);
          }
        } else if (
          enteringStatus &&
          !disableAnimation &&
          pageName !== PageName.MAIN
        ) {
          if (preloader && percentNode) {
            preloader.onanimationend = () => {
              preloader.remove();
              usualPageEnter(tl);
              entering(tl);
            };
          } else {
            usualPageEnter(tl);
            entering(tl);
          }
        } else if (
          enteringStatus &&
          disableAnimation &&
          pageName !== PageName.MAIN
        ) {
          entering(tl);
        } else {
          exiting(tl);
        }
      }
    }, document.getElementById('root')!);

    return () => {
      ctx.revert();
    };
  }, [pageName, status]);
};
