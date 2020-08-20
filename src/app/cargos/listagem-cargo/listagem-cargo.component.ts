import { Component, OnInit, Input } from '@angular/core';

import { Cargo } from '../cargo.model';
import { CargoService } from '../cargo.service';

@Component({
  selector: 'app-listagem-cargo',
  templateUrl: './listagem-cargo.component.html',
  styleUrls: ['./listagem-cargo.component.css']
})
export class ListagemCargoComponent implements OnInit {

  @Input() cargos : Cargo[];

  constructor(private cargoService: CargoService) { }

  ngOnInit(): void {
  }

  public excluirCargo(id : number){
    this.cargoService.excluir(id)
    .subscribe(_ => this.listarCargos());
  }

  private listarCargos() {
    this.cargoService.listar()
      .subscribe(cargos => this.cargos = cargos, _ => this.cargos = []);
  }

}
