import { Exel } from "./components/exel/Exel";
import { Formula } from "./components/Formula/Formula";
import { Header } from "./components/header/Header";
import { Table } from "./components/table/Table";
import { ToolBar } from "./components/ToolBar/ToolBar";
import { createStore } from "./core/createStore";
import { debounce, storage } from "./core/utils";
import { initialState } from "./redux/initialState";
import { rootReducer } from "./redux/rootReduces";
import './index.scss'

const store = createStore(rootReducer, initialState)

const storeListener = debounce((state) => {
   console.log(state);
   storage('exel-state', state)
}, 300)
store.subscribe(storeListener)
const exel = new Exel("#app", {
   components: [Header, Formula, Table, ToolBar],
   store
})

exel.render()