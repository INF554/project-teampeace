import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidsWarsTradeInfWorldComponent } from './mids-wars-trade-inf-world.component';

describe('MidsWarsTradeInfWorldComponent', () => {
  let component: MidsWarsTradeInfWorldComponent;
  let fixture: ComponentFixture<MidsWarsTradeInfWorldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidsWarsTradeInfWorldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidsWarsTradeInfWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
