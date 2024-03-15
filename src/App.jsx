import './App.css'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import ItemDetail from './components/ItemDetail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { fakeApiCall } from './utils/fakeApiCall'
import categories from './utils/MocksAsync.json'

function App() {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    fakeApiCall(categories).then(res => {setResponse(res); setLoading(false); setProductCategories(res.categorias);});
  }, []);

  if(loading) return <h2>Loading...</h2>

  return (
    <>
      <Router>
        <Navbar productCategories={productCategories}/>
        <Routes>
          <Route path='/' element={<ItemListContainer />}/>
          <Route path='/category/:id' element={<ItemListContainer />}/>
          <Route path='/item/:id' element={<ItemDetailContainer />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
