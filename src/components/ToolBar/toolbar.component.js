export const toolBarButton = (button) => {
   const json = JSON.stringify(button.value)
   const meta = `data-type="button" data-value='${json}'`
   return ` 
   <div  ${meta}
    class="button
     ${button.active ? 'active' : ''}       
         ">
      <i ${meta} class="material-icons">${button.icon}</i>
   </div>`
}

export const createToolBar = (state) => {
   const buttons = [
      {
         icon: 'format_align_left',
         active: state['textAlign'] === 'left' ? true : false,
         value: { textAlign: 'left' }
      },
      {
         icon: 'format_align_right',
         active: state['textAlign'] === 'right' ? true : false,
         value: { textAlign: 'right' }
      },
      {
         icon: 'format_align_center',
         active: state['textAlign'] === 'center' ? true : false,
         value: { textAlign: 'center' }

      },
      {
         icon: 'format_bold',
         active: state['fontWidth'] === 'bold',
         value: { fontWidth: state['fontWidth'] === 'bold' ? 'normal' : 'bold' }

      },
      {
         icon: 'format_italic',
         active: state['fontStyle'] === 'italic',
         value: {
            fontStyle: state['fontStyle'] === 'normal'
               ? 'italic'
               : "normal"
         }

      },
      {
         icon: 'format_underlined',
         active: state['textDecoration'] === 'underline',
         value: {
            textDecoration: state['textDecoration'] === 'underline'
               ? 'none'
               : 'underline'
         }

      },
   ]
   return buttons.map(button => toolBarButton(button)).join('')
}