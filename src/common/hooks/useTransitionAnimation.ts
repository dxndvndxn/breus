import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { PageName } from '../../app/routing/appRoutes';
import {
  aboutPageEnter,
  mainPageEnter,
  mainPageExit,
  usualPageEnter,
  aboutPageExit,
  contactsPageEnter,
  contactsPageExit,
  portfoliosPageEnter,
  portfoliosPageExit,
} from '../helpers/transitions';
import type { TransitionStatus } from 'react-transition-group';

type AnimationsList = {
  [value in PageName]: {
    entering?: (tl: gsap.core.Timeline, isFirstLoad?: boolean) => void;
    exiting?: (tl: gsap.core.Timeline, isFirstLoad?: boolean) => void;
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
    [PageName.NOT_FOUND]: {},
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (pageName && status) {
        const { entering, exiting } = animationsList[pageName];
        const enteringStatus = status === 'entering';

        if (entering && exiting) {
          if (enteringStatus && pageName === 'main') {
            entering(tl, !disableAnimation);
          } else if (
            enteringStatus &&
            !disableAnimation &&
            pageName !== 'main'
          ) {
            usualPageEnter(tl);
            entering(tl);
          } else if (
            enteringStatus &&
            disableAnimation &&
            pageName !== 'main'
          ) {
            entering(tl);
          } else {
            exiting(tl);
          }
        }
      }
    }, document.getElementById('root')!);

    return () => {
      ctx.revert();
    };
  }, [pageName, status]);
};
