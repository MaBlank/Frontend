import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder} from "@angular/forms";
import {SidenavService} from "../sidenav-service.service";
import { FormGroup, Validators } from '@angular/forms';
import {UploadService} from "../upload-service.service";
import {ProjectService} from "../api-service.service";
import {MainObject} from "../MainObject";
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-project-list-page',
  templateUrl: './project-list-page.component.html',
  styleUrls: ['./project-list-page.component.css'],
})
export class ProjectListPageComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'link', 'export'];
  dataSource = new MatTableDataSource<MainObject>();
  uploadForm: FormGroup;
  private selectedFormat: any;
  private formats: Map<string, string> = new Map();


  constructor(private http: HttpClient, private projectService: ProjectService, private sidenavService: SidenavService, private _liveAnnouncer: LiveAnnouncer, private formBuilder: FormBuilder, private uploadService: UploadService, private router: Router) {
    this.uploadForm = this.formBuilder.group({
      projectName: ['', Validators.required]
    });
  }
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  onLinkClick(element: MainObject) {
    console.log(`Link clicked for element: ${element.name}`);
    this.router.navigate(['/annotation', { id: element.guid }]);
  }

  onExportClick(element: MainObject) {
    let format = this.formats.get(element.guid);
    console.log(`Export clicked for element: ${element.name} in format: ${format}`);
    let url = `http://localhost:8080/api/`;
    let responseType: 'json' | 'text' = 'json';
    let blobType = 'application/json';
    let fileExtension = 'json';

    switch(format) {
      case 'xml':
        url += `xml/${element.guid}`;
        responseType = 'text';
        blobType = 'application/xml';
        fileExtension = 'xml';
        break;
      case 'conll2003':
        url += `conll2003/${element.guid}`;
        responseType = 'text';
        blobType = 'text/plain';
        fileExtension = 'txt';
        break;
      case 'json':
        url += `documents/${element.guid}`;
        responseType = 'json';
        blobType = 'application/json';
        fileExtension = 'json';
        break;
      default:
        console.log(`Invalid format: ${format}`);
        return;
    }

    console.log(`Attempting to get: ${url}`);
    // @ts-ignore
    this.http.get(url, {responseType}).subscribe(
      data => {
        console.log('Response received from server');
        let blob;
        if (responseType === 'json') {
          blob = new Blob([JSON.stringify(data)], {type: blobType});
        } else {
          // @ts-ignore
          blob = new Blob([data], {type: blobType});
        }
        console.log('Blob created');
        const blobUrl = window.URL.createObjectURL(blob);
        console.log(`URL for Blob: ${blobUrl}`);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `export.${fileExtension}`;
        console.log('About to initiate download');
        link.click();
        console.log('Download initiated');
      },
      error => {
        console.log('Error occurred while getting data from server: ', error);
      }
    );
  }

  onFormatChange(event: any, element: MainObject) {
    this.formats.set(element.guid, event.value);
    console.log(`Format for element ${element.name} set to ${this.formats.get(element.guid)}`);
  }
  ngOnInit(): void {
    this.refreshProjects();
    this.projectService.projectCreated.subscribe(() => {
      this.refreshProjects();
    });
  }

  refreshProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
