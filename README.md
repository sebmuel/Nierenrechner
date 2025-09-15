## Nierenrechner Dokumentation

### 1. Einbinden des Nierenrechners

Als Erstes muss das mitgelieferte Script in den HTML-Body eingebunden werden.
Darauf hin muss das HTML-Tag ```<app-nierenrechner></app-nierenrechner>``` aufgerufen werden.

Der jeweilige Rechner wird erst geladen, wenn das entsprechende HTML-Attribut mitgegeben werden.
Folgend ist das Attribut für die jeweilige Formel aufgelistet:

| Formel                       | HTML-Attribut           |
|:-----------------------------|:------------------------|
| CKD-EPI                      | ckdEpi                  |
| MDRD                         | mdrd                    |
| Mayo                         | mayo                    |
| CKD-EPI für Cystatin C       | ckdEpiCystatin          |
| CKD-EPI Kreatinin-Cystatin-C | ckdEpiKreatininCystatin |
| Cockcroft und Gault          | cockcroftGault          |

### Beispiel

Einbindung des Nierenrechners mit der **CKD-EPI-Formel**:

```html
<!-- Script einbinden -->
<script src="nierenrechner.js"></script>

<!-- Nierenrechner-Tag mit Attribut -->
<app-nierenrechner ckdEpi></app-nierenrechner>
```

### 2. Anpassen der CSS-Eigenschaften

Die folgenden CSS-Variablen definieren das Schema der Webkomponente und können in der ```app-styles.ts```:

| Variable                     | Farbe            | Zweck / Verwendung                                                                                        |
|------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| `--app-theme-primary`        | `#53caec`        | Primäre Theme-Farbe                                                                                       |
| `--app-theme-accent`         | `#03989e`        | Sekundäre Akzentfarbe (Die Stadien im Ergebnisfenster und <br/> die Umrandung der Inputs wenn ausgewählt) |
| `--app-theme-accent-dark`    | `#00677f`        | Farbe der Formel-Tabs, Buttons und Icons im Ergebnisfenster                                               |
| `--app-theme-border`         | `rgb(79,118,82)` | Farbe der Trennlinien im Ergebnisfenster                                                                  |
| `--app-theme-field-disabled` | `#d3d3d3`        | Farbe der ausgegrauten Felder (Gewicht und Größe)                                                         |
| `--app-theme-label`          | `#333`           | Farbe der Input-Labels aller Formeln                                                                      |
| `--app-theme-tab-underline`  | `#ffff`          | Farbe des Balken unterhalb den Formel-Tabs                                                                |
| `--app-theme-text`           | `#333`           | Farbe des Beschreibungstexts und des Checkbox-Labels                                                      |
| `--app-theme-max-width:`     | `1000px`         | Die Breite der Webkomponente                                                                              |