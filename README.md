# Nierenrechner Dokumentation

## 1. Einbinden des Nierenrechners

Als Erstes muss das mitgelieferte Skript in den HTML-Body eingebunden werden. Darauf hin muss das HTML-Tag `<app-nierenrechner></app-nierenrechner>` aufgerufen werden.

Der Rechner lädt die Formel, die durch das zugehörige HTML-Attribut angegeben wird. Fehlt dieses Attribut, verwendet das Modul standardmäßig die Formel `ckdEpi`.

Im Folgenden sind die Attribute für die jeweilige Formel aufgelistet:

| Formel                       | HTML-Attribut           |
| :--------------------------- | :---------------------- |
| CKD-EPI                      | ckdEpi                  |
| MDRD                         | mdrd                    |
| Mayo                         | mayo                    |
| CKD-EPI für Cystatin C       | ckdEpiCystatin          |
| CKD-EPI Kreatinin-Cystatin-C | ckdEpiKreatininCystatin |
| Cockcroft und Gault          | cockcroftGault          |

### Beispiel

Einbindung des Nierenrechners mit der **MDRD-Formel**:

```html
<!-- Script einbinden -->
<script type="module" src="nierenrechner.js"></script>

<!-- Nierenrechner-Tag mit Attribut -->
<app-nierenrechner mdrd></app-nierenrechner>
```

## 2. Anpassen der CSS-Eigenschaften

Die folgenden CSS-Variablen definieren das Schema der Webkomponente und können in der `app-styles.ts` angepasst werden:

| Variable                     | Wert             | Zweck / Verwendung                                                                                                    |
| ---------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| `--app-theme-primary`        | `#53caec`        | Primäre Theme-Farbe                                                                                                   |
| `--app-theme-accent`         | `#03989e`        | Sekundäre Akzentfarbe (für die Stadien im Ergebnisfenster sowie die Umrandung der Inputs, wenn diese ausgewählt sind) |
| `--app-theme-accent-dark`    | `#00677f`        | Farbe der Formel-Tabs, Buttons und Icons im Ergebnisfenster                                                           |
| `--app-theme-border`         | `rgb(79,118,82)` | Farbe der Trennlinien im Ergebnisfenster                                                                              |
| `--app-theme-field-disabled` | `#d3d3d3`        | Farbe der ausgegrauten Felder (Gewicht und Größe)                                                                     |
| `--app-theme-label`          | `#333`           | Farbe des Input-Labels der Formeln                                                                                    |
| `--app-theme-tab-underline`  | `#ffff`          | Farbe des Balkens unterhalb der Formel-Tabs                                                                           |
| `--app-theme-text`           | `#333`           | Farbe des Beschreibungstextes und des Checkbox-Labels                                                                 |
| `--app-theme-max-width:`     | `1000px`         | Die Breite der Webkomponente                                                                                          |
