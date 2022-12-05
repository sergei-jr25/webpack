import { defaultTitle } from "../../constans";
import { $ } from "../../core/Dom";
import { ExelComponent } from "../../core/ExelComponnet";
import { debounce } from "../../core/utils";
import * as actionsRedux from "../../redux/actions";

export class Header extends ExelComponent {
   static className = 'exel__header'
   constructor($root, options) {
      super($root, {
         name: "Header",
         listeners: ['input'],
         ...options
      })
   }

   prepare() {
      this.onInput = debounce(this.onInput, 300)
   }
   toHTML() {
      const title = this.store.getState().currentTitle || defaultTitle
      return `<h1><input value="${title}"></h1>`
   }
   onInput(event) {
      const $target = $(event.target)
      this.$dispatch(actionsRedux.actionChangeTitle($target.text()))
      console.log('OnINput Header');
   }
}