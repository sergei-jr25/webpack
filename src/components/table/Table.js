/* eslint-disable no-dupe-class-members */
import { ExelComponent } from "../../core/ExelComponnet";
import { createTable } from "./table.component";
import { resizeHandler } from "./table.resize";

export class Table extends ExelComponent {
   constructor($root) {
      super($root, {
         name: 'Table',
         listeners: ['click', 'mousedown']
      })
   }

   static className = 'excel__table'

   toHTML() {
      return createTable(26)
   }

   onClick(event) {
      if (event.target.dataset.resize) {
         console.log('click', event.target.dataset.resize);
      }
   }
   onMousedown(event) {
      if (event.target.dataset.resize) {
         resizeHandler(event, this.$root)
      }
   }
}