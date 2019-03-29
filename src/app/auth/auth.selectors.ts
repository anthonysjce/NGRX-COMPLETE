import { createSelector, select } from "@ngrx/store";

export const selectAuthState = state => state.auth;

export const isloggedIn = createSelector(
   selectAuthState,
   auth => auth.loggedIn
);
export const isloggedOut = createSelector(
    isloggedIn,
    loggedIn => !loggedIn
 );