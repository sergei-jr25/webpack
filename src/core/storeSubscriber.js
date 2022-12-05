import { isEqual } from "./utils"

export class storeSubscriber {
   constructor(store) {
      this.store = store
      this.sub = null
      this.prevState = {}
   }

   subscribeComponents(components) {
      this.pervState = this.store.getState()
      this.sub = this.store.subscribe(state => {
         Object.keys(state).forEach(key => {
            if (!isEqual(this.pervState[key], state[key])) {
               components.forEach(component => {
                  if (component.isWatching(key)) {
                     const changes = { [key]: state[key] }
                     component.storeChanged(changes)
                  }
               })
            }
         })
         this.pervState = this.store.getState()
      })
   }

   unsubscribeComponents() {
      this.sub.unsubscribe
   }
}