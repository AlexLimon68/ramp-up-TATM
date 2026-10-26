# MySQL
## Cambios en type, key, rows
### Con index:
**Type**: ref

**Key**: idx_task_list_status

**Rows**: 5

### Sin index:
**Type**: ALL

**Key**: NULL

**Rows**: 19


## Integridad
Al agregar un dato a una lista inexistente muestra un error de llave foranea. 

Al agregar un status que no es valido, se trunca la operacion.

# Mongo
## Embeber o Referenciar?
Tomando en cuanta la tabla de la seccion 4.5, referenciar es la mejor opcion. Los datos se consultan por separado, pueden existir muchas tareas y los datos se comparten entre muchos documentos. 


COLLSCAN/ IXSCANy totalDocsExamined


# Tipos de datos.

| Tipo de Dato | TS | MySQL | Mongo |
| :--- | :--- | :--- | :--- |
| id | string: Para recibir los id de tipo bigint u objectId, la manera de manejarlos correctamente es a traves de un string. | BIGINT: Para guardar una cantidad muy grande de este campo, si la tabla llega a crecer mucho. | ObjectId: Objeto generado automaticamente por mongo, de 24 caracteres, casi imposible de repetirse. |
| list_id | string: Para recibir los id de tipo bigint u objectId, la manera de manejarlos correctamente es a traves de un string. | BIGINT: Para guardar una cantidad muy grande de este campo, si la tabla llega a crecer mucho.  | ObjectId: Objeto generado automaticamente por mongo, de 24 caracteres, casi imposible de repetirse. |
| title | string: Para manejar el texto. | VARCHAR(): Porque es un texto no muy extenso. | string: Para guardar texto. |
| description | string: Para manejar el texto. | TEXT NULL: Porque este campo puede llegar a guardar una cantidad mas extensa de caracteres. Null porque es un campo opcional. | string: Para guardar texto. |
| status | TaskStatus: Para elegir entre las opciones definidas. | ENUM: Para escoger entre los estados definidos solamente. | enum: Para elegir solamente entre opciones definidas. |
| priority | TaskPriority: Para elegir entre las opciones definidas. | ENUM: Para escoger entre los estados definidos solamente. | enum: Para elegir solamente entre opciones definidas. |
| estimated_hours | string: Es mejor manejarlas de esta manera porque number no tiene la precision exacta. | DECIMAL(5, 2): Decimal tiene una precision mas exacta que Number o Double. | decimal: Decimal tiene una precision mas exacta que Number o Double. |
| due_date | Date: Para manejarla en formato de fecha. | Date: Para guardar solamente la fecha. | bsonType: Permite el tipo date que en un json normal no existe. |
| completed_at | Date: Para manejarla en formato de fecha. | DATETIME(3): Para guardar fecha y hora con 3 digitos de milisegundos. |  |
| created_at | Date: Para manejarla en formato de fecha. | DATETIME(3) NOT NULL: Para guardar fecha y hora con 3 digitos de milisegundos. Not null porque es un campo obligatorio. | bsonType: Permite el tipo date que en un json normal no existe. |
| update_at | Date: Para manejarla en formato de fecha. | DATETIME(3) NOT NULL: Para guardar fecha y hora con 3 digitos de milisegundos. Not null porque es un campo obligatorio. |  |


### Precision

| 0.1 + 0.2 | 9007199254740993 | Number.MAX_SAFE_INTEGER + 2 |
| :-- | :-- | :-- |
| Resultado: 0.30000000000000004. Como las computadoras guardan los numeros en binario y el 0.1 no se puede escribir en binario, guarda una aproximacion. | Resultado: 9007199254740992. El number de JavaScript sólo representa enteros exactos hasta 9,007,199,254,740,991. BIGINT puede ser mucho mas grande, y los numeros muy grandes, se corrompen. | Resultado: 9007199254740992. Incrementa solo una unidad porque ya superó su limite de precision. Mismo tema, es una aproximacion.

### Fechas en MySLQ

Al agregar __SET time_zone = '+9:00';__ el campo con el tipo de dato TIMESTAMP se adelanta 9 horas. El dato '+9:00' define la zona horaria.


| fecha_hora | tstamp |
| :-- | :-- |
| 2026-10-23 04:38:26 | 2026-10-23 13:38:26 |

### Numeros en Mongo

horas: 5 &rarr; se guarda como "int"

horas: NumberInt(5) &rarr; se guarda como "int"

horas: NumberDecimal(5) &rarr; se guarda como "decimal"

### Validacion
Al querer agregar un double a un campo que es del tipo Decimal, mongo lanza un "Document failed validation". Para arreglarlo se usa el Decimal128


# HTTP

### Idempotencia

Si la red falla y la aplicacion vuelve a realizar POST /lists/1/tasks y se reintenta DELETE tasks/5 el peligroso es el POST, ya que si DELETE se realizó correctamente, esa misma peticion no puede volver a realizarse, se queda borrada y no afecta otro dato, pero el POST agregaría los mismos datos dos veces.

### Codigos de estado

| Codigo | Respuesta |
| :-- | :-- |
| Piden GET /lists/7/tasks y la lista 7 existen pero no tiene tareas. | 204: Salió bien y no hay nada que devolver. |
| Piden GET /lists/7/tasks y la lista 7 no existe. | 404: El recurso no existe. |
| Mandan PATCH /tasks/3 con { "status": "terminada" }. | 400: La petición está mal formada o es inválida. |
| Mandan POST /lists con el cuerpo { name: Escuela }(JSON mal escrito). | 400: La petición está mal formada o es inválida. |
| Se cayó MySQL mientras procesaba GET /lists. | 500: Algo falló dentro del servidor |
| Mandan PUT /lists/1 y tu API no implementa PUT. | 405: La ruta existe, pero no acepta este método. |

### Observa HTTP real
#### Numero 1:
GET https://accounts.google.com/gsi/client

Codigo: 200

Content-Type: application/javascript; charset=utf-8

#### Numero 2:

GET https://aplicaciones.tsj.mx/alumnos/assets/manifest-018afdd0.js

Codigo: 200

Content-Type: application/javascript


#### Numero 3:

GET https://aplicaciones.tsj.mx/alumnos/assets/IconButton-BfwROk_8.js

Codigo: 200

Content-Type: application/javascript


