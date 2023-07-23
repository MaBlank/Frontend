# Funktionsweise Frontend

Bitte Reihenfolge beachten:

1. Schritt
   npm install
   Alle Abhängigkeiten werden heruntergeladen
2. Schritt
   ng serve
   Startet die Anwendung
3. Port auswählen und Frontend starten

Inhaltlich Erläuterung

Prinzipielle Zweiteilung in eine Projektliste und in einen Annotationsservice

1. Projektliste
- Es werden hier alle bestehenden Projekte dargestellt
  - Löschen löscht das Projekt
  - Format auswählen und Exportieren lädt das Projekt als JSON oder XML herunter
  - Öffnen ermöglicht die Annotation (siehe 2.)
  - Name und GUID dienen zur eindeutigen Identifikation
- Neues Projekt anlegen
  - Projektname auswählen
  - Dateityp auswählen
  - Datei auswählen - Datenformate mit Annoation: JSON, XML, ohne Annotation: txt, docx
  - Upload lädt das Projekt hoch und ist in der Projektliste sichtbar (u.U. Neuladen der Seite notwendig)

2. Annotationsservice
- Speichern - Speichert die Anpassungen (anderer Name, andere Annotationen)
- Projektliste - zurück zur Projektliste springen
- Projektname - hier Projektname anpassbar
- Text
  - Neue Annotation hinzufügen
    - Farbe auswählen
    - Name auswählen
    - Text markieren
    - Annotation hinzufügen klicken
  - Annotation löschen (rechts oben mit Kreuz schließen)
  - Alle Annotationen eines Typs löschen (Rechtsklick auf Annotation bei Annotationen)
  - (Speichern nicht vergessen)
  
