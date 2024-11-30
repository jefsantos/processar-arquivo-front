import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';

export const routes: Routes = [
    { path: 'upload', component: UploadComponent },  // Rota para o componente de upload
    { path: '', redirectTo: '/upload', pathMatch: 'full' }  // Redireciona para o upload por padrão
];
