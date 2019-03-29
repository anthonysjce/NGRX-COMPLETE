import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import { AppState } from './reducers';
import { Logout } from './auth/auth.actions';
import { map } from 'rxjs/operators';
import { isloggedIn } from './auth/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


    isLoggedIn$:Observable<boolean>;
    isLoggedOut$:Observable<boolean>;
    constructor(private store:Store<any>, private router: Router) {

    }

    ngOnInit() {      
      //this.store.subscribe(state=>console.log(state));
      
      //this to check what value  we ar getting for logged in 
      //subsribe and check with console log 
      /*  this.store
      .pipe(
        map(state => state.auth.loggedIn)
      )
      .subscribe(loggedIn =>console.log(loggedIn));  */
      
    

      /* this.isLoggedIn$ = this.store
      .pipe(
        map(state => state.auth.loggedIn)
      ) */
      this.isLoggedIn$ = this.store
      .pipe(
        select(isloggedIn)
      )

      this.isLoggedOut$= this.store
      .pipe(
        select(isloggedIn)
      )
    }

    logout() {
      this.store.dispatch(new Logout());
      //this.router.navigateByUrl('');--> this is a side effect 
      // so we moved this logout effect

    }


}
