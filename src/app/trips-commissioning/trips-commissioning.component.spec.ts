import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsCommissioningComponent } from './trips-commissioning.component';

describe('TripsCommissioningComponent', () => {
  let component: TripsCommissioningComponent;
  let fixture: ComponentFixture<TripsCommissioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsCommissioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsCommissioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
