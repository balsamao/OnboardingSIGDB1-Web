import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Empresa } from './empresa.model';

import { API } from '../app.api';

import { ErrorHandler } from '../app.error-handler';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class EmpresaService {

    constructor(private http : HttpClient) { }

    listar() : Observable<Empresa[]> {
        return this.http.get<Empresa[]>(`${API}/api/empresas`)
        .pipe(catchError(ErrorHandler.handleError));
    }

    listarPorId(id : number) : Observable<Empresa> {
        return this.http.get<Empresa>(`${API}/api/empresas/${id}`, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }

    filtrar(filtro: Empresa) : Observable<Empresa[]> {
        return this.http.post<Empresa[]>(`${API}/api/empresas/pesquisar`, filtro, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }

    salvar(empresa: Empresa) : Observable<Empresa> {
        return this.http.post<Empresa>(`${API}/api/empresas`, empresa, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }

    atualizar(empresa: Empresa) : Observable<Empresa> {
        return this.http.put<Empresa>(`${API}/api/empresas/${empresa.id}`, empresa, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }

    excluir(id: number) : Observable<boolean> {
        return this.http.delete<boolean>(`${API}/api/empresas/${id}`, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }
}