
/* Autocompletar */
document.addEventListener("DOMContentLoaded", async () => {

    let sucursal = document.getElementById('sucursal_actual').textContent;
    // console.log(sucursal);
    let resultado1 = await postData("/consultamesas", {sucursal});
    // console.log(resultado1);

    const select1 = document.getElementById("mesa_disponible");

    if (resultado1 != undefined) {
        resultado1.forEach((element) => {
            const option = document.createElement('option');
            option.value = element.PKMES_NCODIGO;
            option.textContent = element.MES_CREFERENCIA;
            select1.appendChild(option);
        });
    } else {
        console.log('Sin data')
    }
});

let contadorProductos = 1;

async function agregarProducto() {
    const contenedorProductos = document.getElementById('productos');
    const nuevoProducto = document.createElement('div');
    nuevoProducto.classList.add("form-row");

    // Realizar solicitud AJAX para obtener los datos de los productos desde el servidor
    let resultado = await postData("/listarproductos");
    // console.log(resultado)

    // Utiliza el resultado de la solicitud AJAX para generar las opciones del select
    nuevoProducto.innerHTML = `
        <div class="form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div class="input-group-prepend">
                <label for="producto${contadorProductos}" class="col-form-label text-muted">Producto ${contadorProductos}</label>
            </div>
            <select class="custom-select form-control" name="producto${contadorProductos}" id="producto${contadorProductos}" required>
                <option value="">Elige una opción</option>
                ${resultado.map(producto => `<option value="${producto.PKPRO_NCODIGO}">${producto.PRO_CNOMBRE}</option>`).join('')}
            </select>
        </div>

        <div class="form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <label class="col-form-label text-muted" for="cantidad${contadorProductos}">Cantidad Producto ${contadorProductos}</label>
            <div class="input-group">
                <input type="text" name="cantidad${contadorProductos}" id="cantidad${contadorProductos}" class="form-control" data-toggle="tooltip"
                data-placement="bottom" placeholder="" onkeyup="mayus(this);" autocomplete="off" maxlength="100" required>
                <div class="input-group-prepend">
                    <span class="input-group-text btn btn-secondary" onclick="eliminarProducto(this)">Eliminar</span>
                </div>
            </div>
        </div>
    `;

    contenedorProductos.appendChild(nuevoProducto);
    contadorProductos++;
}

function eliminarProducto(btnEliminar) {
    // Obtener el div .form-row que contiene el producto
    const divProducto = btnEliminar.closest('.form-row');
    // Eliminar el div .form-row completo que contiene todos los elementos del producto
    divProducto.remove();
}
