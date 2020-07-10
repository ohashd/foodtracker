import { createSelector } from 'reselect';
import type { RootState } from 'App/Store/Store';

const getUser = (state: RootState) => state.user.username

export const isLoggedIn = createSelector(
  [getUser],
  (username) => {
    return username !== "";
  }
)