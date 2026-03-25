import { LoginComponent } from './login';

describe('LoginComponent', () => {

  let component: LoginComponent;

  beforeEach(() => {
    component = new LoginComponent(
      { login: () => ({ subscribe: () => {} }) } as any,
      { navigate: () => {} } as any
    );
  });

  it('deve mostrar erro se campos vazios', () => {
    component.email = '';
    component.senha = '';

    component.login();

    expect(component.erro).toBe('Preencha os campos');
  });

});