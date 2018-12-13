import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoroLACountyMapInPopuComponent } from './choro-lacounty-map-in-popu.component';

describe('ChoroLACountyMapInPopuComponent', () => {
  let component: ChoroLACountyMapInPopuComponent;
  let fixture: ComponentFixture<ChoroLACountyMapInPopuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoroLACountyMapInPopuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoroLACountyMapInPopuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
