<h1 align="center">API Disney Alkemy</h1>
<h3 align="center">API para explorar el mundo de Disney</h3>



<p>Crear Schema <b>disneyDB</b> corriendo el script createSchema</p>
<p>Correr las migraciones con: sequelize db:migrate</p>
<p>Correr los seeders con: sequelize db:seed:all</p>

<span><b>EN CASO DE ERROR O QUERER VOLVER ATRÁS, BORRAR MIGRACIONES CON: sequelize db:migrate:undo:all Y VOLVER A CORRERLAS CON: sequelize db:migrate y luego los seed con: db:seed:all</b> </span>

###
***SINTAXÍS DE PLUGIN REST Client de VSC***
## Registro
POST http://localhost:3000/auth/register HTTP/1.1
<p>content-type: application/json</p>

{
    "email": "cristianlell23@gmail.com",
    "password": "pas123"
}

###

## Login
POST http://localhost:3000/auth/login HTTP/1.1
<p>content-type: application/json</p>

{
    "email": "cristianlell23@gmail.com",
    "password": "pas123"
}

###


## PERSONAJES
GET http://localhost:3000/characters HTTP/1.1
<p>content-type: application/json</p>
 Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs 


###
## Buscar por nombre en orden desc
GET http://localhost:3000/characters?name=a&order=desc HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs


###

## Filtrar por edad
GET http://localhost:3000/characters?age=36 HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs


###

## Ordenar ASC | DESC
GET http://localhost:3000/characters?order=desc HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs
###

## Filtrar por peso
GET http://localhost:3000/characters?weight=118 HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs
###

###
## Detalle de Character
GET http://localhost:3000/characters/detail/2 HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs


###
## Crear Character
POST  http://localhost:3000/characters/create HTTP/1.1
<p>content-type: application/json</p>
//Authorization: "TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs

{
    "name":"Thor",
    "image":"ss.jpg",
    "age":22,
    "weight":140,
    "history":""

}
###

## Editar Character
PUT  http://localhost:3000/characters/edit/6 HTTP/1.1
<p>content-type: application/json</p>
// Authorization: "TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs

{
    "name":"Cristian",
    "image":"ss.jpg",
    "age":22,
    "weight":140,
    "history":""

}
###

## Eliminar Character
DELETE   http://localhost:3000/characters/delete/6 HTTP/1.1
<p>content-type: application/json</p>
//Authorization: "TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs


###
##  PELICULAS
GET http://localhost:3000/movies HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs


###
## Buscar por título en orden desc
GET http://localhost:3000/movies?title=k&order=desc HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs

###

## Filtrar por género [accion[id:1], animación[id:2], aventura[id:3], drama[id:4]]
GET http://localhost:3000/movies?genre=1 HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs

###

## Ordenar ASC | DESC
GET http://localhost:3000/movies?order=asc HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs

###


## Detail
GET http://localhost:3000/movies/detail/7 HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs



###
## Crear Movie formato de fecha YYYY/MM/DD
POST  http://localhost:3000/movies/create HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs

{
    "title":"Cristian",
    "releaseDate":"2020/02/20",
    "rating":10,
    "genreId":,

}
###

## Editar Movies formato de fecha YYYY/MM/DD
PUT  http://localhost:3000/movies/edit/6 HTTP/1.1
<p>content-type: application/json</p>
//Authorization: "TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs

{
    "title":"Cristian",
    "releaseDate":"2021/02/20",
    "rating":9,
    "description":"lorem ipsum",
    "genreId":2,

}
###

## Eliminar Movies
DELETE   http://localhost:3000/movies/delete/5 HTTP/1.1
<p>content-type: application/json</p>
//Authorization: "TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs

###

## RELACION CHARACTER MOVIE

## Crear relacion

POST  http://localhost:3000/relations/create HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs

{
    "characterId":5,
    "movieId":7

} 

###


## Editar relacion "ID"

PUT  http://localhost:3000/relations/edit/1 HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs

{
    "characterId":2,
    "movieId":7
} 

###

## Eliminar relacion "ID"

DELETE  http://localhost:3000/relations/delete/6 HTTP/1.1
<p>content-type: application/json</p>
//Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjcmlzdGlhbmxlbGwyM0BnbWFpbC5jb20iLCJpYXQiOjE2MzQ2MDI2NTAsImV4cCI6MTYzNDYwMjk1MH0.3NKtW2gz-AE8HDfeG81Wmhs_vr6mp9FRhk8ux2BZZWs


###