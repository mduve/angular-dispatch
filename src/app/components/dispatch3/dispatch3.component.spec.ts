import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dispatch3Component } from './dispatch3.component';

describe('Dispatch3Component', () => {
  let component: Dispatch3Component;
  let fixture: ComponentFixture<Dispatch3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dispatch3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dispatch3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
