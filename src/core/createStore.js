export const createStore = (rootReducer, initState = {}) => {
   let state = rootReducer(initState, { type: "INIT_STATE" })
   let listeners = []

   return {
      dispatch(action) {
         state = rootReducer(state, action)
         listeners.forEach(listener => listener(state))
      },
      // Подписка
      subscribe(fn) {
         listeners.push(fn)
         // Отписка
         return {
            unsubscribe() {
               listeners = listeners.filter(listener => listener !== fn)
            }
         }
      },
      getState() {
         return JSON.parse(JSON.stringify(state))
      }
   }
}