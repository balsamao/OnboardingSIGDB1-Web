import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';

import { Funcionario } from '../funcionario.model';
import { FuncionarioService } from '../funcionario.service';
import { Empresa } from '../../empresas/empresa.model';
import { EmpresaService } from '../../empresas/empresa.service';

@Component({
  selector: 'app-vincular-empresa',
  templateUrl: './vincular-empresa.component.html',
  styleUrls: ['./vincular-empresa.component.css']
})
export class VincularEmpresaComponent implements OnInit {

  titulo: string = 'Vincular Funcionário a uma Empresa';

  sucesso: boolean = false;
  private funcionario: Funcionario;
  empresas : Empresa[] = [];

  funcionarioForm = this.fb.group({
    id: [{Value : this.funcionario?.id}],
    name: [this.funcionario?.name, Validators.required],
    cpf: [{Value : this.funcionario?.cpf}],
    hiring: [{Value : this.funcionario?.hiring}],
    companyId: [this.funcionario?.companyId],
    roleId: [{Value: this.funcionario?.roleId}], 
  });

  constructor(private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute) {
    this.sucesso = false;
    this.listarEmpresas();
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
      }, error => this.funcionarioForm.reset());
  }

  onSelect(id : number) {
    this.funcionarioForm.get("companyId").patchValue(Number(id));
  }

  private listarEmpresas() {
    this.empresaService.listar()
      .subscribe(empresas => this.empresas = empresas, error => this.empresas = []);
  }

  private entidade() { return this.funcionarioForm.getRawValue() as Funcionario; }

}
