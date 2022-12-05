// Делам строку onIpnut

export const capitalize = (string) => {
   if (typeof string !== 'string') {
      return ''
   }
   return string.charAt(0).toUpperCase() + string.slice(1)
}
export const range = (start, end) => {
   if (start > end) {
      [end, start] = [start, end]
   }
   // Пример 3 - 0 = 3 + 1  = 4
   return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)

   // input [0, 3] начанльное и конченое значение
   // output [0,1,2,3,4]
}

export const nextSelector = (key, { row, col }) => {
   const MIN_VALUE = 0
   switch (key) {
      case 'Enter':
      case 'ArrowDown':
         row++
         break
      case 'ArrowLeft':
         col = col < MIN_VALUE ? MIN_VALUE : col - 1
         break
      case 'ArrowRight':
      case 'Tab':
         col++
         break
      case 'ArrowUp':
         row = row < MIN_VALUE ? MIN_VALUE : row - 1
         break
   }
   return `[data-id="${row}:${col}"]`
}

// export const storage = (key, data = null) => {
//    console.log(data);
//    if (!data) {
//       return JSON.parse(localStorage.getItem(key))
//    }
//    localStorage.setItem(key, JSON.stringify(data))
// }
export function storage(key, data = null) {
   if (!data) {
      return JSON.parse(localStorage.getItem(key))
   }
   localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
   if (typeof a === 'object' && typeof b === 'object') {
      JSON.stringify(a) === JSON.stringify(b)
   }
   return a === b
}

export function camelCaseToDash(myStr) {
   return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function toInInlineSTyle(styles = {}) {
   return Object.keys(styles)
      .map(key => `${camelCaseToDash(key)}: ${styles[key]}`)
      .join(';')
}

export function debounce(fn, wait) {
   let timeout

   return function (...args) {
      const later = () => {
         clearTimeout(timeout)
         fn.apply(this, args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
   }
}
