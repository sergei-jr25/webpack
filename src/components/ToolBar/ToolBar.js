import { defaultStyles } from "../../constans";
import { $ } from "../../core/Dom";
// import { ExelComponent } from "../../core/ExelComponnet";
import { ExelStateComponent } from "../../core/ExelStateComponent";
import { createToolBar } from "./toolbar.component";

export class ToolBar extends ExelStateComponent {
   static className = 'excel__toolbar'
   constructor($root, options) {
      super($root, {
         name: 'ToolBar',
         listeners: ['click'],
         subscribe: ['currentStyles'],
         ...options,
      })
   }

   prepare() {
      this.initState(defaultStyles)
   }

   get template() {
      return createToolBar(this.state)
   }

   toHTML() {
      return this.template
   }

   storeChanged({ currentStyles }) {
      this.setState(currentStyles)
      // console.log(currentStyles);
   }

   onClick(event) {
      const $target = $(event.target)
      if ($target.data.type === 'button') {
         const value = JSON.parse($target.data.value)
         this.$emit('Toolbar:style-apply', value)

         // const key = Object.keys(value)[0]
         // this.setState({ [key]: value[key] })
      }
   }
}