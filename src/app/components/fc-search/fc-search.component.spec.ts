import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcSearchComponent } from './fc-search.component';

describe('FcSearchComponent', () => {
  let component: FcSearchComponent;
  let fixture: ComponentFixture<FcSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
