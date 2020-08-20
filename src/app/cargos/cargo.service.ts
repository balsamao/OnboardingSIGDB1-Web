import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Cargo } from './cargo.model';

import { API } from '../app.api';

import { ErrorHandler } from '../app.error-handler';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class CargoService{

    constructor(private http : HttpClient) { }

    listar() : Observable<Cargo[]> {
        return this.http.get<Cargo[]>(`${API}/api/cargos`)
        .pipe(catchError(ErrorHandler.handleError));
    }

    listarPorId(id : number) : Observable<Cargo> {
        return this.http.get<Cargo>(`${API}/api/cargos/${id}`, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }

    filtrar(filtro: Cargo) : Observable<Cargo[]> {
        return this.http.post<Cargo[]>(`${API}/api/cargos/pesquisar`, filtro, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }

    salvar(empresa: Cargo) : Observable<Cargo> {
        return this.http.post<Cargo>(`${API}/api/cargos`, empresa, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }

    atualizar(empresa: Cargo) : Observable<Cargo> {
        return this.http.put<Cargo>(`${API}/api/cargos/${empresa.id}`, empresa, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }

    excluir(id: number) : Observable<boolean> {
        return this.http.delete<boolean>(`${API}/api/cargos/${id}`, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }
}