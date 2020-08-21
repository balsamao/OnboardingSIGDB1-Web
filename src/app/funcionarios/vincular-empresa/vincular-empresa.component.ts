import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { Funcionario } from '../funcionario.model';
import { FuncionarioService } from '../funcionario.service';
import { Empresa } from '../../empresas/empresa.model';
import { EmpresaService } from '../../empresas/empresa.service';
import { DataService } from '../../compartilhado/services/data.service';

@Component({
  selector: 'app-vincular-empresa',
  templateUrl: './vincular-empresa.component.html',
  styleUrls: ['./vincular-empresa.component.css']
})
export class VincularEmpresaComponent implements OnInit {

  private funcionario: Funcionario;
  titulo: string = 'Vincular Funcionário a uma Empresa';

  sucesso: boolean = false;
  mensagemErro: string = '';
  empresas : Empresa[] = [];

  funcionarioForm = this.fb.group({
    id: [{Value : this.funcionario?.id}],
    name: [this.funcionario?.name, Validators.required],
    cpf: [{Value : this.funcionario?.cpf}],
    hiring: [this.funcionario?.hiring],
    companyId: [this.funcionario?.companyId],
    roleId: [{Value: this.funcionario?.roleId}], 
  }, {validators:contratacaoValidador});

  constructor(private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private empresaService: EmpresaService,
    private dataService: DataService,
    private route: ActivatedRoute) {
    this.sucesso = false;
    this.listarEmpresas();
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.funcionarioService.listarPorId(this.route.snapshot.params['id'])
        .subscribe(retorno => {
          this.funcionarioForm.patchValue(retorno);
          if(retorno.hiring != null && retorno.hiring != ""){
            this.funcionarioForm.get("hiring").setValue(this.dataService.formatarString(retorno.hiring, "yyyy-MM-DD"));
          }
          this.funcionario = retorno;
        });
    }
  }

  public salvarFuncionario() {
    this.funcionarioService.atualizar(this.entidade())
      .subscribe(_ => this.respostaSucesso(), error => this.respostaComErro(error));
  }

  onSelect(id : number) {
    this.funcionarioForm.get("companyId").patchValue(Number(id));
  }

  private listarEmpresas() {
    this.empresaService.listar()
      .subscribe(empresas => this.empresas = empresas, error => this.empresas = []);
  }

  get companyId() { return this.funcionarioForm.get('companyId'); }

  get hiring() { return this.funcionarioForm.get('hiring'); }

  private entidade() { return this.funcionarioForm.getRawValue() as Funcionario; }

    private respostaSucesso() {
    this.sucesso = true;
    this.mensagemErro = "";
    this.funcionarioForm.reset()
  }

  private respostaComErro(error: any) {
    this.mensagemErro = error;
    this.sucesso = false;
  }

}

export const contratacaoValidador: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const companyId = control.get('companyId');
  const hiring = control.get('hiring');

  if((companyId.value != null && companyId.value != 0) && (hiring.value == "" || hiring.value == "Invalid date")){
    return { contratacaoValidador: true };
  }

  return null;
};
