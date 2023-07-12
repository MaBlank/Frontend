import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {}
  uploadFile(projectName: string, file: File, fileType: string): Observable<any> {
    if (fileType === 'docx') {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append('projectName', projectName);
      return this.http.post(`http://localhost:8080/api/uploadDocx?name=${projectName}`, formData);
    }

    // For txt and xml, read the file as text and send it as a string
    return new Observable((observer) => {
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        let fileData = reader.result?.toString();
        const url = fileType === 'txt' ? `http://localhost:8080/api/uploadTxt?name=${projectName}` : `http://localhost:8080/api/uploadXml?name=${projectName}`;

        if (fileType === 'txt') {
          try {
            const parsedJson = JSON.parse(fileData || '');
            const innerJson = parsedJson.text ? JSON.parse(parsedJson.text) : {};
            fileData = innerJson.txt;
          } catch (e) {
            console.error('Failed to parse JSON: ', e);
          }
        }

        this.http.post(url, { txt: fileData }).subscribe(
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
