import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  titulo : string = 'Listagem de empresas';
  empresaForm: FormGroup;
  empresas: Empresa[];

  constructor(private fb: FormBuilder,
    private empresaService: EmpresaService) {
    this.empresaForm = this.fb.group({
      id: [''],
      name: ['',],
      cnpj: ['',],
      fundation: ['']
    });

  }

  ngOnInit(): void {
    this.empresaService.listar()
      .subscribe(empresas => this.empresas = empresas);
  }

  filtrarEmpresas() {
    this.empresaService.filtrar(this._prepararDados())
      .subscribe(empresas => this.empresas = empresas, _ => this.empresas = []);
  }

  private _prepararDados(): Empresa {
    var filtro = this.empresaForm.getRawValue() as Empresa;
    return new Empresa(filtro.name, filtro.cnpj, filtro.fundation);
  }

}
