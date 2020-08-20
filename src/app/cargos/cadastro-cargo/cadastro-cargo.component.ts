import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';

import { Cargo } from '../cargo.model';
import { CargoService } from '../cargo.service';

@Component({
  selector: 'app-cadastro-cargo',
  templateUrl: './cadastro-cargo.component.html',
  styleUrls: ['./cadastro-cargo.component.css']
})
export class CadastroCargoComponent implements OnInit {

  private cargo: Cargo;
  titulo: string = 'Cadastros de cargos';
  sucesso: boolean = false;
  mensagemErro: string = '';
  cargoForm: FormGroup;

  constructor(private fb: FormBuilder, private cargoService: CargoService, private route: ActivatedRoute) {
    this.cargoForm = this.fb.group({
      id: [this.cargo?.id],
      description: [this.cargo?.description, [Validators.required, Validators.maxLength(250)]],
      fundation: []
    });

  }

  ngOnInit(): void {

    if (this.route.snapshot.params['id']) {
      this.cargoService.listarPorId(this.route.snapshot.params['id'])
        .subscribe(retorno => {
          this.cargoForm.patchValue(retorno);
        });
    }

  }

  public salvarCargo() {
    
    if (this.entidade().id > 0) {
      this.cargoService.atualizar(this.entidade())
        .subscribe(_ => {
          this.sucesso = true;
          this.cargoForm.reset()
        }, error => this.mensagemErro = error);
    }
    else {
      this.cargoService.salvar(this.entidade())
        .subscribe(_ => {
          this.sucesso = true;
          this.cargoForm.reset()
        }, error => this.mensagemErro = error);
    }
  }

  get description() { return this.cargoForm.get('description'); }

  private entidade() { return this.cargoForm.getRawValue() as Cargo; }

}
