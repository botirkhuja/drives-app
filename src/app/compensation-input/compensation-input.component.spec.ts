import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationInputComponent } from './compensation-input.component';

describe('CompensationInputComponent', () => {
  let component: CompensationInputComponent;
  let fixture: ComponentFixture<CompensationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompensationInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
