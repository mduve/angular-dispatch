import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DspmComponent } from './dspm.component';

describe('DspmComponent', () => {
  let component: DspmComponent;
  let fixture: ComponentFixture<DspmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DspmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DspmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
