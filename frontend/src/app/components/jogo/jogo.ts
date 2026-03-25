import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RankingService } from '../../services/ranking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './jogo.html',
  styleUrl: './jogo.css'
})
export class JogoComponent {
  
  constructor(
    private rankingService: RankingService,
    private router: Router
  ) {
    this.gerarCodigo();
  }
  
  coresDisponiveis: string[] = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];


  codigo: string[] = [];
  tentativa: string[] = ['', '', '', ''];
  mensagem: string = '';
  jogoFinalizado = false;

  historico: Array<{
    tentativa: string[];
    acertosPosicao: number;
    acertosOutraPosicao: number;
  }> = [];

  gerarCodigo() {
    this.codigo = [];

    for (let i = 0; i < 4; i++) {
      const cor = this.coresDisponiveis[
        Math.floor(Math.random() * this.coresDisponiveis.length)
      ];
      this.codigo.push(cor);
    }
  }

  selecionarCor(cor: string) {

    if (this.jogoFinalizado) return;

    for (let i = 0; i < this.tentativa.length; i++) {
      if (!this.tentativa[i]) {
        this.tentativa[i] = cor;
        return;
      }
    }
  }

  verificar() {

    if (this.jogoFinalizado) return;

    if (this.historico.length >= 10) {
      this.mensagem = 'Você perdeu!';
      this.jogoFinalizado = true;
      return;
    }

    if (this.tentativa.includes('')) {
      this.mensagem = 'Preencha todas as 4 posições.';
      return;
    }

    const atual = [...this.tentativa];

    let acertosPosicao = 0;
    let acertosOutraPosicao = 0;

    const usadoCodigo = Array(4).fill(false);
    const usadoTentativa = Array(4).fill(false);

    // Cor e posição corretas
    for (let i = 0; i < 4; i++) {
      if (atual[i] === this.codigo[i]) {
        acertosPosicao++;
        usadoCodigo[i] = true;
        usadoTentativa[i] = true;
      }
    }

    //Cor correta e posição errada
    for (let i = 0; i < 4; i++) {
      if (usadoTentativa[i]) continue;

      for (let j = 0; j < 4; j++) {
        if (usadoCodigo[j]) continue;

        if (atual[i] === this.codigo[j]) {
          acertosOutraPosicao++;
          usadoCodigo[j] = true;
          usadoTentativa[i] = true;
          break;
        }
      }
    }

    
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
      
      this.mensagem = 'Parabéns! Você acertou o código!';
      
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
  }

  reiniciar() {
    this.tentativa = ['', '', '', ''];
    this.mensagem = '';
    this.historico = [];
    this.jogoFinalizado = false;
    this.gerarCodigo();
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