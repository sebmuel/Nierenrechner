Betreff: CKD-EPI Kreatinin-Cystatin-C – Fehler gefunden und behoben

Hallo Gerhard,

vielen Dank für den Hinweis und die Excel-Datei – damit ließ sich alles eindeutig prüfen.
Du hattest in beiden Punkten recht. Es waren zwei voneinander unabhängige Fehler:

**1. Die hinterlegte Formel war falsch.**
Beim kombinierten Kreatinin-Cystatin-C-Rechner war nicht die offizielle CKD-EPI-Formel von
2021 eingebaut, sondern eine fehlerhafte Variante mit falschen Koeffizienten. Dadurch waren
die Ergebnisse deutlich zu niedrig. Beispiel aus deiner Excel-Datei (Kreatinin 6 mg/dl,
Cystatin C 3 mg/L, 57 Jahre):

- Mann: bisher **0,96** – richtig sind **13,77**
- Frau: bisher **0,70** – richtig sind **12,01**

Zur Beantwortung deiner Frage: Es lag nicht am Einbinden, sondern die Formel selbst, die uns
seinerzeit für diesen Rechner vorlag, war bereits fehlerhaft. Wir haben sie jetzt durch die
korrekte offizielle Gleichung ersetzt. Der Rechner liefert nun exakt dieselben Werte wie
deine Excel-Tabelle.

**2. Die Einheit bei Cystatin C war falsch beschriftet.**
Im Auswahlfeld stand wieder **mg/dl**, richtig ist **mg/L**. Das ist korrigiert – in beiden
Cystatin-Rechnern wird jetzt mg/L angezeigt. (Gerechnet wurde intern bereits in mg/L, es war
also reine Beschriftung – aber natürlich wichtig, dass es richtig dasteht.)

Beide Korrekturen sind umgesetzt und getestet. Alle übrigen Formeln (Kreatinin, reines
Cystatin C, MDRD, Mayo, Cockcroft-Gault) haben wir ebenfalls gegen deine Tabelle geprüft –
die rechnen unverändert korrekt.

**Eine kurze Rückfrage noch:**
Die offizielle Formel von 2021 multipliziert das Ergebnis bei Frauen zusätzlich mit dem
Faktor 0,963. In deiner Excel-Datei fehlt dieser Faktor bei den Frauen (12,01 statt 11,56).
Wir haben uns vorerst nach deiner Excel-Tabelle gerichtet, damit Rechner und Tabelle
übereinstimmen. Sollen wir das so lassen oder den offiziellen Faktor 0,963 ergänzen?

Viele Grüße
Sebastian
