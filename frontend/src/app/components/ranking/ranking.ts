import { Component, OnInit } from '@angular/core';
import { RankingService } from '../../services/ranking.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css'
})
export class RankingComponent implements OnInit {

  ranking: any[] = [];

  constructor(private rankingService: RankingService, private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarRanking();
  }

  carregarRanking() {
    this.rankingService.listar().subscribe({
      next: (dados: any[]) => {
        this.ranking = dados; 
        this.cd.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar ranking:', erro);
      }
    });
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }
  
}