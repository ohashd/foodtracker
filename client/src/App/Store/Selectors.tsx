import { createSelector } from 'reselect';
import type { RootStore } from 'App/Store/Store';

const getUser = (state: RootStore) => state.user

export const isLoggedIn = createSelector(
  [getUser],
  (user) => {
    return user !== "";
  }
)