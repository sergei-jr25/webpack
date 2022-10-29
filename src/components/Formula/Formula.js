import { ExelComponent } from "../../core/ExelComponnet";

export class Formula extends ExelComponent {
   static className = 'exel__formula'
   constructor($root) {
      super($root, {
         name: "Formula",
         listeners: ['input', 'click']
      })
   }
   toHTML() {
      return `<h1>Formula</h1>`
   }
   onInput(event) {
      console.log(this.$root); // Чтобы получить root нужен привязать контекст
      console.log('Formula', event.target.value);
   }
   onClick(event) {
      console.log(`click ${event}`);
   }
}