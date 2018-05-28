import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DspcComponent } from './dspc.component';

describe('DspcComponent', () => {
  let component: DspcComponent;
  let fixture: ComponentFixture<DspcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DspcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DspcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
