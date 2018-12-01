import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidsworldmapComponent } from './midsworldmap.component';

describe('MidsworldmapComponent', () => {
  let component: MidsworldmapComponent;
  let fixture: ComponentFixture<MidsworldmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidsworldmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidsworldmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
