import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Funcionario } from './funcionario.model';
import { FuncionarioService } from './funcionario.service';

import { DataService } from '../compartilhado/services/data.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  titulo : string = 'Listagem de funcionários';
  funcionarioForm: FormGroup;
  funcionarios: Funcionario[];

  constructor(private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private dataService: DataService) {
    this.funcionarioForm = this.fb.group({
      id: [''],
      name: ['',],
      cpf: ['',],
      hiring: ['']
    });

  }

  ngOnInit(): void {
    this.funcionarioService.listar()
      .subscribe(empresas => this.funcionarios = empresas);
  }

  filtrarFuncionarios() {
    this.funcionarioService.filtrar(this._prepararDados())
      .subscribe(empresas => this.funcionarios = empresas, _ => this.funcionarios = []);
  }

  private _prepararDados(): Funcionario {
    var filtro = this.funcionarioForm.getRawValue() as Funcionario;
    return new Funcionario(filtro.name, filtro.cpf, filtro.hiring);
  }

}
