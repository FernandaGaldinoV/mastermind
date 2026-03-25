import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {

  constructor(private router: Router) {}

  irParaJogo() {
    this.router.navigate(['/jogo']);
  }

  irParaRanking() {
    this.router.navigate(['/ranking']);
  }

  voltar() {
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }
}