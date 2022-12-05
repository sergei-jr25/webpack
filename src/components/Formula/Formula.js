import { $ } from "../../core/Dom";
import { ExelComponent } from "../../core/ExelComponnet";

export class Formula extends ExelComponent {
   static className = 'exel__formula'
   constructor($root, options) {
      super($root, {
         name: "Formula",
         listeners: ['input', 'click', 'keydown'],
         subscribe: ['currentText'],
         ...options
      })
   }
   toHTML() {
      return `
      <div class="excel__formula">
        <div class="info">fx</div>
        <div id="input" class="input" contenteditable spellcheck="false">
         </div>
      </div>
      `
   }

   init() {
      super.init()
      this.$formula = this.$root.find('#input')
      this.$on('table:select', $cell => {
         // console.log(this.$formula.texContent = this.$el.$cell.data.value);
         this.$formula.text($cell.data.value)
      })
      // this.$subscribe(state => {
      //    this.$formula.text(state.currentText)
      // })
      // this.$on('input:Formula', $cell => {
      //    this.$formula.text($cell.text())
      // })
      // this.storeChanged()
   }

   storeChanged({ currentText }) {
      this.$formula.text(currentText)
   }

   onInput(event) {
      const text = $(event.target).text()
      this.$emit('Formula:value', text)
   }
   onClick(event) {
      // console.log(`click ${event}`);
   }

   onKeydown(event) {
      const keys = ['Tab', 'Enter']
      if (keys.includes(event.key)) {
         event.preventDefault()
         this.$emit('formula:done')
      }
   }
}