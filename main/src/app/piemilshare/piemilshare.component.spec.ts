import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiemilshareComponent } from './piemilshare.component';

describe('PiemilshareComponent', () => {
  let component: PiemilshareComponent;
  let fixture: ComponentFixture<PiemilshareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiemilshareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiemilshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
