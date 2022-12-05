import { DomListener } from "./DomListener"


// eslint-disable-next-line require-jsdoc
export class ExelComponent extends DomListener {
   constructor($root, options = {}) {
      super($root, options.listeners)
      this.name = options.name
      this.emitter = options.emitter
      this.unSubscribers = []
      this.store = options.store
      this.subscribe = options.subscribe || []
      this.storeSub = null

      this.prepare()
   }
   // Настраивааем наш компонент до init
   prepare() { }


   toHTML() {
      return ''
   }
   // Уведомлеям слушателей про событие event
   $emit(event, ...args) {
      this.emitter.emit(event, ...args)
   }
   // Подписываемся на событие event
   $on(event, fn) {
      const unsub = this.emitter.subscribe(event, fn)
      this.unSubscribers.push(unsub)
   }

   isWatching(key) {
      return this.subscribe.includes(key)
   }

   // Сюда приходит те изменения по тем полям на которые мы подписались
   storeChanged(change) {
   }

   $dispatch(action) {
      this.store.dispatch(action)
   }
   $subscribe(fn) {
      this.storeSub = this.store.subscribe(fn)
   }

   init() {
      this.initDOMListener()
   }
   destroy() {
      this.removeDOMListener()
      this.unSubscribers.forEach(unsub => unsub())
      this.storeSub()
   }
}