export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}


// primera forma de agregar atributos y herencia 
/*export interface CartItem extends Guitar {
    quantity : number
} */

// segunda forma de gerencia
export type CartItem = Guitar & {
    quantity : number
}

// tercera forma 
// utilizando utilitys
// pick es para seleccinar atributos de otro type
// Omit es para omitir atributos de oto type
/*
export type CartItem = Pick<Guitar,'id'|'name'|'image'|'description'|'price'>&{
    quantity : number
}*/