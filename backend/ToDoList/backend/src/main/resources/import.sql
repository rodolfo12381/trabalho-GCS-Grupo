INSERT INTO tb_roles (authority) VALUES ('ROLE_ADMIN');
INSERT INTO tb_roles (authority) VALUES ('ROLE_USUARIO');

INSERT INTO TB_USUARIOS (EMAIL,PASSWORD,PRIMEIRO_NOME,SOBRE_NOME) VALUES ('edson@gmail.com','$2a$10$PZZILrO22dxfvxXpSw/lHOGrfZuHU8qGn0Nb0IoSrYvUl6i1MgmI6','Edson','Campolina');
INSERT INTO TB_USUARIOS (EMAIL,PASSWORD,PRIMEIRO_NOME,SOBRE_NOME) VALUES ('user1@gmail.com','$2a$10$PZZILrO22dxfvxXpSw/lHOGrfZuHU8qGn0Nb0IoSrYvUl6i1MgmI6','Edson','Campolina');
INSERT INTO TB_USUARIOS (EMAIL,PASSWORD,PRIMEIRO_NOME,SOBRE_NOME) VALUES ('user2@gmail.com','$2a$10$PZZILrO22dxfvxXpSw/lHOGrfZuHU8qGn0Nb0IoSrYvUl6i1MgmI6','Edson','Campolina');
INSERT INTO TB_USUARIOS (EMAIL,PASSWORD,PRIMEIRO_NOME,SOBRE_NOME) VALUES ('user3@gmail.com','$2a$10$PZZILrO22dxfvxXpSw/lHOGrfZuHU8qGn0Nb0IoSrYvUl6i1MgmI6','Edson','Campolina');

INSERT INTO TB_USUARIOS_ROLES VALUES (1,1);
INSERT INTO TB_USUARIOS_ROLES VALUES (2,2);
INSERT INTO TB_USUARIOS_ROLES VALUES (3,2);
INSERT INTO TB_USUARIOS_ROLES VALUES (4,2);

