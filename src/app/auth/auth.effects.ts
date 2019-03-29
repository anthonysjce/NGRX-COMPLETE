import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Login, AuthActionTypes, Logout } from './auth.actions';
import { tap } from 'rxjs/operators';
import { dispatch } from 'rxjs/internal/observable/range';
import { Router } from '@angular/router';
import { defer, of, Observable } from 'rxjs';

/* dont forget to  call  EffectsModule.forRoot([]) in mainmodule */

@Injectable()
export class AuthEffects {

  @Effect({dispatch:false})
  /**if the follwoing effect is not producing further action
   * dispath = false, in some case during an effect while saving to database 
   * if the service is going to return soem result and this we are further trying to save to store 
   * will create another action
   */
  
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action =>{
      localStorage.setItem('user',JSON.stringify(action.payLoad.user))
      }
    )
  );
  
  @Effect({dispatch:false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('')

    })
  );
 /* defer rxjs opp it creates an observable only when someone subscribes to it 
 so here we are using defer to create an observer only when ngrx effect is ready to dispatch
 reciev a new action. we dont want dispatch any action before all the system is initialized
 */
  @Effect()
  init$ = defer(() => {
    const userData = localStorage.getItem('user');
    console.log("userData "+userData)
   
    
    
    let result$:Observable<any>;
    if(userData && userData != "undefined")
      result$ = of(new Login(JSON.parse(userData))) 
    else
      result$ = of(new Logout()) 
    
      return result$;    
  })

  constructor(private actions$: Actions, private router:Router) {

  }
}
