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

  constructor(private projectService: ProjectService, private sidenavService: SidenavService, private _liveAnnouncer: LiveAnnouncer, private formBuilder: FormBuilder, private uploadService: UploadService, private router: Router) {
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
    console.log(`Export clicked for element: ${element.name}`);
  }
  onFormatChange(event: any, element: any) {
    this.selectedFormat = event.value;
  }
  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
