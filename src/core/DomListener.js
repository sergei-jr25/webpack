import { capitalize } from "./utils"

// eslint-disable-next-line require-jsdoc
export class DomListener {
   constructor($root, listeners = []) {
      if (!$root) {
         throw new Error('No root ')
      }
      this.$root = $root
      this.listeners = listeners
   }

   initDOMListener() {
      this.listeners.forEach(listener => {
         const method = getMethodName(listener)
         // Вешаем события на все слушатели сразу.
         // Bode самое что и addEventListener
         if (!this[method]) {
            throw new Error(` Method ${method} is not implemented in 
            ${this.name} Component`)
         }
         this[method] = this[method].bind(this) // Привязываем контекст
         this.$root.on(listener, this[method])
      })
   }

   removeDOMListener() {
      this.listeners.forEach(listener => {
         const method = getMethodName(listener)
         this.$root.off(listener, this[method])
      })
   }
}

// Делаем [onInput,onClick и т.д]
const getMethodName = (name) => {
   return 'on' + capitalize(name)
}