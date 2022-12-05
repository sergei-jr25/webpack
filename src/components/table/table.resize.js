import { $ } from "../../core/Dom"

export const resizeHandler = (event, root) => {
   return new Promise((resolve, reject) => {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const cords = $parent.getCords()
      const type = $resizer.data.resize
      const saidProp = type === 'col' ? 'bottom' : 'right'
      let value
      $resizer.css({
         opacity: 1,
         [saidProp]: '-100%'
      })

      document.onmousemove = e => {
         const delta = type === 'col' ? e.pageX - cords.right :
            e.pageY - cords.bottom

         if (type === 'col') {
            value = cords.width + delta + 'px'
            $resizer.css({ right: -delta + 'px' })
         } else {
            value = cords.height + delta + 'px'
            $resizer.css({ bottom: -delta + 'px' })
         }
      }
      document.onmouseup = e => {
         document.onmousemove = null
         document.onmouseup = null
         if (type === 'col') {
            root.findAll(`[data-col="${$parent.data.col}"]`)
               .forEach(el => el.style.width = value)
         } else {
            $parent.css({ height: value })
         }
         resolve({
            value,
            id: type === 'col' ? $parent.data.col : $parent.data.row,
            type
         })
         $resizer.css({ opacity: 0, bottom: 0, right: 0 })
      }
   })
}