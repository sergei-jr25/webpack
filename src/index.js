import { Exel } from "./components/exel/Exel";
import { Formula } from "./components/Formula/Formula";
import { Header } from "./components/header/Header";
import { Table } from "./components/table/Table";
import { ToolBar } from "./components/ToolBar/ToolBar";
import './index.scss'

const exel = new Exel("#app", {
   components: [Header, Formula, Table, ToolBar]
})

exel.render()