import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dispatch8Component } from './dispatch8.component';

describe('Dispatch8Component', () => {
  let component: Dispatch8Component;
  let fixture: ComponentFixture<Dispatch8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dispatch8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dispatch8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
