import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Funcionario } from './funcionario.model';

import { API } from '../app.api';

import { ErrorHandler } from '../app.error-handler';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class FuncionarioService{
 
    constructor(private http : HttpClient) { }

    listar() : Observable<Funcionario[]> {
        return this.http.get<Funcionario[]>(`${API}/api/funcionarios`)
        .pipe(catchError(ErrorHandler.handleError));
    }

    listarPorId(id : number) : Observable<Funcionario> {
        return this.http.get<Funcionario>(`${API}/api/funcionarios/${id}`, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }

    filtrar(filtro: Funcionario) : Observable<Funcionario[]> {
        return this.http.post<Funcionario[]>(`${API}/api/funcionarios/pesquisar`, filtro, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }

    salvar(empresa: Funcionario) : Observable<Funcionario> {
        return this.http.post<Funcionario>(`${API}/api/funcionarios`, empresa, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }

    atualizar(empresa: Funcionario) : Observable<Funcionario> {
        return this.http.put<Funcionario>(`${API}/api/funcionarios/${empresa.id}`, empresa, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }

    excluir(id: number) : Observable<boolean> {
        return this.http.delete<boolean>(`${API}/api/funcionarios/${id}`, httpOptions)
        .pipe(catchError(ErrorHandler.handleError));
    }
}