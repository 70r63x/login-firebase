import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as loginActions from '../actions/login.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

@Injectable()
export class LoginEffects {
    
    constructor(
        private actions$: Actions,
        private _service: AuthService
    ){}

    CargaLoginDatos$ = createEffect(
        () => this.actions$.pipe(
            ofType( loginActions.isLoadingLogin ),
            mergeMap(
                (datosUser) => this._service.login(datosUser.usuario)
                    .pipe(
                        map( data => loginActions.stopLoadingLogin({ datos: data }) ),
                        catchError( err => of(loginActions.loadingErrorLogin({ payload: err })) )
                    )
            )
        )
    );

}