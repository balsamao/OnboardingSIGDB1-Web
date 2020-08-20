import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';

import { Funcionario } from '../funcionario.model';
import { FuncionarioService } from '../funcionario.service';
import { Cargo } from '../../cargos/cargo.model';
import { CargoService } from '../../cargos/cargo.service';

@Component({
  selector: 'app-vincular-cargo',
  templateUrl: './vincular-cargo.component.html',
  styleUrls: ['./vincular-cargo.component.css']
})
export class VincularCargoComponent implements OnInit {

  private funcionario: Funcionario;

  titulo: string = 'Vincular Funcionário a um Cargo';
  mensagem: string = 'Não foi possível realizar operação.';
  exibirMsgErro: boolean = false;
  sucesso: boolean = false;
  cargos: Cargo[] = [];

  funcionarioForm = this.fb.group({
    id: [{ Value: this.funcionario?.id }],
    name: [this.funcionario?.name, Validators.required],
    cpf: [{ Value: this.funcionario?.cpf }],
    hiring: [{ Value: this.funcionario?.hiring }],
    companyId: [{ Value: this.funcionario?.companyId }],
    roleId: [this.funcionario?.roleId],
  });

  constructor(private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private cargoService: CargoService,
    private route: ActivatedRoute) {
    this.sucesso = false;
    this.listarCargos();
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.funcionarioService.listarPorId(this.route.snapshot.params['id'])
        .subscribe(retorno => {
          this.funcionarioForm.patchValue(retorno);
          this.funcionario = retorno;
        });
    }
  }

  public salvarFuncionario() {
    this.funcionarioService.atualizar(this.entidade())
      .subscribe(retorno => {
        this.sucesso = true;
        this.funcionarioForm.reset()
      });
  }

  onSelect(id: number) {
    this.funcionarioForm.get("roleId").patchValue(Number(id));
  }

  private listarCargos() {
    this.cargoService.listar()
      .subscribe(cargos => this.cargos = cargos, error => this.cargos = []);
  }

  private entidade() { return this.funcionarioForm.getRawValue() as Funcionario; }

}
