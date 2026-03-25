import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private api = 'http://localhost:8080/ranking';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>('http://localhost:8080/ranking');
  }

  salvar(partida: any) {
    return this.http.post(this.api, partida);
  }

}