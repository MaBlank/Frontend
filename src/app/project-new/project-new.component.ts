import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../api-service.service";
import {SidenavService} from "../sidenav-service.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {UploadService} from "../upload-service.service";

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class ProjectNewComponent {
  uploadForm: FormGroup;
  selectedFile: File | undefined;
  constructor(private projectService: ProjectService, private sidenavService: SidenavService, private _liveAnnouncer: LiveAnnouncer, private formBuilder: FormBuilder, private uploadService: UploadService) {
    this.uploadForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      fileType: ['', Validators.required] // added fileType to the form group
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    console.log("onSubmit method called");
    if (!this.uploadForm.valid || !this.selectedFile) {
      return;
    }
    const projectName = this.uploadForm.get('projectName')?.value;
    const fileType = this.uploadForm.get('fileType')?.value;
    console.log("Form validity: ", this.uploadForm.valid);
    console.log("Selected file: ", this.selectedFile);
    this.uploadService.uploadFile(projectName, this.selectedFile, fileType).subscribe(() => {
      // After the upload is successful, notify that a new project has been created
      this.projectService.notifyProjectCreation();
    });
  }
}
