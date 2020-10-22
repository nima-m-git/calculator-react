const OPERATIONS = {
    add : (a, b) => String(parseFloat(a) + parseFloat(b)),
    subtract : (a, b) => a - b,
    multiply : (a, b) => a * b,
    divide : (a, b) => a / b,
}

export default OPERATIONS