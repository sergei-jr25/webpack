import { DomListener } from "./DomListener"


// eslint-disable-next-line require-jsdoc
export class ExelComponent extends DomListener {
   constructor($root, options = {}) {
      super($root, options.listeners)
   }
   toHTML() {
      return ''
   }

   init() {
      this.initDOMListener()
   }
}