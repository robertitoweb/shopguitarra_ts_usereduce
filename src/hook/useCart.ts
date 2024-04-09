
import { useState, useEffect} from 'react'
import { db} from '../data/db'
import type { Guitar,CartItem } from '../types/index'

export const useCart =()=>{
    
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart? JSON.parse(localStorageCart): []
      }
      const [data]=useState(db)
      const [cart,setCart]=useState(initialCart) 
    
      const MAX_ITEMS=5
      const MIN_ITEMS=1
    
      useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
      },[cart])
    
        function addToCard(item: Guitar){
    
          const itemExist = cart.findIndex(guitar=>(guitar.id===item.id))
    
                if(itemExist>=0){// el item ya existe 
          
                  if(cart[itemExist].quantity < MAX_ITEMS){
                    const updateCart = [...cart]
                    updateCart[itemExist].quantity++
                    setCart(updateCart)
                  }
                }else{
                  const newItem : CartItem  = {...item,quantity : 1}
                setCart([...cart,newItem])
                }
           
          }
    
    
        function removeFromCart(id: Guitar['id']){
         setCart(prevCart=> prevCart.filter(guitar => guitar.id!==id))
        }
    
        function increaseQuantity(id: Guitar['id']){
       const updatedCart = cart.map(item=>{
        if(item.id===id && item.quantity<MAX_ITEMS){
          return{
            ...item,
            quantity:item.quantity +1 
          }
        }
        return item
       })
       setCart(updatedCart)
        }
    
       function decrementCart(id: Guitar['id']){
        const updatedCart = cart.map(item=>{
          if(item.id===id && item.quantity>MIN_ITEMS){
            return{
              ...item,
              quantity: item.quantity-1
            }
          }
          return item
    })
    setCart(updatedCart)
       }
    
       function clearCart(){
        setCart([])
       }

       
 // de header
    return {
        data,
        cart,
        addToCard,
        removeFromCart,
        increaseQuantity,
        decrementCart,
        clearCart,
       
    }
}