import { toInInlineSTyle } from "../core/utils"

export const rootReducer = (state, action) => {
   // let prevState
   let field
   let val
   switch (action.type) {
      case "TABLE_RESIZE":
         field = action.data.type === 'col' ? 'colState' : 'rowState'
         // eslint-disable-next-line no-case-declarations
         // prevState = state[field] || {}
         // prevState[action.data.id] = action.data.value
         return { ...state, [field]: value(state, field, action) }

      case "CURRENT_TEXT": {
         field = 'dataState'
         // prevState[action.data.id] = action.data.text
         return {
            ...state,
            currentText: action.data.value,
            [field]: value(state, field, action)
         }
      }
      case "CURRENT_STYLE":
         return {
            ...state,
            currentStyles: action.data
         }
      case "APPLY_STYLE":
         field = 'stylesState'
         val = state[field] || {}
         action.data.ids.forEach(id => {
            val[id] = { ...val[id], ...action.data.value }
         })
         return {
            ...state,
            [field]: val,
            currentStyles: { ...state.currentStyles, ...action.data.value }
         }

      case "CHANGE_TITLE":
         field = 'currentTitle'
         return { ...state, [field]: action.data }

      default: return state
   }
}


const value = (state, field, action) => {
   const val = state[field] || {}
   val[action.data.id] = action.data.value
   return val
}
