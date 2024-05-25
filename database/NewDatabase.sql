-- Crear Base de Datos

create database dbp_dis_algoritmos;

-- alter table xxxxxx AUTO_INCREMENT=0;

use dbp_dis_algoritmos;


-- Tabla Usuario
CREATE TABLE tbl_rusuarios (
    PKUSU_NCODIGO INT AUTO_INCREMENT PRIMARY KEY,
    USU_CNOMBRE_USUARIO VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    USU_CUSUARIO VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    USU_CPASSWORD VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    USU_CROL VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    PKSUC_NCODIGO INT NOT NULL,
    USU_TFECHA_REGISTRO TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    USU_TFECHA_MODIFICACION TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    USU_CESTADO VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    FKUSU_NCODIGO INT NOT NULL,
);

-- Contraseña
-- '$2a$10$IUqDWs.wv2vRazB7lrEHvurBr4FPJNGhUb3oEkGgWzPY4t9kVSOi6'

-- Tabla Sucursal
CREATE TABLE tbl_sucursal (
    PKSUC_NCODIGO INT AUTO_INCREMENT PRIMARY KEY,
    SUC_CNOMBRE VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    SUC_CDIRECCION VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    SUC_CDETALLE_CONTACTO VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    SUC_TFECHA_REGISTRO TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    SUC_TFECHA_MODIFICACION TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    SUC_CESTADO VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    FKUSU_NCODIGO INT NOT NULL,
    FOREIGN KEY (FKUSU_NCODIGO) REFERENCES tbl_rusuarios(PKUSU_NCODIGO)
);

-- Tabla Producto
CREATE TABLE tbl_producto (
    PKPRO_NCODIGO INT AUTO_INCREMENT PRIMARY KEY,
    PRO_CNOMBRE VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    PRO_NCANTIDAD_DISPONIBLE INT NOT NULL,
    PRO_NPRECIO_UNITARIO DECIMAL(10,2) NOT NULL,
    PRO_TFECHA_REGISTRO TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRO_TFECHA_MODIFICACION TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRO_CESTADO VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    FKUSU_NCODIGO INT NOT NULL,
    FOREIGN KEY (FKUSU_NCODIGO) REFERENCES tbl_rusuarios(PKUSU_NCODIGO)
);

-- Tabla Mesa
CREATE TABLE tbl_mesa (
    PKMES_NCODIGO INT AUTO_INCREMENT PRIMARY KEY,
    FKSUC_NCODIGO INT NOT NULL,
    MES_CREFERENCIA VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    MES_NCANTIDAD_SILLAS INT NOT NULL,
    MES_CDETALLE VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    MES_TFECHA_REGISTRO TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    MES_TFECHA_MODIFICACION TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    MES_CESTADO VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    FKUSU_NCODIGO INT NOT NULL,
    FOREIGN KEY (FKUSU_NCODIGO) REFERENCES tbl_rusuarios(PKUSU_NCODIGO),
    FOREIGN KEY (FKSUC_NCODIGO) REFERENCES tbl_sucursal(PKSUC_NCODIGO)
);

-- Tabla Pedido
CREATE TABLE tbl_pedido (
    PKPED_NCODIGO INT AUTO_INCREMENT PRIMARY KEY,
    FKUSU_NCODIGO INT NOT NULL,
    FKMES_NCODIGO INT NOT NULL,
    FKSUC_NCODIGO INT NOT NULL,
    PED_NVALOR_TOTAL DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    PED_TFECHA_REGISTRO TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PED_TFECHA_MODIFICACION TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PED_CESTADO VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULl,
    USU_NCODIGO_CAJERO INT DEFAULT NULL,
    FOREIGN KEY (FKUSU_NCODIGO) REFERENCES tbl_rusuarios(PKUSU_NCODIGO),
    FOREIGN KEY (FKMES_NCODIGO) REFERENCES tbl_mesa(PKMES_NCODIGO),
    FOREIGN KEY (FKSUC_NCODIGO) REFERENCES tbl_sucursal(PKSUC_NCODIGO),
    FOREIGN KEY (USU_NCODIGO_CAJERO) REFERENCES tbl_rusuarios(PKUSU_NCODIGO)
);

-- Tabla Detalle_pedido
CREATE TABLE tbl_detalle_pedido (
    PKDET_NCODIGO INT AUTO_INCREMENT PRIMARY KEY,
    FKPED_NCODIGO INT NOT NULL,
    FKPRO_NCODIGO INT NOT NULL,
    DET_NCANNTIDAD INT NOT NULL,
    DET_CMONTO_TOTAL DECIMAL(10,2) DEFAULT NULL,
    DET_TFECHA_REGISTRO TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    DET_TFECHA_MODIFICACION TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    DET_CESTADO VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULl,
    FOREIGN KEY (FKPED_NCODIGO) REFERENCES tbl_pedido(PKPED_NCODIGO),
    FOREIGN KEY (FKPRO_NCODIGO) REFERENCES tbl_producto(PKPRO_NCODIGO)
);

-- Tabla Pago
CREATE TABLE tbl_pago (
    PKPAG_NCODIGO INT AUTO_INCREMENT PRIMARY KEY,
    FKPED_NCODIGO INT NOT NULL,
    PAG_TIPO_PAGO VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    PAG_NMONTO_RECIBIDO DECIMAL(10,2) NOT NULL,
    PAG_NMONTO_CAMBIO DECIMAL(10,2),
    PAG_TFECHA_REGISTRO TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PAG_TFECHA_MODIFICACION TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PAG_CESTADO VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULl,
    FKUSU_NCODIGO INT NOT NULL,
    FOREIGN KEY (FKUSU_NCODIGO) REFERENCES tbl_rusuarios(PKUSU_NCODIGO),
    FOREIGN KEY (FKPED_NCODIGO) REFERENCES tbl_pedido(PKPED_NCODIGO)
);


-- INSERT para Sucursales
INSERT INTO tbl_sucursal (SUC_CNOMBRE, SUC_CDIRECCION, SUC_CDETALLE_CONTACTO)
VALUES 
    ('Barrio Chapinero', 'Calle 62 #15-23', 'Tel: 123-456-7890, Email: chapinero@bar.com'),
    ('Barrio Usaquén', 'Carrera 7 #120-34', 'Tel: 987-654-3210, Email: usaquen@bar.com'),
    ('Barrio La Candelaria', 'Carrera 2 #15-45', 'Tel: 555-123-4567, Email: candelaria@bar.com'),
    ('Barrio Zona T', 'Carrera 14 #85-32', 'Tel: 777-888-9999, Email: zonat@bar.com'),
    ('Barrio La Macarena', 'Carrera 4 #26A-10', 'Tel: 333-444-5555, Email: macarena@bar.com');

-- INSERT para Productos
INSERT INTO tbl_producto (PRO_CNOMBRE, PRO_NCANTIDAD_DISPONIBLE, PRO_NPRECIO_UNITARIO)
VALUES 
    ('Cerveza', 100, 5000.00),
    ('Vino tinto', 50, 35000.00),
    ('Vino blanco', 30, 32000.00),
    ('Whisky', 20, 80000.00),
    ('Ron', 30, 20000.00),
    ('Vodka', 25, 25000.00),
    ('Tequila', 20, 30000.00),
    ('Ginebra', 20, 35000.00),
    ('Jugo natural', 50, 6000.00),
    ('Refresco', 60, 4000.00),
    ('Agua mineral', 70, 3000.00),
    ('Cerveza artesanal', 40, 10000.00),
    ('Cóctel Margarita', 30, 15000.00),
    ('Cóctel Mojito', 35, 16000.00),
    ('Cóctel Piña Colada', 30, 17000.00),
    ('Cóctel Caipirinha', 25, 18000.00),
    ('Plato de papas fritas', 40, 12000.00),
    ('Alitas de pollo', 30, 18000.00),
    ('Nachos con queso', 25, 15000.00);

-- INSERT para Mesas en la Sucursal 1
INSERT INTO tbl_mesa (MES_CREFERENCIA, MES_NCANTIDAD_SILLAS, MES_CDETALLE, FKSUC_NCODIGO)
VALUES 
    ('Mesa 1', 4, 'Cerca de la ventana', 1),
    ('Mesa 2', 4, 'En el centro del salón', 1),
    ('Mesa 3', 6, 'En la esquina', 1),
    ('Mesa 4', 2, 'Frente a la barra', 1),
    ('Mesa 5', 8, 'En el área de fumadores', 1);

-- INSERT para Mesas en la Sucursal 2
INSERT INTO tbl_mesa (MES_CREFERENCIA, MES_NCANTIDAD_SILLAS, MES_CDETALLE, FKSUC_NCODIGO)
VALUES 
    ('Mesa 1', 6, 'Cerca de la ventana', 2),
    ('Mesa 2', 4, 'En el centro del salón', 2),
    ('Mesa 3', 8, 'En la esquina', 2),
    ('Mesa 4', 2, 'Frente a la barra', 2),
    ('Mesa 5', 4, 'En el área de fumadores', 2);

-- INSERT para Mesas en la Sucursal 3
INSERT INTO tbl_mesa (MES_CREFERENCIA, MES_NCANTIDAD_SILLAS, MES_CDETALLE, FKSUC_NCODIGO)
VALUES 
    ('Mesa 1', 4, 'Cerca de la ventana', 3),
    ('Mesa 2', 6, 'En el centro del salón', 3),
    ('Mesa 3', 8, 'En la esquina', 3),
    ('Mesa 4', 2, 'Frente a la barra', 3),
    ('Mesa 5', 4, 'En el área de fumadores', 3);

-- INSERT para Mesas en la Sucursal 4
INSERT INTO tbl_mesa (MES_CREFERENCIA, MES_NCANTIDAD_SILLAS, MES_CDETALLE, FKSUC_NCODIGO)
VALUES 
    ('Mesa 1', 8, 'Cerca de la ventana', 4),
    ('Mesa 2', 4, 'En el centro del salón', 4),
    ('Mesa 3', 6, 'En la esquina', 4),
    ('Mesa 4', 2, 'Frente a la barra', 4),
    ('Mesa 5', 4, 'En el área de fumadores', 4);

-- INSERT para Mesas en la Sucursal 5
INSERT INTO tbl_mesa (MES_CREFERENCIA, MES_NCANTIDAD_SILLAS, MES_CDETALLE, FKSUC_NCODIGO)
VALUES 
    ('Mesa 1', 6, 'Cerca de la ventana', 5),
    ('Mesa 2', 4, 'En el centro del salón', 5),
    ('Mesa 3', 8, 'En la esquina', 5),
    ('Mesa 4', 2, 'Frente a la barra', 5),
    ('Mesa 5', 4, 'En el área de fumadores', 5);

-- Trigger Productos
DELIMITER //
CREATE TRIGGER trg_actualizar_estado_producto
BEFORE UPDATE ON tbl_producto
FOR EACH ROW
BEGIN
    IF NEW.PRO_NCANTIDAD_DISPONIBLE = 0 THEN
        SET NEW.PRO_CESTADO = 'Inactivo';
    ELSE
        SET NEW.PRO_CESTADO = 'Activo';
    END IF;
END;
//
DELIMITER ;

-- Trigger Pedidos
DELIMITER //
CREATE TRIGGER trg_actualizar_estado_mesa_pedido
BEFORE INSERT ON tbl_pedido
FOR EACH ROW
BEGIN
    -- Si se inserta un nuevo pedido y su estado es Pendiente, reservar la mesa
    IF NEW.PED_CESTADO = 'Pendiente' THEN
        UPDATE tbl_mesa
        SET MES_CESTADO = 'Ocupada'
        WHERE PKMES_NCODIGO = NEW.FKMES_NCODIGO;
    END IF;
END;
//

-- Trigger Mesas
CREATE TRIGGER trg_cancelar_reserva_mesa
BEFORE UPDATE ON tbl_pedido
FOR EACH ROW
BEGIN
    -- Si el pedido pasa de Pendiente a Cancelado, liberar la mesa
    IF NEW.PED_CESTADO = 'Cancelado' AND IFNULL(OLD.PED_CESTADO, '') = 'Pendiente' THEN
        UPDATE tbl_mesa
        SET MES_CESTADO = 'Disponible'
        WHERE PKMES_NCODIGO = NEW.FKMES_NCODIGO;
    END IF;
END;

CREATE TRIGGER trg_cancelar_reserva_mesa
BEFORE UPDATE ON tbl_pedido
FOR EACH ROW
BEGIN
    -- Si el pedido pasa de Pendiente a Cancelado, liberar la mesa
    IF NEW.PED_CESTADO = 'Cancelado' AND IFNULL(OLD.PED_CESTADO, '') = 'Pendiente' THEN
        UPDATE tbl_mesa
        SET MES_CESTADO = 'Disponible'
        WHERE PKMES_NCODIGO = NEW.FKMES_NCODIGO;
    END IF;

    -- Si el pedido pasa de Cancelado a Pendiente, reservar nuevamente la mesa
    IF NEW.PED_CESTADO = 'Pendiente' AND IFNULL(OLD.PED_CESTADO, '') = 'Cancelado' THEN
        UPDATE tbl_mesa
        SET MES_CESTADO = 'Ocupada'
        WHERE PKMES_NCODIGO = NEW.FKMES_NCODIGO;
    END IF;
END;

//

DELIMITER ;

-- Triger Detalle Pedido - Producto
DELIMITER //

CREATE TRIGGER trg_actualizar_inventario_y_valor_total
AFTER INSERT ON tbl_detalle_pedido
FOR EACH ROW
BEGIN
    -- Actualizar inventario del producto
    UPDATE tbl_producto
    SET PRO_NCANTIDAD_DISPONIBLE = PRO_NCANTIDAD_DISPONIBLE - NEW.DET_NCANNTIDAD
    WHERE PKPRO_NCODIGO = NEW.FKPRO_NCODIGO;

    -- Actualizar el valor total del pedido en la tabla tbl_pedido
    UPDATE tbl_pedido
    SET PED_NVALOR_TOTAL = (SELECT SUM(DET_CMONTO_TOTAL)
                            FROM tbl_detalle_pedido
                            WHERE FKPED_NCODIGO = NEW.FKPED_NCODIGO)
    WHERE PKPED_NCODIGO = NEW.FKPED_NCODIGO;
END;
//

DELIMITER ;

--

DELIMITER //
CREATE TRIGGER trg_actualizar_inventario_y_valor_total_update
AFTER UPDATE ON tbl_detalle_pedido
FOR EACH ROW
BEGIN
    -- Actualizar inventario del producto
    UPDATE tbl_producto
    SET PRO_NCANTIDAD_DISPONIBLE = PRO_NCANTIDAD_DISPONIBLE - (NEW.DET_NCANNTIDAD - OLD.DET_NCANNTIDAD)
    WHERE PKPRO_NCODIGO = NEW.FKPRO_NCODIGO;

    -- Actualizar el valor total del pedido en la tabla tbl_pedido
    UPDATE tbl_pedido
    SET PED_NVALOR_TOTAL = (SELECT SUM(DET_CMONTO_TOTAL)
                            FROM tbl_detalle_pedido
                            WHERE FKPED_NCODIGO = NEW.FKPED_NCODIGO)
    WHERE PKPED_NCODIGO = NEW.FKPED_NCODIGO;
END;
//
DELIMITER ;


-- ALTER TABLE tbl_rusuarios ADD COLUMN FKUSU_NCODIGO INT;
-- ALTER TABLE tbl_producto ADD COLUMN FKUSU_NCODIGO INT;
-- ALTER TABLE tbl_sucursal ADD COLUMN FKUSU_NCODIGO INT;
-- ALTER TABLE tbl_mesa ADD COLUMN FKUSU_NCODIGO INT;
-- ALTER TABLE tbl_pedido ADD COLUMN USU_NCODIGO_CAJERO INT;
-- ALTER TABLE tbl_pago ADD COLUMN FKUSU_NCODIGO INT;