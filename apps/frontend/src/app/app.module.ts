import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

// components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// routing
import { AppRoutingModule } from './app-routing.module';

// service
import { AuthService } from './shared/services/auth.service';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AttachComponent } from './components/common/attach/attach.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { EntityServiceFactory } from './shared/services/entity.service';

// PrimeNG modules for components
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import {SafePipe} from "./components/DocumentViewer/SafePipe";
import { ChapterListEditorComponent } from './components/create-course/chapter-list-editor/chapter-list-editor.component';
import { CreateChapterComponent } from './components/create-course/chapter-list-editor/create-chapter/create-chapter.component';
import { CourseDisplayComponent } from './components/course-display/course-display.component';
import { CurrentChapterComponent } from './components/course-display/current-chapter/current-chapter.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TeacherChatComponent } from './components/teacher-chat/teacher-chat.component';
import { CourseChatComponent } from './components/course-display/course-chat/course-chat.component';
import { CoursePreviewComponent } from './components/course-preview/course-preview.component';
import {DocumentViewerComponent} from "./components/DocumentViewer/documentviewer.component";
import {NgxDocViewerModule} from "ngx-doc-viewer";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {DocumentPreviewComponent} from "./components/document-preview/document-preview";
import {MatGridListModule} from "@angular/material/grid-list";
/* import {CardFancyExample } from "./components/common/card.component"; */

export const UiComponentModules = [
  CardModule,
  DividerModule,
  OverlayPanelModule,
  FileUploadModule,
  TabViewModule,
  ListboxModule,
  InputTextModule,
  ImageModule,
  InputTextareaModule,
  MatCardModule,
  MatButtonModule,
  MatProgressBarModule,
  EditorModule,
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    CourseListComponent,
    AttachComponent,
    CreateCourseComponent,
    ChapterListEditorComponent,
    CreateChapterComponent,
    CourseDisplayComponent,
    CurrentChapterComponent,
    CourseCardComponent,
    CourseChatComponent,
    NavigationComponent,
    TeacherChatComponent,
    CoursePreviewComponent,
    DocumentViewerComponent,
    DocumentPreviewComponent,
    SafePipe
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        AppRoutingModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        ...UiComponentModules,
        NgxDocViewerModule,
        PdfViewerModule,
        MatGridListModule,
    ],
  providers: [AuthService, EntityServiceFactory,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
