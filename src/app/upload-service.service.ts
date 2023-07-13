import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {}
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
          fileData = fileData?.split(',')[1];
          url = `http://localhost:8080/api/uploadDocx?name=${projectName}`;
        } else if (fileType === 'txt') {
          url = `http://localhost:8080/api/uploadTxt?name=${projectName}`;

          try {
            const parsedJson = JSON.parse(fileData || '');
            const innerJson = parsedJson.text ? JSON.parse(parsedJson.text) : {};
            fileData = innerJson.txt;
          } catch (e) {
            console.error('Failed to parse JSON: ', e);
          }
        } else if (fileType === 'xml') {
          url = `http://localhost:8080/api/uploadXml?name=${projectName}`;
        } else if (fileType === 'json') {
          url = `http://localhost:8080/api/uploadJson`;

          try {
            fileData = JSON.parse(fileData || '');
          } catch (e) {
            console.error('Failed to parse JSON: ', e);
          }
        }
        const payload = (fileType === 'xml' || fileType === 'json') ? fileData : { [fileType]: fileData };

        // @ts-ignore
        this.http.post(url, payload).subscribe(
          (data) => {
            observer.next(data);
            observer.complete();
          },
          (err) => observer.error(err)
        );
      };
      reader.onerror = (error) => observer.error(error);
    });
  }


}
