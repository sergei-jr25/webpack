import { defaultStyles } from "../constans"
import { storage } from "../core/utils"

const defaultSate = {
   rowState: {},
   colState: {},
   dataState: {},
   stylesState: {},
   currentTitle: '',
   currentText: '',
   currentStyles: defaultStyles
}

const normalize = (state) => ({
   ...state,
   currentStyles: defaultStyles,
   currentText: ''
})

export const initialState = storage('exel-state')
   ? normalize(storage('exel-state')) : defaultSate