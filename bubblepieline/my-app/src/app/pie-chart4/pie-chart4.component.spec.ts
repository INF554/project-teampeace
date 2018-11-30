import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChart4Component } from './pie-chart4.component';

describe('PieChart4Component', () => {
  let component: PieChart4Component;
  let fixture: ComponentFixture<PieChart4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChart4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChart4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
