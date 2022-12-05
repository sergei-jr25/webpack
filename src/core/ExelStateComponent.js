import { ExelComponent } from "./ExelComponnet";

export class ExelStateComponent extends ExelComponent {
   constructor(...args) {
      super(...args)
   }

   // eslint-disable-next-line getter-return
   get template() {
      return JSON.stringify(this.state, null, 2)
   }

   initState(initialState = {}) {
      this.state = { ...initialState }
   }

   setState(newState) {
      this.state = { ...this.state, ...newState }
      this.$root.html(this.template)
   }
}