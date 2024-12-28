//VARIABLES
let array_compras = obtener_carrito_LocalStorage();
console.log(array_compras);

//DOM
let contenedor_libros = document.getElementById('mas_vendidos');
const btn_carrito=document.getElementById('btn_carrito');

//FUNCIONES
function pintar_libros(array_libros) {
    let lista_libros = ``;
    array_libros.forEach(libro => {
        lista_libros += `
            <article class="libros">
                <img src="${libro.imagen}" alt="${libro.nombre}">
                <h3 class="titulo">${libro.nombre} </h3>
                <h3 class="precio">${"$" + libro.precio}</h3>
                <button class= "agregar_carrito">Agregar al carrito</button>
            </article>        
        `;
    });
    contenedor_libros.innerHTML += lista_libros;

    //evento
    const btns_agregar_carrito = document.querySelectorAll('.agregar_carrito');
    btns_agregar_carrito.forEach((boton, index) => {
        boton.addEventListener('click',()=>{
            const producto_seleccionado= array_libros[index];
            array_compras.push(producto_seleccionado);
            guardar_carrito_LocalStorage(array_compras);
            alert(`¡ "${producto_seleccionado.nombre}" agregado al carrito!`);
            console.log(array_compras);
        });
    });
    

}

function obtener_carrito_LocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : []; 
    
}
function guardar_carrito_LocalStorage(array_compras) {
    localStorage.setItem('carrito', JSON.stringify(array_compras)); 
}
//EVENTOS

//ASINCRONISMO
const obtener_libros = async () => {
    try {
        const respuesta = await fetch(`./productos.json`, {
            method: "GET"
        });
        let datos = await respuesta.json();

        pintar_libros(datos);


    }
    catch (error) {
        console.log('error al cargar');
    }
}

//LLAMADA DE FUNCIONES
obtener_libros();
