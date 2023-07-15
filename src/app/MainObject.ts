export interface MainObject {
  guid: string;
  name: string;
  text: string;
  annotations: Annotations;
}
export interface Annotations {
  annotations: Annotation[];
}
export interface Annotation {
  start: number;
  end: number;
  label: string;
  color: string;
}
