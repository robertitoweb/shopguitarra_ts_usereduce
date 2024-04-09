import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart? JSON.parse(localStorageCart): []
  }

export type CartActions = 
{type: 'add-to-cart', payload : { item : Guitar}} |
{type: 'remove-from-cart', payload : { item : Guitar['id']}} |
{type: 'decrease-quantity', payload : { item : Guitar['id']}} |
{type: 'increase-quantity', payload : { item : Guitar['id']}} |
{type: 'clear-cart'}

export type CartState ={
    data : Guitar[]
    cart : CartItem[]
}
const MAX_ITEMS=5
const MIN_ITEMS=1

export const initialState : CartState ={
    data : db,
    cart : initialCart()
}

export const cartReducer = (
    state :  CartState = initialState,
    action : CartActions
) =>{

    if(action.type ==='add-to-cart'){
      const itemExist = state.cart.find(guitar=>(guitar.id===action.payload.item.id))
      let updateCart : CartItem[]=[]
        if(itemExist){// el item ya existe 
        updateCart = state.cart.map( item =>{
            if(item.id===action.payload.item.id){
                    if(item.quantity< MAX_ITEMS){
                        return {...item,quantity : item.quantity + 1}
                        }else{
                            return item
                        }
                }else{
                    return item
                }
        })
         
        }else{
          const newItem : CartItem  = {...action.payload.item,quantity : 1}
          updateCart = [...state.cart, newItem]
        }
   

        return {
            ...state,
            cart: updateCart
        }
    }
    if(action.type ==='remove-from-cart'){

        const cart = state.cart.filter(item => item.id !== action.payload.item)
        return {
            ...state,
            cart : cart
        }
    }
    if(action.type ==='decrease-quantity'){
        const updatedCart = state.cart.map(item=>{
            if(item.id===action.payload.item && item.quantity>MIN_ITEMS){
              return{
                ...item,
                quantity: item.quantity-1
              }
            }
            return item
      })
      
        return {
            ...state,
            cart : updatedCart
        }
    }
    if(action.type ==='increase-quantity'){

        const updatedCart = state.cart.map(item=>{
            if(item.id=== action.payload.item && item.quantity<MAX_ITEMS){
              return{
                ...item,
                quantity:item.quantity +1 
              }
            }
            return item
           })
        return {
            ...state,
            cart : updatedCart
        }
    }
    if(action.type ==='clear-cart'){
        return {
            ...state,
            cart: []
        }
    }
    return state
}