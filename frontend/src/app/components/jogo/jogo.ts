import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RankingService } from '../../services/ranking.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './jogo.html',
  styleUrl: './jogo.css'
})
export class JogoComponent implements OnInit {

  constructor(
    private rankingService: RankingService,
    private router: Router,
    private http: HttpClient
  ) {}

  coresDisponiveis: string[] = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

  tentativa: string[] = ['', '', '', ''];
  mensagem: string = '';
  jogoFinalizado = false;

  partidaId: number = 0;

  historico: Array<{
    tentativa: string[];
    acertosPosicao: number;
    acertosOutraPosicao: number;
  }> = [];

  ngOnInit() {
    this.iniciarPartida();
  }

  iniciarPartida() {
    const usuario = localStorage.getItem('usuario') || 'Jogador';

    this.http.post<any>(
      `http://localhost:8080/jogo/iniciar?usuario=${usuario}`,
      {}
    ).subscribe({
      next: (data) => {
        this.partidaId = data.partidaId;
        console.log('Partida iniciada:', this.partidaId);
      },
      error: (err) => {
        console.error('Erro ao iniciar partida', err);
        this.mensagem = 'Erro ao iniciar jogo.';
      }
    });
  }

  selecionarCor(cor: string) {

    if (this.jogoFinalizado) return;

    for (let i = 0; i < this.tentativa.length; i++) {
      if (this.tentativa[i] === '') {
        const novaTentativa = [...this.tentativa];
        novaTentativa[i] = cor;
        this.tentativa = novaTentativa;
        return;
      }
    }
  }

  verificar() {

    if (this.jogoFinalizado) return;

    if (!this.partidaId) {
      this.mensagem = 'Aguarde o jogo iniciar...';
      return;
    }

    if (this.historico.length >= 10) {
      this.mensagem = 'Você perdeu!';
      this.jogoFinalizado = true;
      return;
    }

    if (this.tentativa.includes('')) {
      this.mensagem = 'Preencha todas as 4 posições.';
      return;
    }

    this.http.post<any>(
      `http://localhost:8080/jogo/jogar?partidaId=${this.partidaId}`,
      { tentativa: this.tentativa }
    ).subscribe({
      next: (data) => {

        const acertosPosicao = data.acertosPosicao;
        const acertosOutraPosicao = data.acertosOutraPosicao;

        this.historico = [
          ...this.historico,
          {
            tentativa: [...this.tentativa],
            acertosPosicao,
            acertosOutraPosicao
          }
        ];

        if (acertosPosicao === 4 && !this.jogoFinalizado) {

          this.jogoFinalizado = true;
          this.mensagem = 'Parabéns! Você acertou!';

          this.rankingService.salvar({
            usuario: localStorage.getItem('usuario') || 'Jogador',
            tentativas: this.historico.length,
            venceu: true
          }).subscribe({
            next: () => console.log('Partida salva!'),
            error: (err) => console.error('Erro ao salvar', err)
          });

        } else {
          this.mensagem =
            `Posição correta: ${acertosPosicao} | ` +
            `Cor correta fora da posição: ${acertosOutraPosicao}`;
        }
        
          this.tentativa = ['', '', '', ''];
      },
      error: (err) => {
        console.error('Erro ao jogar', err);
        this.mensagem = 'Erro ao processar jogada.';
      }
    });
  }

  reiniciar() {
    this.tentativa = ['', '', '', ''];
    this.mensagem = '';
    this.historico = [];
    this.jogoFinalizado = false;

    this.iniciarPartida();
  }

  getArray(qtd: number): any[] {
    return Array(qtd);
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }
}