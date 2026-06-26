import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProf } from './dashboard-prof';

describe('DashboardProf', () => {
  let component: DashboardProf;
  let fixture: ComponentFixture<DashboardProf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
