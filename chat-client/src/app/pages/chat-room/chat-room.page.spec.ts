import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomPage } from './chat-room.page';

describe('ChatRoomPage', () => {
  let component: ChatRoomPage;
  let fixture: ComponentFixture<ChatRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
