import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleChart2Component } from './bubble-chart2.component';

describe('BubbleChart2Component', () => {
  let component: BubbleChart2Component;
  let fixture: ComponentFixture<BubbleChart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleChart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
