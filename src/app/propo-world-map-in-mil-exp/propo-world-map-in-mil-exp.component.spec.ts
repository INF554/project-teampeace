import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropoWorldMapInMilExpComponent } from './propo-world-map-in-mil-exp.component';

describe('PropoWorldMapInMilExpComponent', () => {
  let component: PropoWorldMapInMilExpComponent;
  let fixture: ComponentFixture<PropoWorldMapInMilExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropoWorldMapInMilExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropoWorldMapInMilExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
