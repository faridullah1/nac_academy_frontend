import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { CoursesComponent } from './components/courses/course.component';
import { StudentsComponent } from './components/students/students.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { RecentAnnouncementsComponent } from './components/announcements/announcements.component';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'employees', component: AllEmployeesComponent },
  { path: 'settings', component: SystemSettingsComponent },
  { path: 'announcements', component: RecentAnnouncementsComponent },

  { path: '**', redirectTo: 'students', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
