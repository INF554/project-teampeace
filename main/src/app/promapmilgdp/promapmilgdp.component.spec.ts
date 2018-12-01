import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromapmilgdpComponent } from './promapmilgdp.component';

describe('PromapmilgdpComponent', () => {
  let component: PromapmilgdpComponent;
  let fixture: ComponentFixture<PromapmilgdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromapmilgdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromapmilgdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
