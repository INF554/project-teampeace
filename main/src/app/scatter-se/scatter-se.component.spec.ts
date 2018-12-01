import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterSeComponent } from './scatter-se.component';

describe('ScatterSeComponent', () => {
  let component: ScatterSeComponent;
  let fixture: ComponentFixture<ScatterSeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterSeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterSeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
