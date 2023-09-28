import { useEffect } from 'react';
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
import { useAppDispatch } from '../store';
import { appActions } from '../../app/AppSlice';

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
  const dispatch = useAppDispatch();
  const { setAnimationComplete } = appActions;
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
      const tl = gsap.timeline({
        onComplete: () => {
          dispatch(setAnimationComplete(true));
        },
      });

      if (pageName && status) {
        const { entering, exiting } = animationsList[pageName];
        const enteringStatus = status === 'entering';

        if (entering && exiting) {
          if (enteringStatus && pageName === PageName.MAIN) {
            entering(tl, !disableAnimation);
          } else if (
            enteringStatus &&
            !disableAnimation &&
            pageName !== PageName.MAIN
          ) {
            usualPageEnter(tl);
            entering(tl);
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
      }
    }, document.getElementById('root')!);

    return () => {
      ctx.revert();
    };
  }, [pageName, status]);
};
