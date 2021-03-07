import Router from 'next/router';
import { LoginPageSections } from '../@types/global';

export const navigateToLoginPageSection = (section?: LoginPageSections): void => {
  Router.push({
    pathname: '/login',
    ...(section ? { query: { section } } : {}),
  });
};
