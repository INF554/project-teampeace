import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoroWorldMapInMilExpComponent } from './choro-world-map-in-mil-exp.component';

describe('ChoroWorldMapInMilExpComponent', () => {
  let component: ChoroWorldMapInMilExpComponent;
  let fixture: ComponentFixture<ChoroWorldMapInMilExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoroWorldMapInMilExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoroWorldMapInMilExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
