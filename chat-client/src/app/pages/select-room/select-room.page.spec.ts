import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoomPage } from './select-room.page';

describe('SelectRoomPage', () => {
  let component: SelectRoomPage;
  let fixture: ComponentFixture<SelectRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
