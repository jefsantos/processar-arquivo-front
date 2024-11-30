import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  selectedFile: File | null = null;
  uploadResponse: string ='';

  constructor(private http: HttpClient){}

  onFileSelected(event: any): void{
    this.selectedFile = event.target.files[0];
  }

  uploadFile():  void {
    if(!this.selectedFile){
      this.uploadResponse = 'Por Favor, selecione um arquivo!';
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    const headers = new HttpHeaders();
    this.http
      .post<any>('http://localhost:8082/lote/laca-2.1.6', formData, { 
        headers:headers,

        responseType:'text' as 'json'

       })
      .pipe(
        catchError((error) => {
          this.uploadResponse = `Erro ao processar o arquivo: ${error.message}`;
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.uploadResponse = response;
      });
  }
}
