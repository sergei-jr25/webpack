// Оптимизация пишем кастомые формулы

class Dom {
   constructor(selector) {
      this.$el = typeof selector === 'string'
         ? document.querySelector(selector)
         : selector
   }

   html(html) {
      // eslint-disable-next-line no-empty
      if (typeof html === 'string') {
         this.$el.innerHTML = html
         // Очисчтим HTML 
         return this
      }
      // debugger
      return this.$el.OuterHTML
   }
   clear() {
      this.html('')
      return this
   }
   append(node) {
      if (node instanceof Dom) {
         node = node.$el
      }
      this.$el.append(node)
      return this
   }

   // Создаем событие 
   on(listener, callback) {
      this.$el.addEventListener(listener, callback)
   }

   off(listener, callback) {
      this.$el.removeEventListener(listener, callback)
   }
}

export function $(selector) {
   return new Dom(selector)
}

$.createElement = (tagName, classes = '') => {
   const el = document.createElement(tagName)
   if (classes) {
      el.classList.add(classes)
   }
   // оборачиваем в функиию "$"
   return $(el)
}