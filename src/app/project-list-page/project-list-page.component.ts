import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {FormBuilder} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {SidenavService} from "../sidenav-service.service";

export interface Element {
  position: number;
  name: string;
  link: string;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Hydrogen', link: 'https://example.com/hydrogen' },
  { position: 2, name: 'Helium', link: 'https://example.com/helium' },
  { position: 3, name: 'Lithium', link: 'https://example.com/lithium' },
];

@Component({
  selector: 'app-project-list-page',
  templateUrl: './project-list-page.component.html',
  styleUrls: ['./project-list-page.component.css'],
})
export class ProjectListPageComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'link'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private sidenavService: SidenavService, private _liveAnnouncer: LiveAnnouncer, private formBuilder: FormBuilder) {}

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
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
  onLinkClick(element: Element) {
    console.log(`Link clicked for element: ${element.name}`);
  }
}
