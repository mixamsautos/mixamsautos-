// Sample car data (add your real cars here!)
const cars = [
  {
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 24500,
    mileage: 18000,
    desc: "One owner, excellent condition, full service history.",
    img: "https://images.unsplash.com/photo-1502877338535-766e3a6052c0?auto=format&fit=crop&w=800&q=80"
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2023,
    price: 22800,
    mileage: 12000,
    desc: "Low mileage, sport edition, great fuel economy.",
    img: "https://images.unsplash.com/photo-1502489597346-d8389a46f1a2?auto=format&fit=crop&w=800&q=80"
  },
  {
    make: "Ford",
    model: "Mustang",
    year: 2021,
    price: 35800,
    mileage: 32000,
    desc: "V8 power, convertible, fun weekend driver.",
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80"
  },
  // Add more cars like this...
  // Example: { make: "BMW", model: "3 Series", year: 2020, price: 32000, mileage: 45000, desc: "...", img: "url..." }
];

const carGrid = document.getElementById('carGrid');
const sortSelect = document.getElementById('sortSelect');

// Function to render cars
function renderCars(carList) {
  carGrid.innerHTML = ''; // Clear existing
  carList.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${car.img}" alt="${car.make} ${car.model}">
      <div class="car-info">
        <h3>${car.make} ${car.model} ${car.year}</h3>
        <div class="car-details">
          <span>Mileage: ${car.mileage.toLocaleString()} mi</span>
          <span class="price">$${car.price.toLocaleString()}</span>
        </div>
        <p class="car-desc">${car.desc}</p>
        <div class="btn-group">
          <a href="#" class="btn btn-primary">View Details</a>
          <a href="https://wa.me/1234567890?text=Interested%20in%20${car.make}%20${car.model}" 
             class="btn btn-secondary" target="_blank">Contact</a>
        </div>
      </div>
    `;
    carGrid.appendChild(card);
  });
}

// Sort function
function sortCars() {
  const value = sortSelect.value;
  let sorted = [...cars];

  if (value === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (value === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (value === 'year-desc') {
    sorted.sort((a, b) => b.year - a.year);
  }

  renderCars(sorted);
}

// Initial render
renderCars(cars);

// Listen for sort change
sortSelect.addEventListener('change', sortCars);
