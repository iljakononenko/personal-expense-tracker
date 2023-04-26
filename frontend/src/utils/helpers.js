export const displayDate = (date) => {
    if (date != null && date?.getDate() != null) {
        let result = "";
        result += date.getDate() < 10 ? "0" + date.getDate() + "." : date.getDate() + ".";
        result += date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) + "." : date.getMonth()+1 + ".";
        result += date.getFullYear();

        return result;
    } else {
        return ""
    }
}

