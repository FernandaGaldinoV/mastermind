import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent {

  email = '';
  senha = '';
  mensagem = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cadastrar() {
    this.authService.cadastrar({
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: () => {
        this.mensagem = 'Usuário cadastrado com sucesso!';
        this.router.navigate(['/']);
      },
      error: () => {
        this.mensagem = 'Erro ao cadastrar usuário';
      }
    });
  }

  voltar() {
    this.router.navigate(['/']);
  }
}