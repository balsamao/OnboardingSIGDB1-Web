import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask'

import {ROUTES} from './app.routes';
import { MASK_CONFIG } from './app.mask';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './compartilhado/services/data.service';
import { EmpresasComponent } from './empresas/empresas.component';
import { ListagemEmpresaComponent } from './empresas/listagem-empresa/listagem-empresa.component';
import { CadastroEmpresaComponent } from './empresas/cadastro-empresa/cadastro-empresa.component';
import { EmpresaService } from './empresas/empresa.service';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { ListagemFuncionarioComponent } from './funcionarios/listagem-funcionario/listagem-funcionario.component';
import { CadastroFuncionarioComponent } from './funcionarios/cadastro-funcionario/cadastro-funcionario.component';
import { FuncionarioService } from './funcionarios/funcionario.service';
import { VincularEmpresaComponent } from './funcionarios/vincular-empresa/vincular-empresa.component';
import { VincularCargoComponent } from './funcionarios/vincular-cargo/vincular-cargo.component';
import { AlertaSucessoComponent } from './compartilhado/componentes/alertas/alerta-sucesso/alerta-sucesso.component';
import { CargosComponent } from './cargos/cargos.component';
import { CadastroCargoComponent } from './cargos/cadastro-cargo/cadastro-cargo.component';
import { ListagemCargoComponent } from './cargos/listagem-cargo/listagem-cargo.component';
import { CargoService } from './cargos/cargo.service';
import { AlertaErroComponent } from './compartilhado/componentes/alertas/alerta-erro/alerta-erro.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    EmpresasComponent,
    ListagemEmpresaComponent,
    CadastroEmpresaComponent,
    FuncionariosComponent,
    ListagemFuncionarioComponent,
    CadastroFuncionarioComponent,
    VincularEmpresaComponent,
    VincularCargoComponent,
    AlertaSucessoComponent,
    CargosComponent,
    CadastroCargoComponent,
    ListagemCargoComponent,
    AlertaErroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    NgxMaskModule.forRoot(MASK_CONFIG)
  ],
  providers: [DataService, EmpresaService, FuncionarioService, CargoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
