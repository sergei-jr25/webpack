/* eslint-disable no-dupe-class-members */
import { $ } from "../../core/Dom";
import { ExelComponent } from "../../core/ExelComponnet";
import { nextSelector, range } from "../../core/utils";
import { createTable } from "./table.component";
import { resizeHandler } from "./table.resize";
import { TableSelection } from "./TableSelection";
import * as actionsRedux from "../../redux/actions";
import { defaultStyles } from "../../constans";
import { parse } from "../../core/core";

export class Table extends ExelComponent {
   constructor($root, options) {
      super($root, {
         name: 'Table',
         listeners: ['click', 'mousedown', 'keydown', 'input'],
         ...options
      })
      this.selected = new TableSelection()
   }

   static className = 'excel__table'

   toHTML() {
      return createTable(26, this.store.getState())
   }

   prepare() {
   }

   init() {
      super.init()
      const $cell = this.$root.find('[data-id="0:0"]')
      this.selectCell($cell)
      this.$on('Formula:value', (text) => {
         this.selected.current
            .attr('data-value', text)
            .text(parse(text))
         // this.selected.current.text(text)
         this.tableUpdateText(text)
      })
      this.$on('formula:done', () => {
         this.selected.current.focus()
      })
      this.$on('Toolbar:style-apply', value => {
         console.log(this.selected.selectedIds);
         this.applyStyle(value)
         this.$dispatch(actionsRedux.actionApplyStyles(
            {
               value,
               ids: this.selected.selectedIds
            })
         )
      })
   }

   onClick(event) {

   }

   async resizeTable(event) {
      const data = await resizeHandler(event, this.$root)
      this.$dispatch(actionsRedux.actionsTableResize(data))
   }
   onMousedown(event) {
      if (event.target.dataset.resize) {
         this.resizeTable(event)
      }
      if (event.target.dataset.id) {
         const $target = $(event.target)
         if (event.shiftKey) {
            // "target" Текущие значение 
            const target = $target.id(true)
            // "current" Предыдущие значение
            const current = this.selected.current.id(true)
            const cols = range(current.col, target.col)
            const rows = range(current.row, target.row)
            // Формируем общий массив
            const ids = cols.reduce((acc, col) => {
               rows.forEach(row => acc.push(`${row}:${col}`))
               return acc
            }, [])
            const $cells = ids.map(el => this.$root.find(`[data-id="${el}"]`))
            this.selected.selectedGroup($cells)
         } else {
            this.selectCell($target)
         }
      }
   }

   onKeydown(event) {
      const { key } = event
      const keys = [
         'Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
      ]
      if (keys.includes(key) && !event.shiftKey) {
         event.preventDefault()
         const id = this.selected.current.id()
         const $next = this.$root.find(nextSelector(key, id))
         this.selectCell($next)
      }
   }

   tableUpdateText(value) {
      const id = this.selected.current.id()
      this.$dispatch(actionsRedux.actionsTextChange({ id, value }))
   }

   onInput(event) {
      this.tableUpdateText($(event.target).text())
      // const text = $(event.target).text()
      // const id = this.selected.current.id()
      // this.$dispatch(actionsRedux.actionsTextChange({ id, text }))
   }

   selectCell($cell) {
      this.selected.select($cell)
      this.$emit('table:select', $cell)
      // this.$dispatch({ type: "TEST" })
      const styles = $cell.getStyles(Object.keys(defaultStyles))
      this.$dispatch(actionsRedux.actionCurrentStyles(styles))
   }

   applyStyle(style) {
      this.selected.group.forEach(el => el.css(style))
   }
}

