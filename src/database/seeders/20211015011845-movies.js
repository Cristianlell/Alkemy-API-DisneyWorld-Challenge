'use strict';
let movies = [
  {
    title : "Black Widow",
    image:"Black-Widow.webp",
    description:"Una peligrosa conspiración, relacionada con su pasado, persigue a Natasha Romanoff, también conocida como Viuda Negra. La agente tendrá que lidiar con las consecuencias de haber sido espía, así como con las relaciones rotas, para sobrevivir.",
    releaseDate:"2021/06/9",
    rating:5.8,
    genreId:1,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    title : "Cruella",
    image:"cruella.jpg",
    description:"Decidida a convertirse en una exitosa diseñadora de moda, una joven y creativa estafadora llamada Estella se asocia con un par de ladrones para sobrevivir en las calles de Londres.",
    releaseDate:"2021/05/28",
    rating:7.4,
    genreId:4,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    title : "The Avengers",
    image:"vengadores.jpeg",
    description:"Avengers: Infinity War, constituye quizá la obra más esperada de las que se han rodado hasta el día de hoy en el Universo Cinematográfico de Marvel. Es por muy buenas razones: se revela como un brillante espectáculo de aventuras y acción en el que los espectadores tendrán mucho que procesar al salir del cine.",
    releaseDate:"2018/04/26", 
    rating:7.5,
    genreId:1,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    title : "Raya y el último dragón",
    image:"raya.jpg",
    description:"En el fantástico mundo de Kumandra, humanos y dragones vivieron juntos en perfecta armonía. Sin embargo, cuando unas fuerzas del mal amenazaron el territorio, los dragones se sacrificaron para salvar a la humanidad.",
    releaseDate:"2021/03/5",
    rating:7.4,
    genreId:2,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    title : "Jungle Cruise",
    image:"junglecruise_2cta-post_vertical_ffb460da.webp",
    description:"En JUNGLE CRUISE, la nueva película de Disney, Dwayne Johnson y Emily Blunt, los favoritos de los fanáticos, te invitan a unirte a la aventura de sus vidas en un emocionante viaje por el Amazonas con el ocurrente capitán Frank Wolff y la intrépida investigadora Dra. Lily Houghton. Lily viaja desde Londres, Inglaterra, a la selva del Amazonas y recluta los cuestionables servicios de Frank para que la guíe río abajo en La Quila: su deteriorada pero encantadora barca. Lily está decidida a encontrar un árbol antiguo con propiedades curativas únicas que tiene el poder de cambiar el futuro de la medicina.",
    releaseDate:"2021/07/30",
    rating:6.6,
    genreId:3,
    createdAt: new Date,
    updatedAt:  new Date
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Movies',movies, {});
    
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Movies', null, {});

  }
};
