import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Funcionario } from '../funcionario.model';
import { FuncionarioService } from '../funcionario.service';
import { DataService } from '../../compartilhado/services/data.service';

import { cpfValidador } from '../../compartilhado/validadores/cpf-validador';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent implements OnInit {

  regexCPF : string = '^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$';
  private funcionario: Funcionario;

  titulo: string = 'Cadastro de funcionários';
  sucesso: boolean = false;
  mensagemErro: string = '';
  funcionarioForm: FormGroup;

  constructor(private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private dataService: DataService,
    private route: ActivatedRoute) {
      
    this.funcionarioForm = this.fb.group({
      id: [this.funcionario?.id],
      name: [this.funcionario?.name, [Validators.required, Validators.maxLength(150)]],
      cpf: [this.funcionario?.cpf, [Validators.required, Validators.pattern(this.regexCPF), cpfValidador]],
      hiring: [this.funcionario?.hiring],
      companyId: [{Value: this.funcionario?.companyId}],
      roleId: [{Value: this.funcionario?.roleId}], 
    });
  }

  ngOnInit(): void {

    if (this.route.snapshot.params['id']) {
      this.funcionarioService.listarPorId(this.route.snapshot.params['id'])
        .subscribe(retorno => {
          this.funcionarioForm.patchValue(retorno);
          this.funcionarioForm.get("hiring").setValue(this.dataService.formatarString(retorno.hiring, "yyyy-MM-DD"));
        });
    }

  }

  public salvarFuncionario() {
    
    if (this.entidade().id > 0) {
      this.funcionarioService.atualizar(this.entidade())
        .subscribe(_ => {
          this.sucesso = true;
          this.funcionarioForm.reset()
        }, error => this.mensagemErro = error);
    }
    else {
      this.funcionarioService.salvar(this.entidade())
        .subscribe(_ => {
          this.sucesso = true;
          this.funcionarioForm.reset()
        }, error => this.mensagemErro = error);
    }
  }

  public teste(erro: any){
    console.log(erro);
  }

  get name() { return this.funcionarioForm.get('name'); }

  get cpf() { return this.funcionarioForm.get('cpf'); }

  get hiring() { return this.funcionarioForm.get('hiring'); }

  private entidade() { return this.funcionarioForm.getRawValue() as Funcionario; }

}
