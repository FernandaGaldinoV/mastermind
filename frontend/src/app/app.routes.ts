import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { JogoComponent } from './components/jogo/jogo';
import { RankingComponent } from './components/ranking/ranking';
import { CadastroComponent } from './components/cadastro/cadastro';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'jogo', component: JogoComponent },
  { path: 'ranking', component: RankingComponent }
];