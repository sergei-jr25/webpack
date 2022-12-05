import { $ } from "../../core/Dom"
import { Emitter } from "../../core/Emmiter"
import { storeSubscriber } from "../../core/storeSubscriber"

export class Exel {
   constructor(selected, options) {
      this.$el = $(selected)
      this.components = options.components || []
      this.emitter = new Emitter()
      this.store = options.store
      this.storeSubscribe = new storeSubscriber(this.store)
   }
   // Создаем ноду

   getRoot() {
      const $root = $.createElement('div', 'excel')

      // Работаем с классами
      this.components = this.components.map(Component => {
         const $el = $.createElement('div', Component.className)
         const component = new Component($el, {
            emitter: this.emitter,
            store: this.store
         })

         $el.html(component.toHTML())
         $root.append($el)
         return component
      })
      return $root
   }

   render() {
      this.$el.append(this.getRoot())
      this.components.forEach(component => {
         component.init()
      })
      this.storeSubscribe.subscribeComponents(this.components)
   }

   destroy() {
      this.components.forEach(component => component.destroy())
      this.storeSubscribe.unsubscribeComponents()
   }
}