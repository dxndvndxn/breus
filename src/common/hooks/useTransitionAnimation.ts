import { useEffect } from 'react';
import { gsap } from 'gsap-trial';
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
// import { useLocation } from 'react-router-dom';

export const useTransitionAnimation = (
  pageName: PageName | undefined,
  status: TransitionStatus,
  disableAnimation: boolean
) => {
  // const { pathname } = useLocation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      // const confirmUsualExiting = status === 'exiting' && pathname === '/';

      if (pageName === 'main' && status === 'entering') {
        mainPageEnter(tl, !disableAnimation);
      }
      if (pageName === 'main' && status === 'exiting') {
        mainPageExit(tl);
      }

      if (
        pageName === 'about' ||
        pageName === 'contacts' ||
        pageName === 'portfolios'
      ) {
        if (status === 'entering' && !disableAnimation) {
          usualPageEnter(tl);
        }
        // if (status === 'exiting' && confirmUsualExiting) {
        //   usualPageExit(tl);
        // }
      }

      if (pageName === 'about' && status === 'entering') {
        aboutPageEnter(tl);
      }
      if (pageName === 'about' && status === 'exiting') {
        aboutPageExit(tl);
      }
      if (pageName === 'contacts' && status === 'entering') {
        contactsPageEnter(tl);
      }
      if (pageName === 'contacts' && status === 'exiting') {
        contactsPageExit(tl);
      }
      if (pageName === 'portfolios' && status === 'entering') {
        portfoliosPageEnter(tl);
      }
      if (pageName === 'portfolios' && status === 'exiting') {
        portfoliosPageExit(tl);
      }
    }, document.getElementById('root')!);

    return () => {
      ctx.revert();
    };
  }, [pageName, status]);
};
