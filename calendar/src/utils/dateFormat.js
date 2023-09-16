export function dateFormat(date) {
    
    let newDate = new Date(date);
    newDate.setHours(newDate.getHours() - 3);

    return newDate
    
}