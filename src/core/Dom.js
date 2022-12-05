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

   closest(selector) {
      return $(this.$el.closest(selector))
   }
   getCords() {
      return this.$el.getBoundingClientRect()
   }

   get data() {
      return this.$el.dataset
   }

   findAll(selector) {
      return this.$el.querySelectorAll(selector)
   }
   find(selector) {
      return $(this.$el.querySelector(selector))
   }
   addStyle(style) {
      return this.$el.classList.add(style)
   }
   removeStyle(style) {
      return this.$el.classList.remove(style)
   }
   focus() {
      this.$el.focus()
      return this
   }

   css(styles = {}) {
      Object.keys(styles).forEach(key => {
         // console.log(key);
         // console.log(styles[key]);
         this.$el.style[key] = styles[key]
      })
   }

   id(parse) {
      if (parse) {
         const parsed = this.id().split(':')
         console.log(parsed);
         return {
            row: +parsed[0],
            col: +parsed[1]
         }
      }
      return this.data.id
   }

   text(text) {
      if (typeof text !== 'undefined') {
         this.$el.textContent = text
         this.$el.value = text
         return this
      }
      if (this.$el.tagName.toLowerCase() === 'input') {
         return this.$el.value.trim()
      }
      return this.$el.textContent.trim()
   }

   getStyles(styles = []) {
      return styles.reduce((res, style) => {
         res[style] = this.$el.style[style]
         return res
      }, {})
   }

   attr(name, value) {
      if (value) {
         this.$el.setAttribute(name, value)
         return this
      }
      return this.$el.getAttribute(name)
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