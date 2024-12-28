//VARIABLES
let array_compras =obtener_carrito_LocalStorage();
let precio_total=0;
console.log(array_compras);

//DOM
let contenedor_compras= document.getElementById('contenedor_compras');
let contenedor_precio_total=document.getElementById('monto_total');
let contenedor_cantidad_productos=document.getElementById('cantidad_productos')
//FUNCIONES
function pintar_compras(array_libros) {
    let lista_libros = ``;
    array_libros.forEach(libro => {
        lista_libros += `
            <article class="libros_carrito">
                <img src="${libro.imagen}" alt="${libro.nombre}">
                <div>
                    <h3 class="titulo">${libro.nombre} </h3>
                    <h3 class="precio">${"$" + libro.precio}</h3>
                    <button class="quitar_carrito">Quitar al carrito</button>
                </div>                  
            </article>       
        `;
        precio_total += libro.precio;
    });
    
    contenedor_compras.innerHTML = lista_libros;

    //evento
    const btns_quitar_carrito = document.querySelectorAll('.quitar_carrito');
    btns_quitar_carrito.forEach((boton, index) => {
        boton.addEventListener('click',()=>{
            const producto_seleccionado= array_libros[index];

            
            array_compras.splice(producto_seleccionado,1);
            guardar_carrito_LocalStorage(array_compras);
            console.log(array_compras);

            location.reload();
        });
    });
    

}
function pintar_precio_total(){
    contenedor_precio_total.innerHTML=`${"$" + precio_total}`;
}
function pintar_cantidad_productos(){
    let cantidad_productos= array_compras.length;
    contenedor_cantidad_productos.innerHTML= `${cantidad_productos}`;
}

function obtener_carrito_LocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : []; 
    
}
function guardar_carrito_LocalStorage(array_compras) {
    localStorage.setItem('carrito', JSON.stringify(array_compras)); 
}


//LLAMADA DE FUNCIONES
pintar_compras(array_compras);
pintar_cantidad_productos();
pintar_precio_total();