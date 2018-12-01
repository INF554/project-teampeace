import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChomapmilgdpComponent } from './chomapmilgdp.component';

describe('ChomapmilgdpComponent', () => {
  let component: ChomapmilgdpComponent;
  let fixture: ComponentFixture<ChomapmilgdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChomapmilgdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChomapmilgdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
