-- BASE DE DATOS PARA PROPIEDAD HORIZONTAL
-- Sistema completo de administración de conjuntos residenciales

-- =====================================================
-- TABLAS PRINCIPALES
-- =====================================================

-- Tabla de edificios/torres
CREATE TABLE edificios (
    id_edificio INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    codigo_postal VARCHAR(10),
    telefono VARCHAR(20),
    email VARCHAR(100),
    nit VARCHAR(20),
    total_unidades INT NOT NULL,
    fecha_construccion DATE,
    administrador VARCHAR(100),
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de tipos de unidad
CREATE TABLE tipos_unidad (
    id_tipo INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL, -- apartamento, local comercial, parqueadero, depósito
    descripcion TEXT,
    coeficiente_participacion DECIMAL(5,4) DEFAULT 0.0000
);

-- Tabla de unidades residenciales
CREATE TABLE unidades (
    id_unidad INT PRIMARY KEY AUTO_INCREMENT,
    id_edificio INT NOT NULL,
    id_tipo INT NOT NULL,
    numero_unidad VARCHAR(20) NOT NULL,
    piso INT,
    torre VARCHAR(10),
    area_privada DECIMAL(8,2), -- en metros cuadrados
    area_construida DECIMAL(8,2),
    coeficiente DECIMAL(8,6) NOT NULL, -- coeficiente de participación
    valor_catastral DECIMAL(15,2),
    habitaciones INT DEFAULT 0,
    banos INT DEFAULT 0,
    parqueaderos INT DEFAULT 0,
    deposito BOOLEAN DEFAULT FALSE,
    estado ENUM('ocupada', 'disponible', 'en_mantenimiento') DEFAULT 'disponible',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_edificio) REFERENCES edificios(id_edificio),
    FOREIGN KEY (id_tipo) REFERENCES tipos_unidad(id_tipo),
    UNIQUE KEY unique_unidad (id_edificio, numero_unidad)
);

-- Tabla de propietarios
CREATE TABLE propietarios (
    id_propietario INT PRIMARY KEY AUTO_INCREMENT,
    tipo_documento ENUM('CC', 'CE', 'NIT', 'Pasaporte') NOT NULL,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100),
    razon_social VARCHAR(150), -- para personas jurídicas
    tipo_persona ENUM('natural', 'juridica') NOT NULL,
    telefono VARCHAR(20),
    celular VARCHAR(20),
    email VARCHAR(100),
    direccion_correspondencia VARCHAR(200),
    ciudad_correspondencia VARCHAR(100),
    fecha_nacimiento DATE,
    profesion VARCHAR(100),
    estado_civil ENUM('soltero', 'casado', 'divorciado', 'viudo', 'union_libre'),
    contacto_emergencia VARCHAR(100),
    telefono_emergencia VARCHAR(20),
    observaciones TEXT,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de residentes (pueden ser diferentes a propietarios)
CREATE TABLE residentes (
    id_residente INT PRIMARY KEY AUTO_INCREMENT,
    id_unidad INT NOT NULL,
    tipo_documento ENUM('CC', 'CE', 'TI', 'Pasaporte') NOT NULL,
    numero_documento VARCHAR(20) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    parentesco VARCHAR(50), -- propietario, arrendatario, familiar, etc.
    telefono VARCHAR(20),
    celular VARCHAR(20),
    email VARCHAR(100),
    fecha_nacimiento DATE,
    fecha_ingreso DATE NOT NULL,
    fecha_salida DATE,
    es_responsable BOOLEAN DEFAULT FALSE, -- responsable de la unidad
    autorizado_recibir_correspondencia BOOLEAN DEFAULT FALSE,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad),
    INDEX idx_documento (numero_documento),
    INDEX idx_unidad_activos (id_unidad, estado)
);

-- Tabla de relación propietario-unidad
CREATE TABLE propietarios_unidades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_propietario INT NOT NULL,
    id_unidad INT NOT NULL,
    porcentaje_propiedad DECIMAL(5,2) DEFAULT 100.00,
    fecha_compra DATE NOT NULL,
    fecha_venta DATE,
    valor_compra DECIMAL(15,2),
    valor_venta DECIMAL(15,2),
    escritura_publica VARCHAR(100),
    notaria VARCHAR(100),
    estado ENUM('activo', 'vendido', 'embargado') DEFAULT 'activo',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_propietario) REFERENCES propietarios(id_propietario),
    FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad),
    INDEX idx_propietario_activo (id_propietario, estado),
    INDEX idx_unidad_activa (id_unidad, estado)
);

-- =====================================================
-- ADMINISTRACIÓN Y FINANZAS
-- =====================================================

-- Tabla de conceptos de cobro
CREATE TABLE conceptos_cobro (
    id_concepto INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo ENUM('fijo', 'variable', 'extraordinario') NOT NULL,
    categoria ENUM('administracion', 'servicios', 'mantenimiento', 'seguridad', 'otros') NOT NULL,
    valor_base DECIMAL(12,2) DEFAULT 0.00,
    aplicar_coeficiente BOOLEAN DEFAULT TRUE,
    obligatorio BOOLEAN DEFAULT TRUE,
    periodicidad ENUM('mensual', 'bimestral', 'trimestral', 'semestral', 'anual', 'unico') DEFAULT 'mensual',
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de cuotas mensuales
CREATE TABLE cuotas (
    id_cuota INT PRIMARY KEY AUTO_INCREMENT,
    id_unidad INT NOT NULL,
    id_concepto INT NOT NULL,
    periodo VARCHAR(7) NOT NULL, -- formato YYYY-MM
    valor_cuota DECIMAL(12,2) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    valor_pagado DECIMAL(12,2) DEFAULT 0.00,
    saldo_pendiente DECIMAL(12,2) NOT NULL,
    interes_mora DECIMAL(12,2) DEFAULT 0.00,
    estado ENUM('pendiente', 'pagado', 'vencido', 'anulado') DEFAULT 'pendiente',
    fecha_pago DATE,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad),
    FOREIGN KEY (id_concepto) REFERENCES conceptos_cobro(id_concepto),
    INDEX idx_unidad_periodo (id_unidad, periodo),
    INDEX idx_estado_vencimiento (estado, fecha_vencimiento)
);

-- Tabla de pagos
CREATE TABLE pagos (
    id_pago INT PRIMARY KEY AUTO_INCREMENT,
    id_unidad INT NOT NULL,
    numero_recibo VARCHAR(20) NOT NULL UNIQUE,
    fecha_pago DATE NOT NULL,
    valor_total DECIMAL(12,2) NOT NULL,
    metodo_pago ENUM('efectivo', 'cheque', 'transferencia', 'consignacion', 'tarjeta') NOT NULL,
    referencia_pago VARCHAR(100), -- número de cheque, referencia transferencia, etc.
    banco VARCHAR(100),
    observaciones TEXT,
    recibido_por VARCHAR(100),
    estado ENUM('activo', 'anulado') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad),
    INDEX idx_fecha_pago (fecha_pago),
    INDEX idx_unidad_fecha (id_unidad, fecha_pago)
);

-- Tabla de detalle de pagos
CREATE TABLE detalle_pagos (
    id_detalle INT PRIMARY KEY AUTO_INCREMENT,
    id_pago INT NOT NULL,
    id_cuota INT NOT NULL,
    valor_aplicado DECIMAL(12,2) NOT NULL,
    tipo_aplicacion ENUM('capital', 'interes', 'mora') DEFAULT 'capital',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_pago) REFERENCES pagos(id_pago) ON DELETE CASCADE,
    FOREIGN KEY (id_cuota) REFERENCES cuotas(id_cuota)
);

-- =====================================================
-- CORRESPONDENCIA Y COMUNICACIONES
-- =====================================================

-- Tabla de correspondencia
CREATE TABLE correspondencia (
    id_correspondencia INT PRIMARY KEY AUTO_INCREMENT,
    id_unidad INT,
    tipo_correspondencia ENUM('carta', 'paquete', 'documento', 'revista', 'factura', 'otros') NOT NULL,
    remitente VARCHAR(200) NOT NULL,
    destinatario VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha_llegada DATETIME NOT NULL,
    entregado_por VARCHAR(100),
    fecha_entrega DATETIME,
    recibido_por VARCHAR(100),
    numero_identificacion_receptor VARCHAR(20),
    observaciones TEXT,
    estado ENUM('pendiente', 'entregado', 'devuelto') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad),
    INDEX idx_estado_fecha (estado, fecha_llegada),
    INDEX idx_unidad_pendiente (id_unidad, estado)
);

-- Tabla de comunicados
CREATE TABLE comunicados (
    id_comunicado INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL,
    tipo ENUM('informativo', 'urgente', 'mantenimiento', 'asamblea', 'financiero') NOT NULL,
    dirigido_a ENUM('todos', 'propietarios', 'residentes', 'morosos', 'especifico') NOT NULL,
    fecha_publicacion DATE NOT NULL,
    fecha_vencimiento DATE,
    archivo_adjunto VARCHAR(255),
    publicado_por VARCHAR(100) NOT NULL,
    requiere_confirmacion BOOLEAN DEFAULT FALSE,
    estado ENUM('borrador', 'publicado', 'archivado') DEFAULT 'borrador',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- VISITANTES Y SEGURIDAD
-- =====================================================

-- Tabla de visitantes
CREATE TABLE visitantes (
    id_visita INT PRIMARY KEY AUTO_INCREMENT,
    id_unidad INT NOT NULL,
    nombre_visitante VARCHAR(100) NOT NULL,
    documento_visitante VARCHAR(20) NOT NULL,
    telefono_visitante VARCHAR(20),
    motivo_visita VARCHAR(200),
    fecha_ingreso DATETIME NOT NULL,
    fecha_salida DATETIME,
    autorizado_por VARCHAR(100),
    vigilante_ingreso VARCHAR(100),
    vigilante_salida VARCHAR(100),
    vehiculo_placa VARCHAR(10),
    vehiculo_tipo VARCHAR(50),
    observaciones TEXT,
    estado ENUM('dentro', 'salio', 'no_autorizado') DEFAULT 'dentro',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad),
    INDEX idx_fecha_ingreso (fecha_ingreso),
    INDEX idx_documento (documento_visitante),
    INDEX idx_estado_fecha (estado, fecha_ingreso)
);

-- Tabla de vehículos de residentes
CREATE TABLE vehiculos (
    id_vehiculo INT PRIMARY KEY AUTO_INCREMENT,
    id_unidad INT NOT NULL,
    placa VARCHAR(10) NOT NULL UNIQUE,
    tipo_vehiculo ENUM('carro', 'moto', 'bicicleta', 'otros') NOT NULL,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    color VARCHAR(30),
    año_modelo YEAR,
    propietario_vehiculo VARCHAR(100),
    documento_propietario VARCHAR(20),
    numero_parqueadero VARCHAR(20),
    fecha_registro DATE NOT NULL,
    fecha_retiro DATE,
    observaciones TEXT,
    estado ENUM('activo', 'inactivo', 'temporal') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad),
    INDEX idx_placa (placa),
    INDEX idx_unidad_activo (id_unidad, estado)
);

-- =====================================================
-- MANTENIMIENTO Y SERVICIOS
-- =====================================================

-- Tabla de áreas comunes - prioritario
CREATE TABLE areas_comunes (
    id_area INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    capacidad_personas INT,
    ubicacion VARCHAR(100),
    requiere_reserva BOOLEAN DEFAULT FALSE,
    costo_reserva DECIMAL(10,2) DEFAULT 0.00,
    horario_disponible VARCHAR(200),
    responsable_mantenimiento VARCHAR(100),
    estado ENUM('disponible', 'mantenimiento', 'fuera_servicio') DEFAULT 'disponible',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de reservas de áreas comunes - prioritario
CREATE TABLE reservas (
    id_reserva INT PRIMARY KEY AUTO_INCREMENT,
    id_area INT NOT NULL,
    id_unidad INT NOT NULL,
    fecha_reserva DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    solicitante VARCHAR(100) NOT NULL,
    telefono_solicitante VARCHAR(20),
    numero_personas INT,
    evento_descripcion VARCHAR(200),
    valor_reserva DECIMAL(10,2) DEFAULT 0.00,
    valor_pagado DECIMAL(10,2) DEFAULT 0.00,
    fecha_solicitud DATETIME NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada', 'utilizada') DEFAULT 'pendiente',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_area) REFERENCES areas_comunes(id_area),
    FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad),
    INDEX idx_area_fecha (id_area, fecha_reserva),
    INDEX idx_unidad_fecha (id_unidad, fecha_reserva)
);

-- Tabla de solicitudes de mantenimiento
CREATE TABLE solicitudes_mantenimiento (
    id_solicitud INT PRIMARY KEY AUTO_INCREMENT,
    id_unidad INT,
    id_area INT,
    tipo_solicitud ENUM('plomeria', 'electricidad', 'pintura', 'jardineria', 'limpieza', 'otros') NOT NULL,
    descripcion TEXT NOT NULL,
    prioridad ENUM('baja', 'media', 'alta', 'urgente') DEFAULT 'media',
    fecha_solicitud DATETIME NOT NULL,
    solicitante VARCHAR(100) NOT NULL,
    telefono_contacto VARCHAR(20),
    fecha_programada DATE,
    fecha_ejecutada DATE,
    tecnico_asignado VARCHAR(100),
    costo_estimado DECIMAL(10,2),
    costo_real DECIMAL(10,2),
    observaciones_tecnico TEXT,
    estado ENUM('pendiente', 'programada', 'en_proceso', 'completada', 'cancelada') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad),
    FOREIGN KEY (id_area) REFERENCES areas_comunes(id_area),
    INDEX idx_estado_prioridad (estado, prioridad),
    INDEX idx_fecha_solicitud (fecha_solicitud)
);

-- =====================================================
-- PROVEEDORES Y EMPLEADOS
-- =====================================================

-- Tabla de proveedores
CREATE TABLE proveedores (
    id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
    nit VARCHAR(20) NOT NULL UNIQUE,
    razon_social VARCHAR(150) NOT NULL,
    nombre_comercial VARCHAR(150),
    telefono VARCHAR(20),
    celular VARCHAR(20),
    email VARCHAR(100),
    direccion VARCHAR(200),
    ciudad VARCHAR(100),
    contacto_principal VARCHAR(100),
    tipo_servicio VARCHAR(100), -- electricidad, plomería, jardinería, etc.
    calificacion DECIMAL(3,2), -- de 1.00 a 5.00
    observaciones TEXT,
    estado ENUM('activo', 'inactivo', 'bloqueado') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de empleados
CREATE TABLE empleados (
    id_empleado INT PRIMARY KEY AUTO_INCREMENT,
    tipo_documento ENUM('CC', 'CE', 'TI') NOT NULL,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    celular VARCHAR(20),
    email VARCHAR(100),
    direccion VARCHAR(200),
    fecha_ingreso DATE NOT NULL,
    fecha_retiro DATE,
    salario DECIMAL(12,2),
    horario_trabajo VARCHAR(200),
    contacto_emergencia VARCHAR(100),
    telefono_emergencia VARCHAR(20),
    observaciones TEXT,
    estado ENUM('activo', 'retirado', 'suspendido') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- CONFIGURACIÓN Y PARÁMETROS
-- =====================================================

-- Tabla de configuración del sistema
CREATE TABLE configuracion (
    id_config INT PRIMARY KEY AUTO_INCREMENT,
    parametro VARCHAR(100) NOT NULL UNIQUE,
    valor VARCHAR(500) NOT NULL,
    descripcion TEXT,
    tipo_dato ENUM('texto', 'numero', 'fecha', 'booleano') DEFAULT 'texto',
    categoria VARCHAR(50),
    modificado_por VARCHAR(100),
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- MÓDULO DE FONDOS DE IMPREVISTOS
-- Gestión completa de reservas y fondos especiales
-- =====================================================

-- Tabla de tipos de fondos
CREATE TABLE tipos_fondos (
    id_tipo_fondo INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    obligatorio BOOLEAN DEFAULT TRUE, -- Si es obligatorio por ley
    porcentaje_minimo DECIMAL(5,2) DEFAULT 0.00, -- % mínimo del presupuesto
    porcentaje_maximo DECIMAL(5,2) DEFAULT 100.00, -- % máximo del presupuesto
    categoria ENUM('legal', 'voluntario', 'especial') DEFAULT 'legal',
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla principal de fondos
CREATE TABLE fondos (
    id_fondo INT PRIMARY KEY AUTO_INCREMENT,
    id_edificio INT NOT NULL,
    id_tipo_fondo INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    meta_minima DECIMAL(15,2) NOT NULL DEFAULT 0.00, -- Meta mínima a alcanzar
    meta_optimao DECIMAL(15,2) DEFAULT 0.00, -- Meta ideal del fondo
    saldo_actual DECIMAL(15,2) DEFAULT 0.00, -- Saldo actual
    porcentaje_aporte DECIMAL(5,2) NOT NULL, -- % que se cobra mensualmente
    fecha_creacion DATE NOT NULL,
    fecha_meta DATE, -- Fecha para alcanzar la meta
    estado ENUM('activo', 'suspendido', 'cerrado') DEFAULT 'activo',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_edificio) REFERENCES edificios(id_edificio),
    FOREIGN KEY (id_tipo_fondo) REFERENCES tipos_fondos(id_tipo_fondo),
    INDEX idx_edificio_estado (id_edificio, estado)
);

-- Tabla de aportes a fondos (lo que cada unidad debe pagar)
CREATE TABLE aportes_fondos (
    id_aporte INT PRIMARY KEY AUTO_INCREMENT,
    id_fondo INT NOT NULL,
    id_unidad INT NOT NULL,
    periodo VARCHAR(7) NOT NULL, -- formato YYYY-MM
    valor_aporte DECIMAL(12,2) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    valor_pagado DECIMAL(12,2) DEFAULT 0.00,
    saldo_pendiente DECIMAL(12,2) NOT NULL,
    interes_mora DECIMAL(12,2) DEFAULT 0.00,
    fecha_pago DATE,
    estado ENUM('pendiente', 'pagado', 'vencido', 'exonerado') DEFAULT 'pendiente',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_fondo) REFERENCES fondos(id_fondo),
    FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad),
    UNIQUE KEY unique_aporte_periodo (id_fondo, id_unidad, periodo),
    INDEX idx_estado_vencimiento (estado, fecha_vencimiento)
);

-- Tabla de movimientos de fondos (ingresos y egresos)
CREATE TABLE movimientos_fondos (
    id_movimiento INT PRIMARY KEY AUTO_INCREMENT,
    id_fondo INT NOT NULL,
    tipo_movimiento ENUM('ingreso', 'egreso', 'transferencia', 'ajuste') NOT NULL,
    concepto VARCHAR(200) NOT NULL,
    descripcion TEXT,
    valor DECIMAL(15,2) NOT NULL,
    fecha_movimiento DATE NOT NULL,
    numero_documento VARCHAR(50), -- factura, recibo, orden de pago
    beneficiario VARCHAR(200), -- a quién se le paga o de quién se recibe
    id_solicitud_uso INT, -- referencia a solicitud de uso de fondo
    id_transferencia INT, -- si es transferencia entre fondos
    saldo_anterior DECIMAL(15,2) NOT NULL,
    saldo_posterior DECIMAL(15,2) NOT NULL,
    autorizado_por VARCHAR(100) NOT NULL,
    observaciones TEXT,
    estado ENUM('activo', 'anulado') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_fondo) REFERENCES fondos(id_fondo),
    INDEX idx_fecha_tipo (fecha_movimiento, tipo_movimiento),
    INDEX idx_fondo_fecha (id_fondo, fecha_movimiento)
);

-- Tabla de solicitudes de uso de fondos
CREATE TABLE solicitudes_uso_fondos (
    id_solicitud INT PRIMARY KEY AUTO_INCREMENT,
    id_fondo INT NOT NULL,
    numero_solicitud VARCHAR(20) NOT NULL UNIQUE,
    solicitante VARCHAR(100) NOT NULL, -- nombre del solicitante
    cargo_solicitante VARCHAR(100),
    motivo TEXT NOT NULL,
    justificacion TEXT NOT NULL,
    valor_solicitado DECIMAL(15,2) NOT NULL,
    fecha_solicitud DATE NOT NULL,
    fecha_requerida DATE, -- cuándo se necesita el dinero
    prioridad ENUM('baja', 'media', 'alta', 'urgente') DEFAULT 'media',
    categoria ENUM('mantenimiento', 'reparacion', 'emergencia', 'mejora', 'legal', 'otros') NOT NULL,
    requiere_aprobacion_asamblea BOOLEAN DEFAULT FALSE,
    fecha_asamblea DATE,
    acta_asamblea VARCHAR(100),
    aprobado_por VARCHAR(100),
    fecha_aprobacion DATE,
    observaciones_aprobacion TEXT,
    valor_aprobado DECIMAL(15,2),
    estado ENUM('pendiente', 'en_revision', 'aprobado', 'rechazado', 'ejecutado', 'cancelado') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_fondo) REFERENCES fondos(id_fondo),
    INDEX idx_estado_fecha (estado, fecha_solicitud),
    INDEX idx_fondo_estado (id_fondo, estado)
);

-- Tabla de presupuestos anuales de fondos
CREATE TABLE presupuestos_fondos (
    id_presupuesto INT PRIMARY KEY AUTO_INCREMENT,
    id_fondo INT NOT NULL,
    año YEAR NOT NULL,
    presupuesto_ingresos DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    presupuesto_egresos DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    ingresos_ejecutados DECIMAL(15,2) DEFAULT 0.00,
    egresos_ejecutados DECIMAL(15,2) DEFAULT 0.00,
    fecha_aprobacion DATE,
    aprobado_por VARCHAR(100),
    observaciones TEXT,
    estado ENUM('borrador', 'aprobado', 'en_ejecucion', 'cerrado') DEFAULT 'borrador',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_fondo) REFERENCES fondos(id_fondo),
    UNIQUE KEY unique_fondo_año (id_fondo, año)
);

-- Tabla de transferencias entre fondos
CREATE TABLE transferencias_fondos (
    id_transferencia INT PRIMARY KEY AUTO_INCREMENT,
    id_fondo_origen INT NOT NULL,
    id_fondo_destino INT NOT NULL,
    numero_transferencia VARCHAR(20) NOT NULL UNIQUE,
    valor DECIMAL(15,2) NOT NULL,
    motivo TEXT NOT NULL,
    fecha_transferencia DATE NOT NULL,
    autorizado_por VARCHAR(100) NOT NULL,
    requiere_asamblea BOOLEAN DEFAULT FALSE,
    acta_autorizacion VARCHAR(100),
    observaciones TEXT,
    estado ENUM('pendiente', 'ejecutada', 'cancelada') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_fondo_origen) REFERENCES fondos(id_fondo),
    FOREIGN KEY (id_fondo_destino) REFERENCES fondos(id_fondo),
    INDEX idx_fecha_estado (fecha_transferencia, estado)
);

-- Tabla de rendimientos de fondos (si se invierten)
CREATE TABLE rendimientos_fondos (
    id_rendimiento INT PRIMARY KEY AUTO_INCREMENT,
    id_fondo INT NOT NULL,
    tipo_inversion ENUM('CDT', 'cuenta_ahorros', 'fiducia', 'bonos', 'otros') NOT NULL,
    entidad_financiera VARCHAR(100) NOT NULL,
    numero_producto VARCHAR(50),
    valor_invertido DECIMAL(15,2) NOT NULL,
    tasa_rendimiento DECIMAL(5,4) NOT NULL, -- tasa anual
    fecha_inversion DATE NOT NULL,
    fecha_vencimiento DATE,
    valor_rendimiento DECIMAL(15,2) DEFAULT 0.00,
    fecha_liquidacion DATE,
    observaciones TEXT,
    estado ENUM('activa', 'vencida', 'liquidada', 'cancelada') DEFAULT 'activa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_fondo) REFERENCES fondos(id_fondo),
    INDEX idx_vencimiento (fecha_vencimiento),
    INDEX idx_estado_inversion (estado, fecha_inversion)
);

-- Tabla de auditorías de fondos
CREATE TABLE auditorias_fondos (
    id_auditoria INT PRIMARY KEY AUTO_INCREMENT,
    id_fondo INT NOT NULL,
    tipo_auditoria ENUM('interna', 'externa', 'revisor_fiscal', 'contraloria') NOT NULL,
    auditor VARCHAR(100) NOT NULL,
    fecha_auditoria DATE NOT NULL,
    periodo_auditado_inicio DATE NOT NULL,
    periodo_auditado_fin DATE NOT NULL,
    hallazgos TEXT,
    recomendaciones TEXT,
    observaciones TEXT,
    calificacion ENUM('satisfactoria', 'con_observaciones', 'deficiente') DEFAULT 'satisfactoria',
    archivo_informe VARCHAR(255),
    estado ENUM('en_proceso', 'finalizada', 'corregida') DEFAULT 'en_proceso',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_fondo) REFERENCES fondos(id_fondo),
    INDEX idx_fecha_auditoria (fecha_auditoria),
    INDEX idx_fondo_tipo (id_fondo, tipo_auditoria)
);

-- =====================================================
-- DATOS INICIALES
-- =====================================================

-- Tipos de fondos básicos según normativa colombiana
INSERT INTO tipos_fondos (codigo, nombre, descripcion, obligatorio, porcentaje_minimo, categoria) VALUES
('FONDO_IMP', 'Fondo de Imprevistos', 'Fondo obligatorio para gastos imprevistos según Ley 675', TRUE, 5.00, 'legal'),
('FONDO_REP', 'Fondo de Reposición y Mantenimiento', 'Para reposición de bienes comunes', TRUE, 5.00, 'legal'),
('FONDO_SEG', 'Fondo de Seguridad', 'Para mejoras en seguridad del conjunto', FALSE, 0.00, 'voluntario'),
('FONDO_REC', 'Fondo de Recreación', 'Para mantenimiento y mejora de áreas recreativas', FALSE, 0.00, 'voluntario'),
('FONDO_TEC', 'Fondo Tecnológico', 'Para actualización tecnológica del conjunto', FALSE, 0.00, 'voluntario'),
('FONDO_AMB', 'Fondo Ambiental', 'Para proyectos ambientales y sostenibles', FALSE, 0.00, 'voluntario'),
('FONDO_JUR', 'Fondo Jurídico', 'Para gastos legales y procesos judiciales', FALSE, 0.00, 'especial'),
('FONDO_EMR', 'Fondo de Emergencia', 'Para atención de emergencias inmediatas', FALSE, 0.00, 'especial');

-- Configuraciones adicionales para fondos
INSERT INTO configuracion (parametro, valor, descripcion, tipo_dato, categoria) VALUES
('auto_calcular_aportes_fondos', 'true', 'Calcular automáticamente aportes mensuales', 'booleano', 'fondos'),
('incluir_fondos_en_factura', 'true', 'Incluir aportes de fondos en factura mensual', 'booleano', 'fondos'),
('requiere_asamblea_uso_fondo', '50', 'Valor mínimo que requiere aprobación de asamblea (%)', 'numero', 'fondos'),
('tasa_rendimiento_minima', '4.0', 'Tasa mínima de rendimiento esperada (%)', 'numero', 'fondos'),
('dias_vencimiento_aportes_fondos', '15', 'Días para vencimiento de aportes de fondos', 'numero', 'fondos');

-- =====================================================
-- VISTAS PARA REPORTES
-- =====================================================

-- Vista resumen de fondos
CREATE VIEW vista_resumen_fondos AS
SELECT 
    f.id_fondo,
    f.nombre,
    tf.nombre as tipo_fondo,
    f.meta_minima,
    f.meta_optima,
    f.saldo_actual,
    f.porcentaje_aporte,
    ROUND((f.saldo_actual / f.meta_minima) * 100, 2) as porcentaje_cumplimiento_minimo,
    CASE 
        WHEN f.saldo_actual >= f.meta_optima THEN 'Óptimo'
        WHEN f.saldo_actual >= f.meta_minima THEN 'Adecuado'
        ELSE 'Insuficiente'
    END as estado_fondo,
    f.estado
FROM fondos f
INNER JOIN tipos_fondos tf ON f.id_tipo_fondo = tf.id_tipo_fondo
WHERE f.estado = 'activo';

-- Vista de cartera de fondos
CREATE VIEW vista_cartera_fondos AS
SELECT 
    f.nombre as fondo,
    u.numero_unidad,
    u.torre,
    COUNT(af.id_aporte) as cuotas_pendientes,
    SUM(af.saldo_pendiente) as saldo_pendiente,
    SUM(af.interes_mora) as intereses_mora,
    MIN(af.fecha_vencimiento) as fecha_deuda_mas_antigua
FROM fondos f
INNER JOIN aportes_fondos af ON f.id_fondo = af.id_fondo
INNER JOIN unidades u ON af.id_unidad = u.id_unidad
WHERE af.estado IN ('pendiente', 'vencido')
GROUP BY f.id_fondo, u.id_unidad
HAVING saldo_pendiente > 0;

-- Vista de movimientos mensuales por fondo
CREATE VIEW vista_movimientos_fondos_mensual AS
SELECT 
    f.nombre as fondo,
    DATE_FORMAT(mf.fecha_movimiento, '%Y-%m') as periodo,
    SUM(CASE WHEN mf.tipo_movimiento = 'ingreso' THEN mf.valor ELSE 0 END) as total_ingresos,
    SUM(CASE WHEN mf.tipo_movimiento = 'egreso' THEN mf.valor ELSE 0 END) as total_egresos,
    SUM(CASE WHEN mf.tipo_movimiento = 'ingreso' THEN mf.valor ELSE -mf.valor END) as saldo_neto
FROM fondos f
INNER JOIN movimientos_fondos mf ON f.id_fondo = mf.id_fondo
WHERE mf.estado = 'activo'
GROUP BY f.id_fondo, DATE_FORMAT(mf.fecha_movimiento, '%Y-%m')
ORDER BY periodo DESC;

-- Vista de solicitudes pendientes por fondo
CREATE VIEW vista_solicitudes_pendientes AS
SELECT 
    f.nombre as fondo,
    suf.numero_solicitud,
    suf.solicitante,
    suf.motivo,
    suf.valor_solicitado,
    suf.fecha_solicitud,
    suf.prioridad,
    suf.categoria,
    suf.estado,
    DATEDIFF(CURDATE(), suf.fecha_solicitud) as dias_pendiente
FROM fondos f
INNER JOIN solicitudes_uso_fondos suf ON f.id_fondo = suf.id_fondo
WHERE suf.estado IN ('pendiente', 'en_revision')
ORDER BY suf.prioridad DESC, suf.fecha_solicitud ASC;

-- =====================================================
-- TRIGGERS PARA AUTOMATIZACIÓN
-- =====================================================

-- Trigger para actualizar saldo del fondo al registrar movimiento
DELIMITER //
CREATE TRIGGER tr_actualizar_saldo_fondo
AFTER INSERT ON movimientos_fondos
FOR EACH ROW
BEGIN
    DECLARE nuevo_saldo DECIMAL(15,2);
    
    IF NEW.tipo_movimiento = 'ingreso' THEN
        SET nuevo_saldo = NEW.saldo_anterior + NEW.valor;
    ELSE
        SET nuevo_saldo = NEW.saldo_anterior - NEW.valor;
    END IF;
    
    UPDATE fondos 
    SET saldo_actual = nuevo_saldo,
        updated_at = CURRENT_TIMESTAMP
    WHERE id_fondo = NEW.id_fondo;
END//
DELIMITER ;

-- Trigger para calcular intereses de mora en aportes de fondos
DELIMITER //
CREATE TRIGGER tr_calcular_interes_mora_fondos
BEFORE UPDATE ON aportes_fondos
FOR EACH ROW
BEGIN
    DECLARE dias_mora INT;
    DECLARE tasa_diaria DECIMAL(8,6);
    
    IF NEW.estado = 'vencido' AND OLD.estado != 'vencido' THEN
        SET dias_mora = DATEDIFF(CURDATE(), NEW.fecha_vencimiento);
        
        IF dias_mora > 0 THEN
            -- Obtener tasa de mora de configuración (convertir a diaria)
            SELECT CAST(valor AS DECIMAL(5,2)) / 100 / 30 INTO tasa_diaria
            FROM configuracion 
            WHERE parametro = 'tasa_interes_mora'
            LIMIT 1;
            
            SET NEW.interes_mora = NEW.saldo_pendiente * tasa_diaria * dias_mora;
        END IF;
    END IF;
END//
DELIMITER ;

-- =====================================================
-- PROCEDIMIENTOS ALMACENADOS
-- =====================================================

-- Procedimiento para generar aportes mensuales automáticamente
DELIMITER //
CREATE PROCEDURE sp_generar_aportes_fondos_mensual(
    IN p_periodo VARCHAR(7)
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_id_fondo INT;
    DECLARE v_id_unidad INT;
    DECLARE v_porcentaje_aporte DECIMAL(5,2);
    DECLARE v_coeficiente DECIMAL(8,6);
    DECLARE v_valor_base DECIMAL(12,2);
    DECLARE v_valor_aporte DECIMAL(12,2);
    DECLARE v_fecha_vencimiento DATE;
    
    -- Cursor para fondos activos
    DECLARE cur_fondos CURSOR FOR
        SELECT f.id_fondo, f.porcentaje_aporte
        FROM fondos f
        WHERE f.estado = 'activo';
    
    -- Cursor para unidades
    DECLARE cur_unidades CURSOR FOR
        SELECT u.id_unidad, u.coeficiente
        FROM unidades u
        WHERE u.estado = 'ocupada';
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Calcular fecha de vencimiento
    SET v_fecha_vencimiento = DATE_ADD(STR_TO_DATE(CONCAT(p_periodo, '-01'), '%Y-%m-%d'), INTERVAL 15 DAY);
    
    -- Obtener valor base de administración
    SELECT valor_base INTO v_valor_base
    FROM conceptos_cobro
    WHERE codigo = 'ADM001'
    LIMIT 1;
    
    OPEN cur_fondos;
    
    fondos_loop: LOOP
        FETCH cur_fondos INTO v_id_fondo, v_porcentaje_aporte;
        IF done THEN
            LEAVE fondos_loop;
        END IF;
        
        SET done = FALSE;
        OPEN cur_unidades;
        
        unidades_loop: LOOP
            FETCH cur_unidades INTO v_id_unidad, v_coeficiente;
            IF done THEN
                LEAVE unidades_loop;
            END IF;
            
            -- Calcular valor del aporte
            SET v_valor_aporte = (v_valor_base * v_coeficiente * v_porcentaje_aporte) / 100;
            
            -- Insertar aporte si no existe
            INSERT IGNORE INTO aportes_fondos (
                id_fondo, id_unidad, periodo, valor_aporte, 
                fecha_vencimiento, saldo_pendiente
            ) VALUES (
                v_id_fondo, v_id_unidad, p_periodo, v_valor_aporte,
                v_fecha_vencimiento, v_valor_aporte
            );
            
        END LOOP unidades_loop;
        
        CLOSE cur_unidades;
        SET done = FALSE;
        
    END LOOP fondos_loop;
    
    CLOSE cur_fondos;
END//
DELIMITER ;

-- Procedimiento para obtener estado financiero de fondos
DELIMITER //
CREATE PROCEDURE sp_estado_financiero_fondos(
    IN p_id_edificio INT,
    IN p_fecha_corte DATE
)
BEGIN
    SELECT 
        f.nombre as fondo,
        tf.nombre as tipo_fondo,
        f.meta_minima,
        f.meta_optima,
        f.saldo_actual,
        ROUND((f.saldo_actual / f.meta_minima) * 100, 2) as cumplimiento_minimo,
        ROUND((f.saldo_actual / f.meta_optima) * 100, 2) as cumplimiento_optimo,
        (SELECT SUM(af.saldo_pendiente) 
         FROM aportes_fondos af 
         WHERE af.id_fondo = f.id_fondo 
         AND af.estado IN ('pendiente', 'vencido')
        ) as cartera_pendiente,
        (SELECT COUNT(*) 
         FROM solicitudes_uso_fondos suf 
         WHERE suf.id_fondo = f.id_fondo 
         AND suf.estado IN ('pendiente', 'en_revision')
        ) as solicitudes_pendientes
    FROM fondos f
    INNER JOIN tipos_fondos tf ON f.id_tipo_fondo = tf.id_tipo_fondo
    WHERE f.id_edificio = p_id_edificio
    AND f.estado = 'activo'
    ORDER BY tf.categoria, f.nombre;
END//
DELIMITER ;
