// const CODES = {
//    A: 65,
//    Z: 90
// }

// // const createCell = () => {
// //    return `
// //    <div class="cell">B2 </div>`
// // }

// export const createColumn = (el) => {
//    return `<div class="column"> ${el}</div>`
// }

// export const createRow = (cols) => {
//    return `<div class="row">
//       <div class="row__info"></div >
//       <div class="row__data">${cols}</div >
//    </div>`
// }

// export const createTable = (rowsCount = 15) => {
//    const colsCount = CODES.Z - CODES.A + 1
//    const rows = []
//    // Формируем массив букв
//    const cols = new Array(colsCount).fill('')
//       .map((_, index) => String.fromCharCode(CODES.A + index))
//       .map(el => createColumn(el))
//       .join('')
//    rows.push(createRow(cols))


//    // for (let index = 0; index < rowsCount; index++) {
//    //    rows.push(createRow())
//    // }
//    return rows.join('')
// }