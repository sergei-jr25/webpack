import { ExelComponent } from "../../core/ExelComponnet";

export class ToolBar extends ExelComponent {
   static className = 'exel__tool-bar'

   toHTML() {
      return '<h1>ToolBar</h1>'
   }
}