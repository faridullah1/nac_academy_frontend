import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MainLayoutComponent } from './layout/main-layout/layout.component';
import { DrawerComponent } from './layout/drawer/drawer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddStudentComponent } from './components/students/add-student/add-student.component';
import { GenericPageModule } from './shared/generic-page/module';
import { CoursesComponent } from './components/courses/course.component';
import { AddCourseComponent } from './components/courses/add-course/add-course.component';
import { AlertDialogModule } from './shared/alert-dialog/alert.module';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { RecentAnnouncementsComponent } from './components/announcements/announcements.component';
import { UserQueriesComponent } from './components/user-queries/user-queries.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const httpInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        StudentsComponent,
        TeachersComponent,
        MainLayoutComponent,
        DrawerComponent,
        AddStudentComponent,
		CoursesComponent,
		AddCourseComponent,
  		AllEmployeesComponent,
    	SystemSettingsComponent,
		RecentAnnouncementsComponent,
  		UserQueriesComponent,
    	LoginComponent
    ],
    imports: [
        BrowserModule,
		BrowserAnimationsModule,
        ReactiveFormsModule,
		HttpClientModule,
		
        AppRoutingModule,

        MaterialModule,
		GenericPageModule,
		AlertDialogModule
    ],
    providers: [DatePipe, DecimalPipe, httpInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }
