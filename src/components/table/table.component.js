const CODES = {
   A: 65,
   Z: 90
}

const createCell = (_, index) => {
   return `
   <div data-col="${index}" class="cell"> </div>`
}

export const createColumn = (el, index) => {
   console.log(index);
   return `
      <div data-type="resizable" data-col="${index}" class="column"> 
       ${el}
      <div class="column__resize" data-resize="col"></div>
   </div>`
}

export const createRow = (index, cols) => {
   // eslint-disable-next-line max-len
   const resize = index ? `<div data-resize="row" class="row-data__resize"></div>` : ''


   return `<div data-type="resizable"  class="row ">
      <div  class="row-info">${index ? index : ''}
       ${resize}
      </div>
      <div class="row-data">  ${cols}</div>
   </div>`
}

export const createTable = (rowsCount = 15) => {
   const colsCount = CODES.Z - CODES.A + 1
   const rows = []
   // Формируем массив букв
   const cols = new Array(colsCount).fill('')
      .map((_, index) => String.fromCharCode(CODES.A + index))
      .map(createColumn)
      .join('')
   rows.push(createRow(null, cols))

   for (let index = 0; index < rowsCount; index++) {
      const cell = new Array(colsCount).fill('')
         .map((_, index) => index)
         .map(createCell)
         .join('')
      rows.push(createRow(index + 1, cell))
   }

   return rows.join('')
}