import ItemList from "./ItemList";

const ItemListContainer = ({greeting}) => {
  return (
    <>
      <h2 className="text-dark text-center mt-5">{greeting}</h2>
      <ItemList />
    </>
  )
}

export default ItemListContainer