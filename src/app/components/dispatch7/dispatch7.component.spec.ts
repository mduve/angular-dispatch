import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dispatch7Component } from './dispatch7.component';

describe('Dispatch7Component', () => {
  let component: Dispatch7Component;
  let fixture: ComponentFixture<Dispatch7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dispatch7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dispatch7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
