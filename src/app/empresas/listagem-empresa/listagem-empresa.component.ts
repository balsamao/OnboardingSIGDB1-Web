import { Component, OnInit, Input } from '@angular/core';

import { Empresa } from '../empresa.model';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-listagem-empresa',
  templateUrl: './listagem-empresa.component.html',
  styleUrls: ['./listagem-empresa.component.css']
})
export class ListagemEmpresaComponent implements OnInit {

  @Input() empresas : Empresa[];

  constructor(private empresaService: EmpresaService) { }

  ngOnInit(): void {
  }

  public excluirEmpresa(id : number){
    this.empresaService.excluir(id)
    .subscribe(_ => this.listarEmpresas());
  }

  private listarEmpresas() {
    this.empresaService.listar()
      .subscribe(empresas => this.empresas = empresas, _ => this.empresas = []);
  }

}
