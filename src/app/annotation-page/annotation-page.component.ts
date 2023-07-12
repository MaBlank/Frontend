import {Component, ViewChild} from '@angular/core';
import {Annotation, NgxAnnotateTextComponent} from "ngx-annotate-text";
@Component({
  selector: 'app-annotation-page',
  templateUrl: './annotation-page.component.html',
  styleUrls: ['./annotation-page.component.css']
})
export class AnnotationPageComponent {
  @ViewChild('annotateText') ngxAnnotateText?: NgxAnnotateTextComponent;
  text = 'Am 1. August sind wir in den Urlaub nach Barcelona, Spanien, gefahren. Unser Flug startete um 11:00 Uhr morgens. Wir hatten eine aufregende Reise vor uns und waren voller Vorfreude auf all die Abenteuer, die uns erwarten sollten.Als wir am Flughafen ankamen, war die Atmosphäre lebhaft und voller Aufregung. Menschen unterschiedlicher Nationalitäten eilten durch die Terminals, und das Summen der Gespräche und das Klappern der Rollkoffer erfüllten die Luft. Nachdem wir eingecheckt und unsere Bordkarten erhalten hatten, begaben wir uns zur Sicherheitskontrolle. Das Aufgeben unseres Gepäcks verlief reibungslos, und bald darauf waren wir bereit, das Flugzeug zu besteigen.'
  annotations: Annotation[] = [
    new Annotation(3, 11, 'Date', '#0d6efd'),
    new Annotation(36, 45, 'City', '#dc3545'),
    new Annotation(47, 52, 'Country', '#198754'),
    new Annotation(77, 85, 'Time', '#6c757d'),
  ];
  annotationButtons = [
    { label: 'Date', color: '#0d6efd' },
    { label: 'Time', color: '#6c757d' },
    { label: 'Country', color: '#198754' },
    { label: 'City', color: '#dc3545' },
  ];
  events: string[] = [];
  newAnnotationColor = '#000000';
  newAnnotationLabel = '';

  addAnnotation(label: string, color: string): void {
    if (!this.ngxAnnotateText) {
      return;
    }
    const selection = this.ngxAnnotateText.getCurrentTextSelection();
    if (!selection) {
      return;
    }
    if (this.ngxAnnotateText.isOverlappingWithExistingAnnotations(selection)) {
      alert('The selected text is already annotated.');
      return;
    }
    if (!this.annotationButtons.some(button => button.label === label)) {
      this.annotationButtons.push({ label, color });
    }
    const annotation = new Annotation(selection.startIndex, selection.endIndex, label, color);
    this.annotations = this.annotations.concat(annotation);
    this.events.push(`Added '${annotation}'`);
  }
  onClickAnnotation(annotation: Annotation) {
    this.events.push(`Clicked on '${annotation}'`);
  }
  onRemoveAnnotation(annotation: Annotation): void {
    this.events.push(`Removed '${annotation}'`);
  }
}
