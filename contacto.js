//VARIABLES
let array_compras = obtener_carrito_LocalStorage();

//DOM
const btn_carrito=document.getElementById('btn_carrito');

//FUNCIONES
function obtener_carrito_LocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : []; 
    
}

//LLAMADA DE FUNCIONES

if(array_compras.length!=0){
    btn_carrito.innerText= `${array_compras.length}`;
}