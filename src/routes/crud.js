const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const helpers = require('../lib/helpers');


/* Usuario */
router.get('/adminusuarios', isLoggedIn, async (req, res) => {
    try {
        if (req.user.USU_CROL == "Administrador") {
            const users = await pool.query('SELECT * FROM tbl_rusuarios');
            res.render('crud/adminusuarios', {users});
        }  else {
            res.redirect('/redirect');
        } 
    } catch (error) {
        res.render('401');
    }
});

/* Registro Usuario */
router.post('/adminusuarios', isLoggedIn, async (req, res) => {
    const { nombres_apellidos, usuario, password, rol, sucursal_disponibles, estado_usuario, responsable_gestion } = req.body;
    console.log(req.body);
    const newUser = {      
        USU_CNOMBRE_USUARIO: nombres_apellidos,
        USU_CUSUARIO: usuario,
        USU_CPASSWORD: password,
        USU_CROL: rol,
        PKSUC_NCODIGO: sucursal_disponibles,
        USU_CESTADO: estado_usuario,
        FKUSU_NCODIGO: responsable_gestion
    };
    newUser.USU_CPASSWORD = await helpers.encryptPassword(password);
    await pool.query('INSERT INTO tbl_rusuarios set ?', [newUser]);
    req.flash('success', 'Usuario Registrado Correctamente!!!');
    res.redirect('/adminusuarios');
})


/* Modificar Usuario */
router.post('/adminusuarios/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { nombres_apellidos, usuario, password, rol, sucursal_disponibles, estado_usuario} = req.body;
    console.log(req.body);
    const responsable_gestion = req.user.PKUSU_NCODIGO;
    const newUser = {        
        USU_CNOMBRE_USUARIO: nombres_apellidos,
        USU_CUSUARIO: usuario,
        USU_CPASSWORD: password,
        USU_CROL: rol,
        PKSUC_NCODIGO: sucursal_disponibles,
        USU_CESTADO: estado_usuario,
        FKUSU_NCODIGO: responsable_gestion
    };
    newUser.USU_CPASSWORD = await helpers.encryptPassword(password);
    await pool.query('UPDATE tbl_rusuarios set ? WHERE PKUSU_NCODIGO = ?', [newUser,[id]]);
    req.flash('success', 'Usuario Actualizado Correctamente!!!');
    res.redirect('/adminusuarios');
});

// ---------------------------------


/* Sucursales */
router.get('/adminsucursales', isLoggedIn, async (req, res) => {
    try {
        if (req.user.USU_CROL == "Administrador" || req.user.USU_CROL == "Supervisor") {
            const users = await pool.query('SELECT * FROM tbl_sucursal');
            res.render('crud/adminsucursales', {users});
        }  else {
            res.redirect('/redirect');
        } 
    } catch (error) {
        res.render('401');
    }
});

/* Registro Sucursales */
router.post('/adminsucursales', isLoggedIn, async (req, res) => {
    const { nombre_sucursal, direccion_sucursal, detalle_sucursal, estado_sucursal, responsable_gestion  } = req.body;
    console.log(req.body);
    const newUser = {        
        SUC_CNOMBRE: nombre_sucursal,
        SUC_CDIRECCION: direccion_sucursal,
        SUC_CDETALLE_CONTACTO: detalle_sucursal,
        SUC_CESTADO: estado_sucursal,
        FKUSU_NCODIGO: responsable_gestion
    };
    console.log(newUser);
    await pool.query('INSERT INTO tbl_sucursal set ?', [newUser]);
    req.flash('success', 'Sucursal Registrada Correctamente!!!');
    res.redirect('/adminsucursales');
})

/* Modificar Sucursales */
router.post('/adminsucursales/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;   
    const { nombre_sucursal, direccion_sucursal, detalle_sucursal, estado_sucursal } = req.body;
    const responsable_gestion = req.user.PKUSU_NCODIGO;
    console.log(req.body);
    const newUser = {        
        SUC_CNOMBRE: nombre_sucursal,
        SUC_CDIRECCION: direccion_sucursal,
        SUC_CDETALLE_CONTACTO: detalle_sucursal,
        SUC_CESTADO: estado_sucursal,
        FKUSU_NCODIGO: responsable_gestion
    };
    await pool.query('UPDATE tbl_sucursal set ? WHERE PKSUC_NCODIGO = ?', [newUser,[id]]);
    req.flash('success', 'Sucursal Actualizada Correctamente!!!');
    res.redirect('/adminsucursales');
});

// ---------------------------------


/* Productos */
router.get('/adminproductos', isLoggedIn, async (req, res) => {
    try {
        if (req.user.USU_CROL == "Administrador" || req.user.USU_CROL == "Supervisor") {
            const users = await pool.query('SELECT * FROM tbl_producto');
            res.render('crud/adminproductos', {users});
        }  else {
            res.redirect('/redirect');
        } 
    } catch (error) {
        res.render('401');
    }
});

/* Registro Productos */
router.post('/adminproductos', isLoggedIn, async (req, res) => {
    const { nombre_producto, cantidad_producto, precio_unitario, estado_producto, responsable_gestion  } = req.body;
    console.log(req.body);
    const newUser = {        
        PRO_CNOMBRE: nombre_producto,
        PRO_NCANTIDAD_DISPONIBLE: cantidad_producto,
        PRO_NPRECIO_UNITARIO: precio_unitario,
        PRO_CESTADO: estado_producto,
        FKUSU_NCODIGO: responsable_gestion
    };
    console.log(newUser);
    await pool.query('INSERT INTO tbl_producto set ?', [newUser]);
    req.flash('success', 'Producto Registrado Correctamente!!!');
    res.redirect('/adminproductos');
})

/* Modificar Productos */
router.post('/adminproductos/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;   
    const { nombre_producto, cantidad_producto, precio_unitario, estado_producto } = req.body;
    const responsable_gestion = req.user.PKUSU_NCODIGO;
    console.log(req.body);
    const newUser = {        
        PRO_CNOMBRE: nombre_producto,
        PRO_NCANTIDAD_DISPONIBLE: cantidad_producto,
        PRO_NPRECIO_UNITARIO: precio_unitario,
        PRO_CESTADO: estado_producto,
        FKUSU_NCODIGO: responsable_gestion
    };
    await pool.query('UPDATE tbl_producto set ? WHERE PKPRO_NCODIGO = ?', [newUser,[id]]);
    req.flash('success', 'Producto Actualizado Correctamente!!!');
    res.redirect('/adminproductos');
});

// ---------------------------------


/* Mesas */
router.get('/adminmesas', isLoggedIn, async (req, res) => {
    try {
        if (req.user.USU_CROL == "Administrador" || req.user.USU_CROL == "Supervisor") {
            const users = await pool.query('SELECT * FROM tbl_mesa');
            res.render('crud/adminmesas', {users});
        }  else {
            res.redirect('/redirect');
        } 
    } catch (error) {
        res.render('401');
    }
});

/* Registro Mesas */
router.post('/adminmesas', isLoggedIn, async (req, res) => {
    const { sucursal_disponibles, referencia_mesa, cantidad_sillas_mesa, detalle_mesa, estado_mesa, responsable_gestion  } = req.body;
    console.log(req.body);
    const newUser = {        
        FKSUC_NCODIGO: sucursal_disponibles,
        MES_CREFERENCIA: referencia_mesa,
        MES_NCANTIDAD_SILLAS: cantidad_sillas_mesa,
        MES_CDETALLE: detalle_mesa,
        MES_CESTADO: estado_mesa,
        FKUSU_NCODIGO: responsable_gestion
    };
    console.log(newUser);
    await pool.query('INSERT INTO tbl_mesa set ?', [newUser]);
    req.flash('success', 'Mesa Registrada Correctamente!!!');
    res.redirect('/adminmesas');
})

/* Modificar Mesas */
router.post('/adminmesas/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;   
    const { referencia_mesa, cantidad_sillas_mesa, detalle_mesa, estado_mesa} = req.body;
    const responsable_gestion = req.user.PKUSU_NCODIGO;
    console.log(req.body);
    const newUser = {        
        MES_CREFERENCIA: referencia_mesa,
        MES_NCANTIDAD_SILLAS: cantidad_sillas_mesa,
        MES_CDETALLE: detalle_mesa,
        MES_CESTADO: estado_mesa,
        FKUSU_NCODIGO: responsable_gestion
    };
    await pool.query('UPDATE tbl_mesa set ? WHERE PKPRO_NCODIGO = ?', [newUser,[id]]);
    req.flash('success', 'Mesa Actualizada Correctamente!!!');
    res.redirect('/adminmesas');
});

// ---------------------------------

/* Pedidos */
router.get('/adminpedidos', isLoggedIn, async (req, res) => {
    try {
        if (req.user.USU_CROL == "Administrador" || req.user.USU_CROL == "Supervisor") {
            const users = await pool.query('SELECT * FROM tbl_pedido');
            res.render('crud/adminpedidos', {users});
        } else if (req.user.USU_CROL == "Cajero"){
            const users = await pool.query('SELECT * FROM tbl_pedido WHERE PED_CESTADO = "Pendiente" AND FKSUC_NCODIGO = ?', req.user.PKSUC_NCODIGO );
            res.render('crud/adminpedidos', {users});
        } else {
            res.redirect('/redirect');
        } 
    } catch (error) {
        res.render('401');
    }
});


/* Modificar Pedidos - Estado */
router.post('/adminpedidos/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;   
    const { numero_pedido, tipo_pago, monto_recibido, monto_cambio, estado_pedido} = req.body;
    const responsable_gestion = req.user.PKUSU_NCODIGO;
    console.log(req.body);
    if (estado_pedido == 'Pendiente'){
        req.flash('message', 'Por favor cambie el estado del pedido!!!');
        res.redirect('/adminpedidos');
    } else if (estado_pedido == 'Cancelado') {

        const newUserPedido = {        
            PED_CESTADO: estado_pedido,
            USU_NCODIGO_CAJERO: responsable_gestion
        };

        await pool.query('UPDATE tbl_pedido set ? WHERE PKPED_NCODIGO = ?', [newUserPedido,[id]]);        

        const newUserPago = {        
            FKPED_NCODIGO: numero_pedido,
            PAG_TIPO_PAGO: tipo_pago,
            PAG_NMONTO_RECIBIDO: monto_recibido,
            PAG_NMONTO_CAMBIO: monto_cambio,
            PAG_CESTADO: estado_pedido,
            FKUSU_NCODIGO: responsable_gestion
        };

        await pool.query('INSERT INTO tbl_pago set ?', [newUserPago]);
        req.flash('success', 'Pedido Actualizado Correctamente!!!');
        res.redirect('/adminpedidos');
    }
});

// ---------------------------------

// Funcion Fecha Actual
function GetFechaActual() {
    Mes = new Date().getMonth() + 1;
    if (Mes >= 1 && Mes < 10) {
        Mes = "0" + Mes.toString();
    }
    Dia = new Date().getDate();
    if (Dia >= 1 && Dia < 10) {
        Dia = "0" + Dia.toString();
    }
    var FechaActual = new Date().getFullYear() + "-" + Mes + "-" + Dia;
    return FechaActual;
}

/* Reporte Ventas */
router.get('/reporteventas', isLoggedIn, async (req, res) => {
    try {
        if (req.user.USU_CROL == "Administrador" || req.user.USU_CROL == "Supervisor") {
            const sql =  
                `SELECT 
                    pe.PKPED_NCODIGO AS PKPED_NCODIGO,
                    pe.FKUSU_NCODIGO AS FKUSU_NCODIGO,
                    us.USU_CUSUARIO AS USU_CUSUARIO,
                    us.USU_CNOMBRE_USUARIO AS USU_CNOMBRE_USUARIO,
                    us.USU_CROL AS USU_CROL,
                    pe.FKMES_NCODIGO AS FKMES_NCODIGO,
                    me.MES_CREFERENCIA AS MES_CREFERENCIA,
                    me.MES_CDETALLE AS MES_CDETALLE,
                    pe.FKSUC_NCODIGO AS FKSUC_NCODIGO,
                    su.SUC_CNOMBRE AS SUC_CNOMBRE,
                    su.SUC_CDIRECCION AS SUC_CDIRECCION,
                    pe.PED_NVALOR_TOTAL AS PED_NVALOR_TOTAL,
                    pe.PED_TFECHA_REGISTRO AS PED_TFECHA_REGISTRO,
                    pe.PED_CESTADO AS PED_CESTADO    
                FROM 
                    tbl_pedido pe
                JOIN
                    tbl_rusuarios us ON pe.FKUSU_NCODIGO = us.PKUSU_NCODIGO
                JOIN
                    tbl_mesa me ON pe.FKMES_NCODIGO = me.PKMES_NCODIGO
                JOIN
                    tbl_sucursal su ON pe.FKSUC_NCODIGO = su.PKSUC_NCODIGO`;                
            const users = await pool.query(sql);
            res.render('crud/reporteventas', { users });
        } else {
            res.redirect('/redirect');
        }
    } catch (error) {
        res.render('401');
    }
});

router.post('/reporteventas', isLoggedIn, async (req, res) => {
    try {
        if (req.user.USU_CROL == "Administrador" || req.user.USU_CROL == "Supervisor") {
            const fechaInicial = req.body.fechaInicial.split('/').join('-');
            const fechaFinal = req.body.fechaFinal.split('/').join('-');
            const select =  
                `SELECT 
                    pe.PKPED_NCODIGO AS PKPED_NCODIGO,
                    pe.FKUSU_NCODIGO AS FKUSU_NCODIGO,
                    us.USU_CUSUARIO AS USU_CUSUARIO,
                    us.USU_CNOMBRE_USUARIO AS USU_CNOMBRE_USUARIO,
                    us.USU_CROL AS USU_CROL,
                    pe.FKMES_NCODIGO AS FKMES_NCODIGO,
                    me.MES_CREFERENCIA AS MES_CREFERENCIA,
                    me.MES_CDETALLE AS MES_CDETALLE,
                    pe.FKSUC_NCODIGO AS FKSUC_NCODIGO,
                    su.SUC_CNOMBRE AS SUC_CNOMBRE,
                    su.SUC_CDIRECCION AS SUC_CDIRECCION,
                    pe.PED_NVALOR_TOTAL AS PED_NVALOR_TOTAL,
                    pe.PED_TFECHA_REGISTRO AS PED_TFECHA_REGISTRO,
                    pe.PED_CESTADO AS PED_CESTADO    
                FROM 
                    tbl_pedido pe
                JOIN
                    tbl_rusuarios us ON pe.FKUSU_NCODIGO = us.PKUSU_NCODIGO
                JOIN
                    tbl_mesa me ON pe.FKMES_NCODIGO = me.PKMES_NCODIGO
                JOIN
                    tbl_sucursal su ON pe.FKSUC_NCODIGO = su.PKSUC_NCODIGO`;  
            const limit = " WHERE PED_TFECHA_REGISTRO BETWEEN '" + fechaInicial + " 00:00:00'" + " AND '" + fechaFinal + " 23:59:59'" + "ORDER BY PKPED_NCODIGO DESC LIMIT 3000" + ";";
            const sql = select + limit;
            const consulta = await pool.query(sql);
            res.json(consulta);
        } else {
            res.redirect('/redirect');
        }
    } catch (error) {
        res.render('401');
    }
});

module.exports = router;