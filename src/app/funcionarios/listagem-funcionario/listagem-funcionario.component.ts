import { Component, OnInit, Input } from '@angular/core';

import { Funcionario } from '../funcionario.model';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-listagem-funcionario',
  templateUrl: './listagem-funcionario.component.html',
  styleUrls: ['./listagem-funcionario.component.css']
})
export class ListagemFuncionarioComponent implements OnInit {

  @Input() funcionarios : Funcionario[];

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
  }

  public excluirFuncionario(id : number){
    this.funcionarioService.excluir(id)
    .subscribe(funcionarios => this.listarFuncionarios());
  }

  private listarFuncionarios() {
    this.funcionarioService.listar()
      .subscribe(funcionarios => this.funcionarios = funcionarios, error => this.funcionarios = []);
  }

}
