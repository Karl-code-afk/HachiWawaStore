// Recuperamos el carrito guardado o creamos uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const textoContador = document.getElementById("cantidad-carrito");
const textoTotal = document.getElementById("total-carrito");
const toast = document.getElementById("notificacion");

function actualizarPantalla() {
  let totalPeluches = 0;
  let precioTotal = 0;

  carrito.forEach((producto) => {
    totalPeluches += producto.cantidad;
    precioTotal += producto.precio * producto.cantidad;
  });

  if (textoContador) textoContador.innerText = totalPeluches;
  if (textoTotal) textoTotal.innerText = precioTotal.toFixed(2);
}

// Seleccionamos todos los botones por su clase
const botonesAgregar = document.querySelectorAll(".btn-1");

botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);
    const imagen = boton.dataset.imagen;

    const productoExistente = carrito.find(
      (producto) => producto.nombre === nombre,
    );

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarPantalla();

    if (toast) {
      toast.classList.add("show"); // Tu CSS usa la clase "show" para mostrarlo
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }
  });
});

// Arrancar al cargar la página
actualizarPantalla();
