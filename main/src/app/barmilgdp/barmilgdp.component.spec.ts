import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarmilgdpComponent } from './barmilgdp.component';

describe('BarmilgdpComponent', () => {
  let component: BarmilgdpComponent;
  let fixture: ComponentFixture<BarmilgdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarmilgdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarmilgdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
