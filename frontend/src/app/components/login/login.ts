import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  senha = '';
  erro = '';

  constructor(
    private router: Router, 
    private authService: AuthService
  ) {}

  login() {

    this.authService.login({
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: (user: any) => {

        localStorage.setItem('usuario', user.email);

        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.erro = 'Usuário ou senha inválidos';
      }
    });
}

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
    
}