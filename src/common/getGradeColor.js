export default function getGradeColor(grade) {
    if (grade >= 6) {
        return "#83B692"
    }
    if (grade > 5.0) {
        return "#F07224"
    }
    return "#F13248"
}