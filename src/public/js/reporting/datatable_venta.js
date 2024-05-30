"use stric";

document.getElementById('containerLoader').classList.remove('hidden');
// document.getElementById('textLoader').innerHTML = `Ejecutando solicitud`; 

document.addEventListener('DOMContentLoaded', () => {

    const fechaInicio = document.getElementById('txtfecha_inicio_reporting');
    const fechaFin = document.getElementById('txtfecha_fin_reporting');

    var VENTA = $("#Reporte_Venta").DataTable({
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
        buttons: ["copy", "excel", "csv"],

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

    document.getElementById("filtroFecha").addEventListener("click", async function () {
        if (VENTA) {

            if (fechaInicio.value === "" || fechaFin.value === "") {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "!Campos Vacios!",
                    backdrop: true,
                    allowOutsideClick: false
                });
            } else {
                if (fechaInicio.value > fechaFin.value) {

                    console.log(fechaInicio.value);
                    console.log(fechaFin.value);

                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "!Error!",
                        text: "La fecha final debe ser mayor a la fecha inicial.",
                        backdrop: true,
                        allowOutsideClick: false
                    });
                } else {

                    document.getElementById('containerLoader').classList.remove('hidden');
                    document.getElementById('textLoader').innerHTML = `Ejecutando solicitud`;

                    try {

                        let resultado = await postData("/reporteventas", { fechaInicial: fechaInicio.value, fechaFinal: fechaFin.value });
                        console.log(resultado);

                        const tabla = document.querySelector("#Reporte_Venta tbody");

                        let tbodyhtml = ``;
                        resultado.forEach((row) => {
                            tbodyhtml += `
                <tr>
                    <td>${row.PKPED_NCODIGO}</td>
                    <td>${row.FKUSU_NCODIGO}</td>
                    <td>${row.USU_CUSUARIO}</td>
                    <td>${row.USU_CNOMBRE_USUARIO}</td>
                    <td>${row.USU_CROL}</td>
                    <td>${row.FKMES_NCODIGO}</td>
                    <td>${row.MES_CREFERENCIA}</td>
                    <td>${row.MES_CDETALLE}</td>
                    <td>${row.FKSUC_NCODIGO}</td>
                    <td>${row.SUC_CNOMBRE}</td>
                    <td>${row.SUC_CDIRECCION}</td>
                    <td>${row.PED_NVALOR_TOTAL}</td>
                    <td>${row.PED_TFECHA_REGISTRO}</td>
                    <td>${row.PED_CESTADO}</td>
                </tr>`;
                        });

                        //Destruyo la tabla
                        VENTA.destroy();

                        tabla.innerHTML = tbodyhtml;
                        VENTA = $("#Reporte_Venta").DataTable({
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
                            buttons: ["copy", "excel", "csv"],

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
                            }
                        });
                        document.getElementById('containerLoader').classList.add('hidden');

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "!Filtrado!",
                            text: "El Filtro mostrará max 3000 registros.",
                            backdrop: true,
                            allowOutsideClick: false
                        });
                    } catch {
                        console.log('Error');
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Error de Filtro",
                            backdrop: true,
                            allowOutsideClick: false
                        });
                    }
                    document.getElementById('containerLoader').classList.add('hidden');
                }
            }
        }
    });


    document.getElementById('containerLoader').classList.add('hidden');
});
