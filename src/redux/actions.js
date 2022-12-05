export const actionsTableResize = (data) => {
   return {
      type: 'TABLE_RESIZE',
      data,
   }
}
export const actionsTextChange = (data) => {
   return {
      type: 'CURRENT_TEXT',
      data
   }
}

export const actionCurrentStyles = (data) => {
   return {
      type: 'CURRENT_STYLE',
      data
   }
}

export const actionApplyStyles = (data) => {
   return {
      type: 'APPLY_STYLE',
      data
   }
}

export const actionChangeTitle = (data) => {
   return {
      type: 'CHANGE_TITLE',
      data
   }
}