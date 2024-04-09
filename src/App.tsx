
import './App.css'
import { useReducer, useEffect } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
//import { useCart } from './hook/useCart'
import { cartReducer, initialState } from './reducers/cart-reducer'

    


function App() {
/*
const { 
  data,
  cart,
  addToCard,
  removeFromCart,
  increaseQuantity,
  decrementCart,
  clearCart,
  IsEmpty,
  cartTotal
 }=  useCart()
 */
 

const [state,dispatch] = useReducer(cartReducer,initialState)

useEffect(()=>{
  localStorage.setItem('cart',JSON.stringify(state.cart))
},[state.cart])


  return (
    <>
 
<Header
cart={state.cart}
dispatch={dispatch}
//increaseQuantity={increaseQuantity}
//decrementCart ={decrementCart}
//clearCart={clearCart}
//IsEmpty={IsEmpty}
//cartTotal={cartTotal}
/>

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((guitarra)=>(
            <Guitar 
            key={guitarra.id} 
            guitar={guitarra}
           // setCart={setCart}
            //addToCard={addToCard}
            dispatch ={dispatch}
            />

          ))}


        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
 
    </>
  )
}

export default App
