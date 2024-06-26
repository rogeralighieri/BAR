"use stric";

document.getElementById('containerLoader').classList.remove('hidden');
// document.getElementById('textLoader').innerHTML = `Ejecutando solicitud`; 

document.addEventListener('DOMContentLoaded', () => {

    var MESAS = $("#Reporte_Admin_Mesa").DataTable({
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