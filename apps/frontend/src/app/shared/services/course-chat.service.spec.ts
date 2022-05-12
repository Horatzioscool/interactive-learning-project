import { TestBed } from '@angular/core/testing';

import { CourseChatService } from './course-chat.service';

describe('CourseChatService', () => {
  let service: CourseChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
