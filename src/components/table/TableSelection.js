export class TableSelection {
   constructor() {
      this.group = []
      this.selection = null
   }
   select($el) {
      this.clear()
      this.group = []
      this.group.push($el)
      this.current = $el
      $el.focus().addStyle('selected')
   }
   clear() {
      this.group.forEach(el => el.removeStyle('selected'))
      this.group = []
   }
   selectedGroup(group = []) {
      this.clear()
      this.group = group
      this.group.forEach($el => $el.addStyle('selected'))
   }

   get selectedIds() {
      return this.group.map($el => $el.id())
   }
}