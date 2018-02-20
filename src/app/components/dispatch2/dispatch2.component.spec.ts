import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dispatch2Component } from './dispatch2.component';

describe('Dispatch2Component', () => {
  let component: Dispatch2Component;
  let fixture: ComponentFixture<Dispatch2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dispatch2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dispatch2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
