import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators, FormGroup, } from '@angular/forms';

import { Empresa } from '../empresa.model';
import { EmpresaService } from '../empresa.service';
import { DataService } from '../../compartilhado/services/data.service';

import { cnpjValidador } from '../../compartilhado/validadores/cnpj-validador';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {

  public regexCnpj = '^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$';
  private empresa: Empresa;

  titulo: string = 'Cadastro de empresas';
  sucesso: boolean = false;
  mensagemErro: string = '';
  empresaForm: FormGroup;

  constructor(private fb: FormBuilder,
    private empresaService: EmpresaService,
    private dataService: DataService,
    private route: ActivatedRoute) {

    this.empresaForm = this.fb.group({
      id: [this.empresa?.id],
      name: [this.empresa?.name, [Validators.required, Validators.maxLength(150)]],
      cnpj: [this.empresa?.cnpj, [Validators.required, Validators.pattern(this.regexCnpj), cnpjValidador]],
      fundation: []
    });
  }

  ngOnInit(): void {

    if (this.route.snapshot.params['id']) {
      this.empresaService.listarPorId(this.route.snapshot.params['id'])
        .subscribe(retorno => {
          this.empresaForm.patchValue(retorno);
          this.empresaForm.get("fundation").setValue(this.dataService.formatarString(retorno.fundation, "yyyy-MM-DD"));
        });
    }

  }

  public salvarEmpresa() {

    if (this.entidade().id > 0) {
      this.empresaService.atualizar(this.entidade())
      .subscribe(_ => this.respostaSucesso(), error => this.respostaComErro(error));
    }
    else {
      this.empresaService.salvar(this.entidade())
      .subscribe(_ => this.respostaSucesso(), error => this.respostaComErro(error));
    }
  }

  today(): string {
    return this.dataService.today();
  }
  
  get name() { return this.empresaForm.get('name'); }

  get cnpj() { return this.empresaForm.get('cnpj'); }

  get fundation() { return this.empresaForm.get('fundation'); }

  private entidade() { return this.empresaForm.getRawValue() as Empresa; }

  private respostaSucesso() {
    this.sucesso = true;
    this.mensagemErro = "";
    this.empresaForm.reset()
  }

  private respostaComErro(error: any) {
    this.mensagemErro = error;
    this.sucesso = false;
  }

}