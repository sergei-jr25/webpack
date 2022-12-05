import { defaultStyles } from "../../constans"
import { parse } from "../../core/core"
import { toInInlineSTyle } from "../../core/utils"

const CODES = {
   A: 65,
   Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24
const getWidth = (state, index) => {
   return state[index] || DEFAULT_WIDTH + 'px'
}
const getHeight = (state, index) => {
   return state[index] || DEFAULT_HEIGHT + 'px'
}

const createCell = (state, row) => {
   return function (_, col) {
      const id = `${row}:${col}`
      const data = state.dataState[id]
      const styles = toInInlineSTyle({
         ...defaultStyles,
         ...state.stylesState[id]
      })
      console.log(data);
      // fontWidth: bold; textAlign: center
      // .map(key => `${toInInlineSTyle(key)}:${defaultStyles[key]}`)
      // .join('; ')
      return `
         <input value="${parse(data) || ''}" 
         data-col="${col}" 
         class="cell"
         data-id="${id}"
         data-value="${data || ''}"
         style="${styles}; width:${getWidth(state.colState, col)}"    
           />`
   }
}


export const createColumn = ({ col, index, width }) => {
   return `
   <div data-type="resizable"
      data-col="${index}"
      class="column"
      style="width:${width}"
      >
      ${col}
      <div class="column__resize" data-resize="col"></div>
      </div >`
}

export const createRow = (index, cols, height) => {
   // eslint-disable-next-line max-len
   const resize = index ? `<div  data-resize="row" class="row-data__resize" ></div > ` : ''
   return `<div  
   data-type="resizable"  
   class="row" 
   data-row="${index}"
   style="height:${height}"
   >
      <div class="row-info">${index ? index : ''}
       ${resize}
      </div>
      <div class="row-data">  ${cols}</div>
   </div > `
}

function withWidthFrom(state) {
   return function (col, index) {
      return {
         col, index, width: getWidth(state.colState, index)
      }
   }
}


export const createTable = (rowsCount = 15, state = {}) => {
   const colsCount = CODES.Z - CODES.A + 1
   const rows = []
   // Формируем массив букв
   const cols = new Array(colsCount).fill('')
      .map((_, index) => String.fromCharCode(CODES.A + index))
      .map(withWidthFrom(state))
      .map(createColumn)
      // .map((_, index) => {
      //    const width = getWidth(state.colState, index)
      //    return createColumn(_, index, width)
      // })
      .join('')

   rows.push(createRow(null, cols, {}))

   for (let index = 0; index < rowsCount; index++) {
      const cell = new Array(colsCount).fill('')
         .map((_, index) => index)
         .map(createCell(state, index))
         // .map((_, cell) => {
         //    const width = getWidth(state.colState, cell)
         //    return createCell(_, cell, index, width)
         // })
         .join('')
      const height = getHeight(state.rowState, index)
      rows.push(createRow(index + 1, cell, height))
   }

   return rows.join('')
}