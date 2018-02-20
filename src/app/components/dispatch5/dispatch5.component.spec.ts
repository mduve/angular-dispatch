import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dispatch5Component } from './dispatch5.component';

describe('Dispatch5Component', () => {
  let component: Dispatch5Component;
  let fixture: ComponentFixture<Dispatch5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dispatch5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dispatch5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
