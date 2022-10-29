import { $ } from "../../core/Dom"

export class Exel {
   constructor(selected, options) {
      this.$el = $(selected)
      this.components = options.components || []
   }
   // Создаем ноду

   getRoot() {
      const $root = $.createElement('div', 'excel')

      // Работаем с классами
      this.components = this.components.map(Component => {
         const $el = $.createElement('div', Component.className)
         const component = new Component($el)
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
   }
}