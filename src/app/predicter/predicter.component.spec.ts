import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredicterComponent } from './predicter.component';

describe('PredicterComponent', () => {
  let component: PredicterComponent;
  let fixture: ComponentFixture<PredicterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredicterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredicterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
