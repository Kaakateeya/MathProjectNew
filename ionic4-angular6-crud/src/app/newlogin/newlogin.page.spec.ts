import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewloginPage } from './newlogin.page';

describe('NewloginPage', () => {
  let component: NewloginPage;
  let fixture: ComponentFixture<NewloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewloginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
