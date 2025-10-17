import { useLocation } from 'react-router-dom';
import { MYPAGE_ROUTES } from '@/constants';
import { PageHeaderType } from '@/types/pageheader';

export const usePageHeaderType = (): PageHeaderType => {
  const location = useLocation();

  if (location.pathname === '/') {
    return 'main';
  }

  if (location.pathname.includes('/write')) {
    return 'write';
  }

  if (location.pathname === MYPAGE_ROUTES.MY_PROFILE) {
    return 'main';
  }

  if (location.pathname === MYPAGE_ROUTES.EDIT_PROFILE) {
    return 'editprofile';
  }

  if (location.pathname.startsWith('/mypage')) {
    return 'mypage';
  }

  return 'detail';
};
