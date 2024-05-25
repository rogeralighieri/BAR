"use stric";

document.getElementById('containerLoader').classList.remove('hidden');
// document.getElementById('textLoader').innerHTML = `Ejecutando solicitud`; 

document.addEventListener('DOMContentLoaded', () => {

    var PEDIDOS = $("#Reporte_Admin_Pedido").DataTable({
        iDisplayLength: 10,
        aLengthMenu: [
            [3, 5, 10, 25, 50, -1],
            [3, 5, 10, 25, 50, "All"],
        ],
        columnDefs: [
            {
                targets: [],
                visible: true,
                searchable: true,
            },
        ],
        dom: "lfrtipB",
        buttons: [
            {
                extend: 'copy',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5, 6, 7]
                }
            },
            {
                extend: 'excel',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5, 6, 7]
                }
            },
            {
                extend: 'csv',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5, 6, 7]
                }
            },
        ],
        language: {
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontraro resultados",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando registros de 0 al 0 de un total de 0 registros",
            infoFiltered: "(Filtrado de un total de _MAX_ registros)",
            sSearch: "Buscar",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Ultimo",
                sNext: ">>",
                sPrevious: "<<",
            },
            sProcessing: "Procesando",
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>",
            },
        },
    });
    document.getElementById('containerLoader').classList.add('hidden');
});


function mostrarMontos(id){
    console.log(id)
    let tipoPago = document.getElementById('txttipo_pago_'+id).value;
    console.log(tipoPago)
    let montoTotal = document.getElementById('txtvalor_cancelar_'+id).value;
    // console.log(montoTotal)
    if (tipoPago == 'EFECTIVO'){
        let txtmonto_recibido = document.getElementById('txtmonto_recibido_div_'+id);
        txtmonto_recibido.classList.remove('d-none');
        let txtmonto_cambio = document.getElementById('txtmonto_cambio_div_'+id);
        txtmonto_cambio.classList.remove('d-none');
    } else if (tipoPago == 'TC'){
        let txtmonto_recibido = document.getElementById('txtmonto_recibido_div_'+id);
        txtmonto_recibido.classList.add('d-none');
        let txtmonto_cambio = document.getElementById('txtmonto_cambio_div_'+id);
        txtmonto_cambio.classList.add('d-none');
    }
}


function calcularMontoCambio(id) {
    // console.log('Entro a la funcion');
    let montoTotal = parseFloat(document.getElementById('txtvalor_cancelar_'+id).value);
    // console.log(montoTotal);
    let txtmonto_recibido = parseFloat(document.getElementById('txtmonto_recibido_'+id).value);
    // console.log(txtmonto_recibido);
    let txtmonto_cambio = document.getElementById('txtmonto_cambio_'+id);
    let operacion = parseFloat(txtmonto_recibido - montoTotal);
    // console.log(operacion);
    txtmonto_cambio.value = operacion;
}
