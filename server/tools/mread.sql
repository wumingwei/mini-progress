/* eslint-disable*/
create table books
(
    id int not null auto_increment primary key,
    isdn varchar(20) not  null,
    openid varchar(50) not null,
    title varchar(100) not null,
    image varchar(100),
    alt varchar(100) not null,
    publisher varchar(100) not null,
    summary varchar(1000) not null,
    price varchar(100),
    rate FLOAT,
    tags varchar(100),
    author varchar(100)


)
