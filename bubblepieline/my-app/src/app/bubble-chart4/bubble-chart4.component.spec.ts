import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleChart4Component } from './bubble-chart4.component';

describe('BubbleChart4Component', () => {
  let component: BubbleChart4Component;
  let fixture: ComponentFixture<BubbleChart4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleChart4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleChart4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
