import { ComponentFixture, TestBed } from '@angular/core/testing';

import { aireDeJeuFormComponent } from './aire-de-jeu-form.component';

describe('GameFormComponent', () => {
  let component: aireDeJeuFormComponent;
  let fixture: ComponentFixture<aireDeJeuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [aireDeJeuFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(aireDeJeuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
