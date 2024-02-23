import './App.css'
import Navbar from './components/Navbar'
import ItemListContainer from './components/ItemListContainer'

function App() {

  return (
    <>
      <Navbar />
      <ItemListContainer greeting={"Bienvenido a mi tienda en linea"}/>
    </>
  )
}

export default App
