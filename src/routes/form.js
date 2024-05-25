const router = require('express').Router();
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

/* Lista de Productos */
router.get('/drinkiverse', isNotLoggedIn, async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM tbl_producto WHERE PRO_CESTADO = "Activo"');
    res.render('crud/listaproductos', { users });
  } catch (error) {
    res.render('401');
  }
});

router.post('/listarproductos', async (req, res) => {
  try {
    const consulta = await pool.query('SELECT * FROM tbl_producto');
    // console.log(consulta)
    res.json(consulta)
  } catch (error) {
    console.log('Error')
  }
});

router.post('/consultasucursales', async (req, res) => {
  try {    
      const sql = "SELECT * FROM tbl_sucursal WHERE SUC_CESTADO = 'Activo';"
      // console.log(sql);
      const consulta = await pool.query(sql);
      // console.log(consulta)
      res.json(consulta)
  } catch (error) {
    console.log('Error')
  }
});

router.post('/consultamesas', async (req, res) => {
  try {    
      let {sucursal} = req.body
      console.log('sucursal:', sucursal)
      const sql = "SELECT * FROM tbl_mesa WHERE FKSUC_NCODIGO = ?;"
      // console.log(sql);
      const consulta = await pool.query(sql, sucursal);
      // console.log(consulta)
      res.json(consulta)
  } catch (error) {
    console.log('Error')
  }
});


/* Pedidos */
router.get('/crearpedido', isLoggedIn, async (req, res) => {
  try {
    if (req.user.USU_CROL == "Administrador" || req.user.USU_CROL == "Supervisor" || req.user.USU_CROL == "Mesero") {
      const users = await pool.query('SELECT * FROM tbl_producto');
      res.render('auth/form', { users });
    } else {
      res.redirect('/redirect');
    }
  } catch (error) {
    res.render('401');
  }
});

/* Registro Pedido */
router.post('/crearpedido', async (req, res) => {
  const productos = JSON.parse(JSON.stringify(req.body)); 
  console.log(productos)
  console.log(productos.mesa_disponible)

  try {
    // Insertar el pedido en tbl_pedido
    const resultPedido = await pool.query('INSERT INTO tbl_pedido (FKUSU_NCODIGO, FKMES_NCODIGO, FKSUC_NCODIGO, PED_CESTADO) VALUES (?, ?, ?, ?)', [req.user.PKUSU_NCODIGO, productos.mesa_disponible, req.user.PKSUC_NCODIGO, 'Pendiente']);
    const pedidoId = resultPedido.insertId;

    console.log("Pedido insertado correctamente en tbl_pedido");

    // Calcular y insertar detalles del pedido
    const detallesPromises = [];
    for (const key in productos) {
      if (productos.hasOwnProperty(key) && key.includes('producto')) {
        const numProducto = key.split('producto')[1]; // Obtener el número del producto
        const cantidad = productos[`cantidad${numProducto}`];
        const productoId = productos[key];

        // Obtener el precio unitario del producto
        const productoInfo = await pool.query('SELECT PRO_NPRECIO_UNITARIO FROM tbl_producto WHERE PKPRO_NCODIGO = ?', [productoId]);
        const precioUnitario = productoInfo[0].PRO_NPRECIO_UNITARIO;

        // Calcular el total
        const total = precioUnitario * cantidad;

        // Insertar en tbl_detalle_pedido
        const detalleResult = await pool.query('INSERT INTO tbl_detalle_pedido (FKPED_NCODIGO, FKPRO_NCODIGO, DET_NCANNTIDAD, DET_CESTADO, DET_CMONTO_TOTAL) VALUES (?, ?, ?, ?, ?)', [pedidoId, productoId, cantidad, 'Activo', total]);
        detallesPromises.push(detalleResult);
      }
    }

    // Esperar todas las inserciones de detalle_pedido
    await Promise.all(detallesPromises);

    console.log("Productos insertados correctamente en tbl_detalle_pedido");

    req.flash('success', 'Pedido No.' + pedidoId + ' creado correctamente!!!');
    res.redirect('/crearpedido');
  } catch (error) {
    console.error("Error al procesar el pedido:", error);
    req.flash('message', 'Error al crear el pedido!!!');
    res.redirect('/crearpedido');
  }
});


module.exports = router;