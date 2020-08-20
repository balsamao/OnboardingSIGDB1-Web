import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Cargo } from './cargo.model';
import { CargoService } from './cargo.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {

  titulo : string = 'Listagem de cargos';
  cargoForm: FormGroup;
  cargos: Cargo[] = [];

  constructor(private fb: FormBuilder,
    private cargoService: CargoService) {
    this.cargoForm = this.fb.group({
      id: [''],
      description: ['']
    });

  }

  ngOnInit(): void {
    this.cargoService.listar()
      .subscribe(cargos => this.cargos = cargos);
  }

  filtrarCargos() {
    this.cargoService.filtrar(this._prepararDados())
      .subscribe(empresas => this.cargos = empresas, _ => this.cargos = []);
  }

  private _prepararDados(): Cargo {
    var filtro = this.cargoForm.getRawValue() as Cargo;
    return new Cargo(filtro.description);
  }

}
