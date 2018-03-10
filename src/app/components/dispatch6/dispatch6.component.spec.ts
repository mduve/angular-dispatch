import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dispatch6Component } from './dispatch6.component';

describe('Dispatch6Component', () => {
  let component: Dispatch6Component;
  let fixture: ComponentFixture<Dispatch6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dispatch6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dispatch6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
