import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Catagori } from './catagori';

describe('Catagori', () => {
  let component: Catagori;
  let fixture: ComponentFixture<Catagori>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catagori]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Catagori);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
