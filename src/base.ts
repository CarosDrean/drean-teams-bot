export const knowlegde = `
INPUT;RESULTADO
"Objetivo: Adecuar la configuración del sistema SAP S/4HANA para que asigne correctamente el país destino de venta y evitar reclasificaciones o ajustes directos en el proceso de cierre (BPC).
Contexto: En el proceso de cierre se ha identificado que el país de ventas en el módulo de
rentabilidad (PA) está siendo asignado en función al país donde se encuentra
domiciliado en Cliente Solicitante y no con base en el Cliente Destinatario de factura.
Esta información es a su vez la que utilizamos para todos los reportes oficiales de
los resultados de la organización para la toma de decisiones (Flash de Ventas,
Informe Gerencial, entre otros); por lo que, nos vemos obligados a ingresar ajustes
para modificar el dato que proviene de la fuente.
Adicionalmente, hoy disponemos de doble vista de la información, ya que Comercial
toma el dato a partir del cliente destinatario, generando diferencia versus la vista
financiera.
Pains Criticos: Sin datos.
Causas: Sin datos.
Impacto/Otros: Requerimiento especificado en el Business Case: 1. Adecuar la configuración del sistema SAP S/4HANA (específicamentede CO-PA) para que asigne correcta y automáticamente el país destinode venta en función al cliente destinario para los pedidos deexportación y no con base al cliente factura.2. Con el cambio del punto 1, la información viajará en automático a PaPM y BPC, evitando así, análisis y reclasificaciones adicionalesinnecesarias.
";[
  {
    "name": "BAE Comercial",
    "score": 100
  },
  {
    "name": "BAE Supply",
    "score": 0
  },
  {
    "name": "Service Desk",
    "score": 0
  },
  {
    "name": "Operaciones SAP",
    "score": 0
  },
  {
    "name": "Procesos",
    "score": 0
  },
  {
    "name": "Ciberseguridad",
    "score": 0
  },
  {
    "name": "Testing",
    "score": 0
  },
  {
    "name": "Transición",
    "score": 0
  },
  {
    "name": "Arquitectura de Integración",
    "score": 0
  }
]
"Objetivo: El presente requerimiento tiene dos necesidades:
Revisar las revisar las configuraciones internas a nivel de todas las sociedades de S4H, que derivan
de las condiciones de pedido de compra a los elementos de costos para su validación. -->
Información solicitada al BAE responsable.
Cruzar con el equipo de Comex las configuraciones correctas de las condiciones de pedido para
consensuar la adecuada asignación y uso. --> Usuario del Negocio + Comex
Configurar las correcciones de los elementos de costo en caso aplique. --> Solutioning de lo
identificado.
Contexto: Actualmente se observa que los registros de pedidos de compra están imputando a nivel de
elementos de costo de forma incorrecta, afectando el presupuesto del equipo de Comex, al realizar
la trazabilidad de estos registros, se detectó que las condiciones del pedido están derivando a
elemento de costos incorrectos.
Pains Criticos: Se observa que las imputaciones de las condiciones de pedido a los elementos de costos son lo siguientes:
Custodio Z046     -> Elemento Materia Prima Insumo
Condición de Fodinfa Z047   -> Elemento Materia Prima Insumo
Bodega en frontera Z048   ->  Elemento Materia Prima Insumo
Flete Internacional  -> Elemento Flete 
Cuando la necesidad es que imputen al elemento de costo de Internamiento.
Desviación de valor imputado al elemento de costo de Internamiento por USD 1.4 MM a 1.7 MM mensuales.

Causas: La causa de esta problemática es por configuraciones definidas de forma errónea, así como la
ausencia de configuraciones de estos elementos de costos puesto que no formaron parte del
alcance Fénix. Se descarta como causa el uso incorrecto de las condiciones de pedido. El motivo por que cual se esta imputando al elemento de costo incorrecto es porque no se ejecutó la configuración y/o la configuración se realizó con un incorrecta definición.

Impacto/Otros: Impacto: 
- Importes en elementos de costo no son reales y están distorsionados.
- Desviación de valor imputado al elemento de costo de Internamiento por USD 1.4 MM a 1.7 MM mensuales
";[
  {
    "name": "BAE finanzas",
    "score": 100
  },
  {
    "name": "BAE Supply",
    "score": 0
  },
  {
    "name": "Service Desk",
    "score": 0
  },
  {
    "name": "Operaciones SAP",
    "score": 0
  },
  {
    "name": "Procesos",
    "score": 30
  },
  {
    "name": "Ciberseguridad",
    "score": 0
  },
  {
    "name": "Testing",
    "score": 0
  },
  {
    "name": "Transición",
    "score": 0
  },
  {
    "name": "Arquitectura de Integración",
    "score": 0
  }
]
"Objetivo: Cumplir con la normativa de emisión obligatoria de guías de remisión electrónicas a promulgarse por La Superintendencia Nacional de Aduanas y deAdministración Tributaria (SUNAT).
Contexto: La Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) ha emitido un comunicado informando la obligatoriedad de la emisión de guías de remisión electrónica como sustento ante cualquier traslado de mercancías de un lugar a otro.

Actualmente contamos con un monitor de guías de remisión (ZO2CP004). Desde este monitor se asigna, numera y manda a imprimir las guías de remisión; entre otras funcionalidades, se requiere habilitar  la emisión de documentos que no se encuentran implementados en el S/4, como el recojo de mercancía por compras y no giro. Seguimiento de las habilitaciones de los clientes para lograr tener al 100% la emisión al mes de Julio.
Pains Criticos: La Superintendencia Nacional deAduanas y de Administración Tributaria(SUNAT) ha emitido un comunicadoinformando la obligatoriedad de laemisión de guías de remisiónelectrónica como sustento antecualquier traslado de mercancías de unlugar a otro. El escenario de Recojo e Importaciones no se están generando guías a nombre de Alicorp. Los procesos de venta o traslados de productos no giro están emitiendo guías manuales.
Causas: Cambio de normativa a promulgarsepor La Superintendencia Nacionalde Aduanas y de AdministraciónTributaria (SUNAT). No se contempló en el flujo de
proceso la generación de las guías de remisión con nombre de Alicorp para los procesos de Recojo e Importaciones. No se contempló en el flujo de
proceso la generación de las guías de remisión en los procesos de traslados o ventas de productos no giro.
Impacto/Otros: Cumplimiento de la normativa tributaria a promulgarse por la SUNAT. Transparencia y claridad en lainformación entregada al entetributario.Agilizar el proceso de emisión deguías de remisión. Reducción de costos y recursos poradquisición de guías de remisiónfísicas. El impacto se da en el proceso de recojo de mercadería, procesos de balanzas y ventas y/o traslados de producto no giro en todas las sociedades de Perú. Actualmente las guías no se emiten y/o se emiten de forma manual.
";"[
  {
    "name": "BAE Comercial",
    "score": 100
  },
  {
    "name": "BAE Supply",
    "score": 90
  },
  {
    "name": "Service Desk",
    "score": 80
  },
  {
    "name": "Operaciones SAP",
    "score": 80
  },
  {
    "name": "Procesos",
    "score": 70
  },
  {
    "name": "Ciberseguridad",
    "score": 50
  },
  {
    "name": "Testing",
    "score": 70
  },
  {
    "name": "Transición",
    "score": 50
  },
  {
    "name": "Arquitectura de Integración",
    "score": 50
  }
]
"
`