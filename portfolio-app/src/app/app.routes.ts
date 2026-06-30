import { Routes } from '@angular/router';
import { Frontend } from './frontend/frontend';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Skills } from './pages/skills/skills';
import { Projects } from './pages/projects/projects';
import { Experience } from './pages/experience/experience';
import { Contact } from './pages/contact/contact';
import { AdminDashboard } from './dashboard/adminDashboard';
import { AdminHome } from './dashboard/admin-home/adminHome';
import { AdminProjects } from './dashboard/admin-projects/adminProjects';
import { AdminContact } from './dashboard/admin-contact/adminContact';
import { AdminAbout } from './dashboard/admin-about/adminAbout';
import { AdminSkills } from './dashboard/admin-skills/adminSkills';
import { AdminExperience } from './dashboard/admin-experience/adminExperience';

export const routes: Routes = [
  {
    path: '',
    component: Frontend,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'about', component: About },
      { path: 'skills', component: Skills },
      { path: 'projects', component: Projects },
      { path: 'experience', component: Experience },
      { path: 'contact', component: Contact }
    ]
  },
  {
    path: 'dashboard',
    component: AdminDashboard,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminHome },
      { path: 'about', component: AdminAbout },
      { path: 'skills', component: AdminSkills },
      { path: 'projects', component: AdminProjects },
      { path: 'contact', component: AdminContact },
      { path: 'experience', component: AdminExperience },
    ]
  },
  { path: '**', redirectTo: 'home' }
];

