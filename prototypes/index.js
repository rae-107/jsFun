const { kitties } = require('./datasets/kitties');
const { puppers } = require('./datasets/puppers');
const { mods } = require('./datasets/mods');
const { cakes } = require('./datasets/cakes');
const { classrooms } = require('./datasets/classrooms');
const { breweries } = require('./datasets/breweries');
const { nationalParks } = require('./datasets/nationalParks');
const { weather } = require('./datasets/weather');
const { boardGames } = require('./datasets/boardGames');
const { instructors, cohorts } = require('./datasets/turing');
const { bosses, sidekicks } = require('./datasets/bosses');
const { constellations, stars } = require('./datasets/astronomy');
const { weapons, characters } = require('./datasets/ultima');
const { dinosaurs, humans, movies } = require('./datasets/dinosaurs');
const { books } = require('./datasets/books');



// SINGLE DATASETS
// =================================================================

// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  orangePetNames(data) {
    return data
      .filter(cat => cat.color === 'orange')
      .map(cat => cat.name)

  },

  sortByAge(data) {
    return data.sort((a, b) => b.age - a.age)
  },

  growUp(data) {
    return data.map(cat => {
      cat.age += 2
      return cat
    })
  }
};

// PLEASE READ-----------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: clubs from ./datasets/clubs HARD
const clubPrompts = {
  membersBelongingToClubs(clubData) {
    return clubData.reduce((arr, club) => [...arr, ...club.members], []).reduce((obj, member) => {
      obj[member] = clubData.filter(club => club.members.includes(member)).map(club => club.club)
      return obj
    }, {})
  }
};





// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: mods from ./datasets/mods
const modPrompts = {
  studentsPerMod() {
    return mods.map(mod => {
      return { mod: mod.mod, studentsPerInstructor: mod.students / mod.instructors }
    })
  }
};




// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: cakes from ./datasets/cakes MEDIUM 
const cakePrompts = {
  stockPerCake() {
    return cakes.map(cake => {
      return { flavor: cake.cakeFlavor, inStock: cake.inStock }
    })
  },

  onlyInStock() {
    return cakes.filter(cake => cake.inStock)
  },

  totalInventory() {
    return cakes.reduce((totalStock, cake) => totalStock += cake.inStock, 0)
  },

  allToppings() {
    return [...new Set(cakes.flatMap(el => el.toppings))]
  },

  groceryList() {
    let ingredientsArray = cakes.reduce((arr, cake) => {
      return [...arr, ...cake.toppings] 
    }, [])
    let ingredientsObject = ingredientsArray.reduce((ingredientsObj, topping) => {
      if(ingredientsObj[topping]) {
        ingredientsObj[topping] += 1
      } else {
        ingredientsObj[topping] = 1
      }
      return ingredientsObj
    }, {})
    return ingredientsObject
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------




// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {
    return classrooms.filter(room => room.program === 'FE')
  },

  totalCapacities() {
    let feCapacity = classrooms
      .filter(room => room.program === 'FE')
      .reduce((feCapacity, room) => {
      return feCapacity += room.capacity
    }, 0)
    let beCapacity = classrooms
      .filter(room => room.program === 'BE')
      .reduce((beCapacity, room) => {
      return beCapacity += room.capacity
    }, 0)
    return {feCapacity, beCapacity}
  },

  sortByCapacity() {
    return classrooms.sort((low, high) => low.capacity - high.capacity)
  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: books from './datasets/books MEDIUM - HARD

const bookPrompts = {
  removeViolence() {
    return books
      .filter(book => book.genre !== 'Horror' && book.genre !== 'True Crime')
      .map(book => book.title)
  },

  getNewBooks() {
    return books
    .filter(book => book.published > 1990)
    .map(book => {
      return {title: book.title, year: book.published}
    })
  },

  getBooksByYear(books, year) {
    return books
    .filter(book => book.published > year)
    .map(book => {
        return {title: book.title, year: book.published}
      })
  }

};


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: weather from './datasets/weather

const weatherPrompts = {
  getAverageTemps() {
    return weather.map(city => (city.temperature.high + city.temperature.low) / 2)
  },

  findSunnySpots() {
    return weather.filter(city => city.type.includes('sunny')).map(city => `${city.location} is ${city.type}.`)
  },

  findHighestHumidity() {
    return weather.reduce((obj, city) => city.humidity > obj.humidity ? obj = city : obj)
  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


// DATASET: nationalParks from ./datasets/nationalParks

const nationalParksPrompts = {
  getParkVisitList() {
    let parksToVisit = []
    let parksVisited = []
    nationalParks
    .filter(park => !park.visited)
    .forEach(park => parksToVisit.push(park.name))
    nationalParks
    .filter(park => park.visited)
    .forEach(park => parksVisited.push(park.name))
    return {parksToVisit, parksVisited}
  },

  getParkInEachState() {
    return nationalParks.map(park => {
      return {[park.location]: park.name}
    })
  },

  getParkActivities() {
    let nationalParkActivities = []
    let noReplicates = []
    nationalParks.forEach(park => nationalParkActivities.push(...park.activities))
    nationalParkActivities.forEach(activity => {
      if (!noReplicates.includes(activity)) {
        noReplicates.push(activity)
      }
    })
    return noReplicates
  }
};



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {
    return breweries.reduce((total, brewery) => total += brewery.beers.length, 0)
  },

  getBreweryBeerCount() {
    return breweries.map(brewery => {
      return { name: brewery.name, beerCount: brewery.beers.length }
    })
  },

  getSingleBreweryBeerCount(breweryName) {
    let breweryCount
    breweries.forEach(brewery => {
      if (brewery.name === breweryName) {
        breweryCount = brewery.beers.length
      }
    })
    return breweryCount
  },

  findHighestAbvBeer() {
    let sortedAbv = breweries
      .reduce((arr, brewery) => {
        return [...arr, ...brewery.beers]
      }, [])
      .sort((a, b) => b.abv - a.abv)
    return sortedAbv[0]
  }
};


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: weather from './datasets/boardGames 

const boardGamePrompts = {
  listGames(type) {
    return boardGames[type].map(game => game.name)
  },

  listGamesAlphabetically(type) {
    return boardGames[type].map(game => game.name).sort()
  },

  findHighestRatedGamesByType(type) {
    return boardGames[type].reduce((obj, game) => obj.rating > game.rating ? obj : game)
  },

  averageScoreByType(type) {
    return boardGames[type].reduce((acc, game) => acc + game.rating, 0) / boardGames[type].length
  },

  averageScoreByTypeAndPlayers(type, maximumPlayers) {
    return boardGames[type]
    .filter(game => game.maxPlayers === maximumPlayers)
    .reduce((acc, game,_,arr) => acc + game.rating / arr.length , 0)
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {
    return instructors.map(instructor => {
      return {name: instructor.name, studentCount: cohorts.find(cohort => instructor.module === cohort.module).studentCount}
    })
  },

  studentsPerInstructor() {
    return cohorts.reduce((obj, cohort) => {
      obj[`cohort${cohort.cohort}`] = cohort.studentCount / instructors.filter(instructor => instructor.module === cohort.module).length
      return obj
    }, {})
  },

  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // {
    //     Pam: [2, 4],
    //     Brittany: [2, 4],
    //     Nathaniel: [2, 4],
    //     Robbie: [4],
    //     Leta: [2, 4],
    //     Travis: [1, 2, 3, 4],
    //     Louisa: [1, 2, 3, 4],
    //     Christie: [1, 2, 3, 4],
    //     Will: [1, 2, 3, 4]
    //   }

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // {
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the star objects that appear in any of the constellations
    // listed in the constellations object e.g.
    // [
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' },
    //   {
    //     name: 'Achernar',
    //     visualMagnitude: 0.46,
    //     constellation: 'The Plow',
    //     lightYearsFromEarth: 140,
    //     color: 'blue'
    //   },
    //   {
    //     name: 'Hadar',
    //     visualMagnitude: 0.61,
    //     constellation: 'The Little Dipper',
    //     lightYearsFromEarth: 350,
    //     color: 'blue'
    //   }
    // ]

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  constellationsStarsExistIn() {
    // Sort the stars by brightness and return an array of the star's constellation names
    // Brightest Stars are indicated by visualMagnitude - the lower the number, the brighter the star
    // e.g.
    //  [ "Canis Major",
    //    "Carina",
    //    "Boötes",
    //    "Auriga",
    //    "Orion",
    //    "Lyra",
    //    "Canis Minor",
    //    "The Plow",
    //    "Orion",
    //    "The Little Dipper" ]


    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {

    // Return the sum of the amount of damage for all the weapons that our characters can use
    // Answer => 113

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  charactersByTotal() {

    // Return the sum damage and total range for each character as an object.
    // ex: [ { Avatar: { damage: 27, range: 24 }, { Iolo: {...}, ...}

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    // Return an object where each key is a movie title and each value is the
    // number of awesome dinosaurs in that movie. e.g.:
    // {
    //   'Jurassic Park': 5,
    //   'The Lost World: Jurassic Park': 8,
    //   'Jurassic Park III': 9,
    //   'Jurassic World': 11,
    //   'Jurassic World: Fallen Kingdom': 18
    // }

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  averageAgePerMovie() {
    /* Return an object where each key is a movie director's name and each value is
        an object whose key is a movie's title and whose value is the average age
        of the cast on the release year of that movie.
      e.g.:
      {
        'Steven Spielberg':
          {
            'Jurassic Park': 34,
            'The Lost World: Jurassic Park': 37
          },
        'Joe Johnston':
          {
            'Jurassic Park III': 44
          },
        'Colin Trevorrow':
          {
            'Jurassic World': 56
           },
        'J. A. Bayona':
          {
            'Jurassic World: Fallen Kingdom': 59
          }
      }
    */

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  uncastActors() {
    /*
    Return an array of objects that contain the names of humans who have not been cast in a Jurassic Park movie (yet), their nationality, and their imdbStarMeterRating. The object in the array should be sorted alphabetically by nationality.

    e.g.
      [{
        name: 'Justin Duncan',
        nationality: 'Alien',
        imdbStarMeterRating: 0
      },
      {
        name: 'Karin Ohman',
        nationality: 'Chinese',
        imdbStarMeterRating: 0
      },
      {
        name: 'Tom Wilhoit',
        nationality: 'Kiwi',
        imdbStarMeterRating: 1
      }, {
        name: 'Jeo D',
        nationality: 'Martian',
        imdbStarMeterRating: 0
      }]
    */

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  },

  actorsAgesInMovies() {
    /*
    Return an array of objects for each human and the age(s) they were in the movie(s) they were cast in, as an array of age(s). Only include humans who were cast in at least one movie.

    e.g.
    [ { name: 'Sam Neill', ages: [ 46, 54 ] },
      { name: 'Laura Dern', ages: [ 26, 34 ] },
      { name: 'Jeff Goldblum', ages: [ 41, 45, 63, 66 ] },
      { name: 'Richard Attenborough', ages: [ 70, 74, 92, 95 ] },
      { name: 'Ariana Richards', ages: [ 14, 18 ] },
      { name: 'Joseph Mazello', ages: [ 10, 14 ] },
      { name: 'BD Wong', ages: [ 33, 55, 58 ] },
      { name: 'Chris Pratt', ages: [ 36, 39 ] },
      { name: 'Bryce Dallas Howard', ages: [ 34, 37 ] } ]
    */

    /* CODE GOES HERE */

    // Annotation:
    // Write your annotation here as a comment
  }
};

module.exports = {
  breweryPrompts,
  turingPrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts,
  ultimaPrompts,
  nationalParksPrompts,
  weatherPrompts,
  bookPrompts,
  dinosaurPrompts,
  boardGamePrompts,
};
