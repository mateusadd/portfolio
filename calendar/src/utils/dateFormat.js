export function dateFormat(date) {

        let newDate = new Date(date);
        newDate.setHours(newDate.getHours() - 3);

        return newDate

}

export function dateFormatReport(date) {
        let newDate = new Date(date)

        return newDate.toLocaleDateString()
}