export default class FieldMapper {
    #fieldMap: Record<string, string> = {
        gender: "Geschlecht",
        age: "Alter",
        weight: "Gewicht (kg)",
        height: "Größe (cm)",
        serumCreatinine: "Kreatinin im Serum",
        serumCystatin: "Cystatin im Serum",
        skinColor: "Hautfarbe",
        unit: "Einheit",
        cystatin: "Cystatin C",
    };

    map(fieldName: string): string {
        const mapped = this.#fieldMap[fieldName];
        return mapped || fieldName;
    }
}
