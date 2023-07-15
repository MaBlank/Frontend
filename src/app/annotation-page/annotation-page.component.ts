import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgxAnnotateTextComponent, Annotation as NgxAnnotation } from 'ngx-annotate-text';
import {MainObject} from "../MainObject";
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-annotation-page',
  templateUrl: './annotation-page.component.html',
  styleUrls: ['./annotation-page.component.css']
})
export class AnnotationPageComponent implements OnInit, AfterViewInit {
  @ViewChild('annotateText') ngxAnnotateText?: NgxAnnotateTextComponent;
  id: string | null | undefined;
  mainObject: MainObject = {
    guid: 'dummy',
    name: 'dummy',
    text: 'This is a dummy text.',
    annotations: {
      annotations: []
    }
  };
  events: string[] = [];
  newAnnotationColor = '#008000';
  newAnnotationLabel = '';
  annotations: NgxAnnotation[] = [];
  annotationButtons: Array<{ label: string; color: string }> = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchMainObject();
  }

  fetchMainObject(): void {
    console.log('fetchMainObject called');
    if (!this.id) {
      console.log('No id provided');
      return;
    }

    console.log(`Fetching main object with id: ${this.id}`);

    this.http.get<MainObject>(`http://localhost:8080/api/documents/${this.id}`).subscribe(data => {
      console.log('Response from server received:', data);

      this.mainObject = data;

      if (this.mainObject.annotations && this.mainObject.annotations.annotations) {
        console.log('Annotations found in the main object');

        this.annotations = this.mainObject.annotations.annotations.map(annotation => {
          console.log('Mapping annotation:', annotation);
          return new NgxAnnotation(annotation.start, annotation.end, annotation.label, annotation.color);
        });

        console.log('Mapped annotations:', this.annotations);

        // Also update the annotationButtons here
        this.annotationButtons = this.annotations.map(annotation => {
          return { label: annotation.label, color: annotation.color };
        });

      } else {
        console.log('No annotations found in the main object');
        this.annotations = [];
      }
    }, error => {
      console.error('Error occurred while fetching the main object:', error);
    });
  }

  get text(): string {
    return this.mainObject?.text || '';
  }

  addAnnotation(label: string, color: string): void {
    console.log('addAnnotation called with label:', label, 'and color:', color);

    if (!this.ngxAnnotateText) {
      console.log('ngxAnnotateText is not defined');
      return;
    }

    const selection = this.ngxAnnotateText.getCurrentTextSelection();
    console.log('Current text selection:', selection);

    if (!selection) {
      console.log('No text is selected');
      return;
    }

    if (this.ngxAnnotateText.isOverlappingWithExistingAnnotations(selection)) {
      console.log('Selected text is overlapping with existing annotations');
      alert('The selected text is already annotated.');
      return;
    }

    if (!this.annotationButtons.some(button => button.label === label)) {
      console.log('Adding new button with label:', label);
      this.annotationButtons.push({ label, color });
    } else {
      console.log('Button with label already exists:', label);
    }

    const annotation = new NgxAnnotation(selection.startIndex, selection.endIndex, label, color);
    console.log('Created new annotation:', annotation);

    this.annotations.push(annotation);
    this.annotations = [...this.annotations];
    this.cd.detectChanges();
    console.log('Added annotation to annotations array:', this.annotations);

    this.events.push(`Added '${annotation}'`);
    console.log('Updated events:', this.events);
  }

  onClickAnnotation(annotation: NgxAnnotation): void {
    this.events.push(`Clicked on '${annotation}'`);
    this.cd.detectChanges();
  }

  onRemoveAnnotation(annotation: NgxAnnotation): void {
    const index = this.annotations.indexOf(annotation);
    if (index !== -1) {
      this.annotations.splice(index, 1);
      this.events.push(`Removed '${annotation}'`);
    }
  }

  ngAfterViewInit(): void {
    console.log(this.ngxAnnotateText);
  }

  removeAnnotationButton(label: string, color: string, event: MouseEvent): void {
    event.preventDefault(); // Prevent the browser's context menu from appearing.

    const buttonIndex = this.annotationButtons.findIndex(
      (button) => button.label === label && button.color === color
    );

    if (buttonIndex !== -1) {
      // Remove the button from the annotationButtons array.
      this.annotationButtons.splice(buttonIndex, 1);
    }

    // Remove all annotations matching the label and color from the annotations array.
    this.annotations = this.annotations.filter(
      (annotation) => !(annotation.label === label && annotation.color === color)
    );

    // Refresh the annotations displayed by the ngx-annotate-text component.
    this.annotations = [...this.annotations];
    this.cd.detectChanges();
  }

  onSave(): void {
    console.log('onSave called');
    if (this.mainObject && this.mainObject.annotations) {
      this.mainObject.annotations.annotations = this.annotations.map(annotation => {
        return { start: annotation.startIndex, end: annotation.endIndex, label: annotation.label, color: annotation.color };
      });
    }
    if (this.id) {
      console.log(`Updating main object with id: ${this.id}`);
      this.http.put(`http://localhost:8080/api/update/${this.id}`, this.mainObject).subscribe({
        next: () => {
          console.log('Main object successfully updated on the server');
        },
        error: (error) => {
          console.error('Error occurred while updating the main object:', error);
        }
      });
    } else {
      console.log('No id provided, cannot update main object on the server');
    }
  }

}

