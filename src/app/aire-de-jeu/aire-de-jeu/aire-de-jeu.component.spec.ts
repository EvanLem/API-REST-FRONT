import { ComponentFixture, TestBed } from '@angular/core/testing';

import {AireDeJeuComponent} from './aire-de-jeu.component';

describe('AireDeJeuComponent', () => {
  let component: AireDeJeuComponent;
  let fixture: ComponentFixture<AireDeJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AireDeJeuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AireDeJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
