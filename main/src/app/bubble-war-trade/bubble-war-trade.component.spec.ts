import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleWarTradeComponent } from './bubble-war-trade.component';

describe('BubbleWarTradeComponent', () => {
  let component: BubbleWarTradeComponent;
  let fixture: ComponentFixture<BubbleWarTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleWarTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleWarTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
