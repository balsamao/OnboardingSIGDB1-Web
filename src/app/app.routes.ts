import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { CadastroEmpresaComponent } from './empresas/cadastro-empresa/cadastro-empresa.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { CadastroFuncionarioComponent } from './funcionarios/cadastro-funcionario/cadastro-funcionario.component';
import { VincularEmpresaComponent } from './funcionarios/vincular-empresa/vincular-empresa.component';
import { VincularCargoComponent } from './funcionarios/vincular-cargo/vincular-cargo.component';
import { CargosComponent } from './cargos/cargos.component';
import { CadastroCargoComponent } from './cargos/cadastro-cargo/cadastro-cargo.component';

export const ROUTES: Routes = [
    {path:'', component: HomeComponent},
    {path:'empresas', component: EmpresasComponent},
    {path:'cadastro-empresa', component: CadastroEmpresaComponent},
    {path:'cadastro-empresa/:id', component: CadastroEmpresaComponent},
    {path:'funcionarios', component: FuncionariosComponent},
    {path:'cadastro-funcionario', component: CadastroFuncionarioComponent},
    {path:'cadastro-funcionario/:id', component: CadastroFuncionarioComponent},
    {path:'vincular-empresa/:id', component: VincularEmpresaComponent},
    {path:'vincular-cargo/:id', component: VincularCargoComponent},
    {path:'cargos', component: CargosComponent},
    {path:'cadastro-cargo', component: CadastroCargoComponent},
    {path:'cadastro-cargo/:id', component: CadastroCargoComponent},
    
];