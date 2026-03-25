import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  cadastrar(usuario: any) {
    return this.http.post(`${this.api}/usuarios`, usuario);
  }

  login(usuario: any) {
  return this.http.post<any>('http://localhost:8080/usuarios/login', usuario);
}
}