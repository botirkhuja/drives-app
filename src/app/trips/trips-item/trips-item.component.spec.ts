import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsItemComponent } from './trips-item.component';

describe('TripsItemComponent', () => {
  let component: TripsItemComponent;
  let fixture: ComponentFixture<TripsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
