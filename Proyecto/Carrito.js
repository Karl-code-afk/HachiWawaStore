let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorCarrito = document.getElementById("lista-carrito");
const textoTotal = document.getElementById("total-pago");

function dibujarCarrito() {
  contenedorCarrito.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML =
      '<p style="text-align: center; color: #555;">Tu carrito está vacío</p>';
    textoTotal.innerText = "0.00";
    return;
  }

  carrito.forEach((producto, index) => {
    total += producto.precio * producto.cantidad;

    contenedorCarrito.innerHTML += `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; background: #ffe5f3; padding: 15px; border-radius: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <img src="${producto.imagen}" style="width: 70px; border-radius: 10px;">
                
                <div style="flex: 1; margin-left: 15px;">
                    <h4 style="margin: 0; color: #ff69b4;">${producto.nombre}</h4>
                    <p style="margin: 5px 0 0 0; font-weight: bold;">$${producto.precio.toFixed(2)}</p>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="cambiarCantidad(${index}, -1)" style="border: none; background: #ffbee1; padding: 5px 12px; border-radius: 5px; cursor: pointer; font-weight: bold;">-</button>
                    <span style="font-weight: bold; font-size: 1.1rem; width: 20px; text-align: center;">${producto.cantidad}</span>
                    <button onclick="cambiarCantidad(${index}, 1)" style="border: none; background: #ffbee1; padding: 5px 12px; border-radius: 5px; cursor: pointer; font-weight: bold;">+</button>
                    
                    <button onclick="eliminarProducto(${index})" style="border: none; background: #ff4757; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-left: 15px;">X</button>
                </div>
            </div>
        `;
  });

  textoTotal.innerText = total.toFixed(2);
}

// Conectamos las funciones a window para que el HTML pueda ejecutarlas
window.cambiarCantidad = function (index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  dibujarCarrito();
};

window.eliminarProducto = function (index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  dibujarCarrito();
};

dibujarCarrito();
