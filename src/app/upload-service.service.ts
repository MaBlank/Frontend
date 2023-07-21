import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {
  }

  uploadFile(projectName: string, file: File, fileType: string): Observable<any> {
    return new Observable((observer) => {
      const reader = new FileReader();
      if (fileType === 'docx') {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
      reader.onload = () => {
        let fileData = reader.result?.toString();
        let url;
        if (fileType === 'docx') {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('name', projectName);
          url = `http://localhost:8080/api/uploadDocx`;
          // @ts-ignore
          this.http.post(url, formData).subscribe(
            (data) => {
              observer.next(data);
              observer.complete();
            },
            (err) => observer.error(err)
          );
        } else if (fileType === 'txt') {
          url = `http://localhost:8080/api/uploadTxt?name=${projectName}`;
          try {
            const parsedJson = JSON.parse(fileData || '');
            const innerJson = parsedJson.text ? JSON.parse(parsedJson.text) : {};
            fileData = innerJson.txt;
          } catch (e) {
            console.error('Failed to parse JSON: ', e);
          }
          this.sendRequest(url, {txt: fileData}, observer);
        } else if (fileType === 'xml') {
          url = `http://localhost:8080/api/uploadXml?name=${projectName}`;
          this.sendRequest(url, fileData, observer);
        } else if (fileType === 'json') {
          url = `http://localhost:8080/api/uploadJson`;
          try {
            fileData = JSON.parse(fileData || '');
          } catch (e) {
            console.error('Failed to parse JSON: ', e);
          }
          this.sendRequest(url, fileData, observer);
        }
      };
      reader.onerror = (error) => observer.error(error);
    });
  }

  sendRequest(url: string, payload: any, observer: any) {
    // @ts-ignore
    this.http.post(url, payload).subscribe(
      (data) => {
        observer.next(data);
        observer.complete();
      },
      (err) => observer.error(err)
    );
  }
}
