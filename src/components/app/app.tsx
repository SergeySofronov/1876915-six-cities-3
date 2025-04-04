import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginPage from '../../pages/login-page/login-page';
import PlacePage from '../../pages/place-page/place-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import NotFoundPageRedirect from '../../pages/not-found-page/not-found-page-redirect';
import ScrollToTop from '../scroll-top/scroll-top';
import Spinner from '../spinner/spinner';
import { RequestStatus } from '../../types';
import { useFavoritesFetchStatusSelector, usePreviewsFetchStatusSelector } from '../../store/place-data/selectors';
import { useActionCreators } from '../../hooks';
import { placeDataActions } from '../../store/place-data/place-data';
import { useEffect } from 'react';
import { userProcessActions } from '../../store/user-process/user-process';
import { useAuthStatusSelector } from '../../store/user-process/selectors';

export default function App() {

  const { fetchPreviewsAction, fetchFavoritesAction } = useActionCreators(placeDataActions);
  const { checkAuthAction } = useActionCreators(userProcessActions);

  const authStatus = useAuthStatusSelector();
  const isAuthorized = (authStatus === AuthorizationStatus.Auth);

  useEffect(() => {
    if (isAuthorized) {
      fetchFavoritesAction();
    }
  }, [fetchFavoritesAction, isAuthorized]);

  useEffect(() => {
    fetchPreviewsAction();
  }, [fetchPreviewsAction]);

  useEffect(() => {
    checkAuthAction();
  }, [checkAuthAction]);

  const previewStatus = usePreviewsFetchStatusSelector();
  const favoritesStatus = useFavoritesFetchStatusSelector();

  if ((previewStatus === RequestStatus.Pending) && (favoritesStatus === RequestStatus.Pending)) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Offers} element={<PlacePage />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute >
              <FavoritesPage />
            </PrivateRoute>
          }
          />
          <Route path='*' element={<NotFoundPageRedirect />} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HelmetProvider >
  );
}
