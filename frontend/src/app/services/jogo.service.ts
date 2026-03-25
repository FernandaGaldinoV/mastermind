import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  private api = 'http://localhost:8080/jogo';

  constructor(private http: HttpClient) {}

  jogar(tentativa: string[]) {
    return this.http.post(`${this.api}/jogar`, {
      tentativa: tentativa
    });
  }
}