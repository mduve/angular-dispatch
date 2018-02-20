import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dispatch4Component } from './dispatch4.component';

describe('Dispatch4Component', () => {
  let component: Dispatch4Component;
  let fixture: ComponentFixture<Dispatch4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dispatch4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dispatch4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
