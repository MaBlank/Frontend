import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import {SidenavService} from "./sidenav-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  private sidenavSub: Subscription | undefined;
  constructor(private sidenavService: SidenavService) {}
  ngAfterViewInit() {
    if (this.sidenav) {
      this.sidenavSub = this.sidenavService.sidenavOpen$
        .subscribe((isOpen) => {
          if (isOpen) {
            this.sidenav?.open();
          } else {
            this.sidenav?.close();
          }
        });
    }
  }
  ngOnDestroy() {
    this.sidenavSub?.unsubscribe();
  }
}
