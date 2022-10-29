import { ExelComponent } from "../../core/ExelComponnet";

export class Header extends ExelComponent {
   static className = 'exel__header'
   constructor($root) {
      super($root, {
         name: "Header",
         // listeners: []
      })
   }
   toHTML() {
      return '<h1>Header</h1>'
   }
}