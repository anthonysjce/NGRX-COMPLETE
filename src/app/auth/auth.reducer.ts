import { Action } from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions, AuthActionTypes } from './auth.actions';


export interface AuthState {
  loggedIn:boolean,
  user:User
}

export const initialAuthState: AuthState = {
  loggedIn:false,
  user:undefined
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch(action.type){
    case AuthActionTypes.LoginAction:{
      //create a new state object and return
      return {
        loggedIn:true,
        user: action.payLoad.user
      }

    }
    case AuthActionTypes.LogoutAction:{
      return {
        loggedIn:false,
        user: undefined
      }
    }  
    default:{
      //return existing state without modification
       return state;
    }
  }
}
