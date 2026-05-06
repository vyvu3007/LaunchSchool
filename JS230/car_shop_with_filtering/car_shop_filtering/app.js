/*
Data/State
- all cars object
- filters update ( input from user)
- updated version => render page 
- build the page or create a new page using template


build page
-add filters option
using select to have options with values accordingly
create a select dropbox
<select name="pets" id="pet-select">
  <option value="">--Please choose an option--</option>
  <option value="dog">Dog</option>
 make
model
year
price
 and filter option that when user clicked submit button
 , page render cars with
 selected values

 Behavior 
 When user select an option


 Template:
 to add option to filter
 when filter car and render to page
*/



//import templater from "./templates.js";
const cars = [
  { make: 'Honda',  image: 'images/honda-accord-2005.jpg',   model: 'Accord',  year: 2005, price: 7000  },
  { make: 'Honda',  image: 'images/honda-accord-2008.jpg',   model: 'Accord',  year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg',   model: 'Camry',   year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg',   model: 'Swift',   year: 2014, price: 9000  },
  { make: 'Audi',   image: 'images/audi-a4-2013.jpg',        model: 'A4',      year: 2013, price: 25000 },
  { make: 'Audi',   image: 'images/audi-a4-2013.jpg',        model: 'A4',      year: 2013, price: 26000 },
];

class Car {
  constructor(cars) {
    this.cars = cars;
    this.carsDiv = document.querySelector('#cars');
    this.filterDiv = document.querySelector('#filters');

    this.renderCars(this.cars);
    this.renderFilters(this.filterDiv);
  }

  renderCars(cars) {
    this.carsDiv.innerHTML = cars.map(car => this.carTemplate(car)).join('');
  }

  renderFilters(filterDiv) {
    filterDiv.innerHTML = this.filtering();
  }

  carTemplate(car) {
    return `
      <div class="car">
        <figure>
          <img src="${car.image}" alt="${car.make} ${car.model}">
        </figure>
        <p>${car.make} ${car.model}</p>
        <p>Year: ${car.year}</p>
        <p>Price: $${car.price}</p>
        <button type="button" class="buy">Buy</button>
      </div>
    `;
  }

  options(values) {
    let any = `<option value="any">Any</option>`;
    let allOptions = values.map(option =>
      `<option value="${option}">${option}</option>`
    ).join('');
    return any + allOptions;
  }

  selector(filterName, values) {
    return `
      <label for="${filterName}">${filterName}</label>
      <select id="${filterName}" name="${filterName}">
        ${this.options(values)}
      </select>
    `;
  }

  filtering() {
  const fields = Object.keys(this.cars[0]); // ['make', 'image', 'model', 'year', 'price']
  
  let filterHTML = fields.map(field => {
    const uniqueValues = [...new Set(this.cars.map(car => car[field]))];
    return this.selector(field, uniqueValues);
  }).join('');

  return filterHTML + `<button type="button" class="filter">Filter</button>`;
}
}

new Car(cars);