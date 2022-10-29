import { ExelComponent } from "../../core/ExelComponnet";
import { createTable } from "./table.component";

export class Table extends ExelComponent {
   constructor($root) {
      super($root, {
         name: 'Table',
         listeners: ['resize']
      })
   }
   static className = 'excel__table'

   toHTML() {
      return createTable()
   }
}