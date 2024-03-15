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
  const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
      setLoading(true);
      fakeApiCall(categories).then(res => { 
        setResponse(res); 
        setProductCategories(res.categorias);
        setAllProducts(res.productos);
        setLoading(false); 
       });
    }, []);

    /* useEffect(() => {
      console.log(allProducts, productCategories);
    }, [response]); */

  if (loading) return <h2>Loading...</h2>

  return (
    <>
      <Router>
        <Navbar productCategories={productCategories} />
        <Routes>
          <Route path='/' element={<ItemListContainer allProducts={allProducts} />} />
          <Route path='/category/:id' element={<ItemListContainer allProducts={allProducts} />} />
          <Route path='/item/:id' element={<ItemDetailContainer allProducts={allProducts}/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
