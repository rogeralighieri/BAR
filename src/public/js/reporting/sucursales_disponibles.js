/* Autocompletar */
document.addEventListener("DOMContentLoaded", async () => {

    let resultado1 = await postData("/consultasucursales");
    // console.log(resultado1);

    const select1 = document.getElementById("txtsucursales_disponibles");

    if (resultado1 != undefined) {
        resultado1.forEach((element) => {
            const option = document.createElement('option');
            option.value = element.PKSUC_NCODIGO;
            option.textContent = element.SUC_CNOMBRE;
            select1.appendChild(option);
        });
    } else {
        // console.log('Sin data')
    }
});

/* Autocompletar */
async function cargarSucursal(id) {

    let resultado = await postData("/consultasucursales");
    // console.log(resultado);

    de = '#txtsucursales_disponibles_' + id;
    op = de + ' option';
    // console.log(de)

    const select = document.querySelectorAll(op);

    if (resultado != undefined) {
        resultado.forEach((element, index) => {
            if (index < select.length) {
                select[index].value = element.PKSUC_NCODIGO;
                select[index].textContent = element.SUC_CNOMBRE;
            } else {
                const option = document.createElement('option');
                option.value = element.PKSUC_NCODIGO;
                option.textContent = element.SUC_CNOMBRE;
                document.querySelector(de).appendChild(option);
            }
        });
    } else {
        console.log('Sin data')
    }
};