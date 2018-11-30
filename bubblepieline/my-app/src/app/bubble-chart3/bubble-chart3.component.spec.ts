import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleChart3Component } from './bubble-chart3.component';

describe('BubbleChart3Component', () => {
  let component: BubbleChart3Component;
  let fixture: ComponentFixture<BubbleChart3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleChart3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleChart3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
