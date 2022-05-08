import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterListEditorComponent } from './chapter-list-editor.component';

describe('ChapterListEditorComponent', () => {
  let component: ChapterListEditorComponent;
  let fixture: ComponentFixture<ChapterListEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterListEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
