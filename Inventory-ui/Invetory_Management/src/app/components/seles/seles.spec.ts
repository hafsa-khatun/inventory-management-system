import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seles } from './seles';

describe('Seles', () => {
  let component: Seles;
  let fixture: ComponentFixture<Seles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
