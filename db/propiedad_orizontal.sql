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

-- Tabla de áreas comunes
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

-- Tabla de reservas de áreas comunes
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

