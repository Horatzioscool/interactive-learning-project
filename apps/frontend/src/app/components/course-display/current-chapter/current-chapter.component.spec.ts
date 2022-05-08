import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentChapterComponent } from './current-chapter.component';

describe('CurrentChapterComponent', () => {
  let component: CurrentChapterComponent;
  let fixture: ComponentFixture<CurrentChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentChapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
