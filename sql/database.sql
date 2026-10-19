create database if not exists tienda character set utf8mb4;
use tienda;

create table if not exists articulos (
    id int auto_increment primary key,
    nombre varchar(100),
    descripcion text,
    precio_compra decimal (10,2),
    precio_venta decimal(10,2),
    stock_minimo int default 0,
    stock_maximo int default 0,
    imagen varchar(255) /*  Almacena solo la ruta de la imagen por ejemplo /uploads/01000000.png */
);s