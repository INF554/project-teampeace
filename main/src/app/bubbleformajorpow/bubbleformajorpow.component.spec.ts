import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleformajorpowComponent } from './bubbleformajorpow.component';

describe('BubbleformajorpowComponent', () => {
  let component: BubbleformajorpowComponent;
  let fixture: ComponentFixture<BubbleformajorpowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleformajorpowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleformajorpowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
