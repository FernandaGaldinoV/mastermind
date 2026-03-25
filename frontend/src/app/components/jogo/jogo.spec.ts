import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogoComponent } from './jogo';

describe('Jogo', () => {
  let component: JogoComponent;
  let fixture: ComponentFixture<JogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JogoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
