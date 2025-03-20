function format(str, ...values) {
    return str.replace(/{(\d+)}/g, (match, index) => values[index] ?? match);
}
export default format;