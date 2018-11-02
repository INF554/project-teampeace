import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarworldmapComponent } from './warworldmap.component';

describe('WarworldmapComponent', () => {
  let component: WarworldmapComponent;
  let fixture: ComponentFixture<WarworldmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarworldmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarworldmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
