const CODES = {
   A: 65,
   Z: 90
}

const createCell = () => {
   return `
   <div class="cell"> </div>`
}

export const createColumn = (el) => {
   return `<div class="column"> ${el}</div>`
}

export const createRow = (index, cols) => {
   return `<div class="row">
      <div class="row-info">${index ? index : ''}</div>
      <div class="row-data">${cols}</div> 
   </div>`
}

export const createTable = (rowsCount = 15) => {
   const colsCount = CODES.Z - CODES.A + 1
   const rows = []
   // Формируем массив букв
   const cols = new Array(colsCount).fill('')
      .map((_, index) => String.fromCharCode(CODES.A + index))
      .map(el => createColumn(el))
      .join('')
   rows.push(createRow(null, cols))

   for (let index = 0; index < rowsCount; index++) {
      const cell = new Array(colsCount).fill('')
         .map((_, index) => index)
         .map(el => createCell(el))
         .join('')
      rows.push(createRow(index + 1, cell))
   }


   return rows.join('')
}