import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbarlineComponent } from './ngbarline.component';

describe('NgbarlineComponent', () => {
  let component: NgbarlineComponent;
  let fixture: ComponentFixture<NgbarlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbarlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbarlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
