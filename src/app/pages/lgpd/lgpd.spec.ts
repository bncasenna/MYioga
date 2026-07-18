import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LGPD } from './lgpd';

describe('LGPD', () => {
  let component: LGPD;
  let fixture: ComponentFixture<LGPD>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LGPD]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LGPD);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
