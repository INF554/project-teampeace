import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinemilgdpComponent } from './linemilgdp.component';

describe('LinemilgdpComponent', () => {
  let component: LinemilgdpComponent;
  let fixture: ComponentFixture<LinemilgdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinemilgdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinemilgdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
