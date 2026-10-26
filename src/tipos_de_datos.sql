CREATE TABLE prueba (
    fecha_hora DATETIME, tstamp TIMESTAMP 
);

INSERT INTO prueba (
    fecha_hora, tstamp
) VALUES (
    NOW(), NOW()
);

SET time_zone = '+9:00';