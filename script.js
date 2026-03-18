// script.js - Full version with modal for "View Details"

const cars = [
  {
    make: "MINI",
    model: "Cooper",
    year: 2010,
    price: 3989,
    priceDisplay: "£3,989",
    mileage: 83386,
    mileageUnit: "miles",
    color: "Silver",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "1.6L",
    hp: 122,
    mpg: 42,
    body: "Hatchback",
    doors: 3,
    seats: 4,
    desc: `Clean and reliable automatic hatchback with a smooth drive and great fuel economy. Perfect for city use or as a first car, with a stylish MINI design and comfortable interior.

Key Details
• Price: £3,989
• Mileage: 83,386 miles
• Exterior colour: Silver
• Fuel type: Petrol
• Gearbox: Automatic
• Drivetrain: Front-wheel drive
• Engine: 1.6L Petrol
• Horsepower: 122 hp
• MPG: 42 MPG (combined)
• ULEZ compliant: Yes

Vehicle Overview
• Make: MINI
• Model: Cooper
• Year: 2010
• Variant: 1.6 Cooper (122bhp) Hatchback Auto
• Body type: Hatchback
• Insurance group: 17
• Doors: 3
• Seats: 4

Fuel Economy
• Fuel tank size: 40 L
• City: 32 MPG
• Highway: 55 MPG

Features / Options
• Air conditioning
• Alloy wheels
• Bluetooth
• Smoker package

History
• Passed MOT
• Valid from 05 December 2025 to 07 December 2026
• No insurance write-offs
• No theft record
• Not imported or exported
• Not scrapped

Finance Option Available
• Deposit: £700
• Monthly payment: £180
• Term: 20 months

A solid, economical MINI with good performance and low running costs.

🚚 Delivery available
📩 Message to reserve or arrange viewing. 🚗`,
    img: "/IMG_9287.jpeg"
  }
  // Add more cars here later...
];

const carGrid = document.getElementById('carGrid');
const sortSelect = document.getElementById('sortSelect');

// Modal elements
const modal = document.getElementById('carModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalFullDesc = document.getElementById('modalFullDesc');
const modalWhatsApp = document.getElementById('modalWhatsApp');
const closeBtn = document.querySelector('.close');

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// Render cars function
function renderCars(carList) {
  carGrid.innerHTML = '';

  if (carList.length === 0) {
    carGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align:center; padding:3rem; color:#666;">No cars found.</p>';
    return;
  }

  carList.forEach((car, index) => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${car.img}" alt="${car.make} ${car.model} ${car.year} ${car.color || ''}">
      <div class="car-info">
        <h3>${car.make} ${car.model} ${car.year}</h3>
        <p class="price">${car.priceDisplay || '£' + car.price.toLocaleString()}</p>
        <div class="car-details">
          <span>${car.mileage.toLocaleString()} ${car.mileageUnit || 'miles'}</span>
          <span>${car.transmission || 'N/A'} • ${car.fuel || 'N/A'}</span>
          <span>${car.color || 'N/A'}</span>
        </div>
        <p class="car-desc">${car.desc.substring(0, 120)}...</p>
        <div class="btn-group">
          <button class="btn btn-primary view-details" data-index="${index}">View Details</button>
          <a href="https://wa.me/1234567890?text=Interested%20in%20${encodeURIComponent(car.make + ' ' + car.model + ' ' + car.year + ' - ' + car.priceDisplay)}" 
             class="btn btn-secondary" target="_blank">Contact</a>
        </div>
      </div>
    `;
    carGrid.appendChild(card);
  });

  // Attach listeners to newly created buttons
  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      const car = carList[index]; // Use displayed list (sorted if applicable)

      modalTitle.textContent = `${car.make} ${car.model} ${car.year} – ${car.priceDisplay}`;
      modalImg.src = car.img;
      modalImg.alt = `${car.make} ${car.model} ${car.year}`;
      modalFullDesc.textContent = car.desc;

      modalWhatsApp.href = `https://wa.me/1234567890?text=Interested%20in%20${encodeURIComponent(car.make + ' ' + car.model + ' ' + car.year + ' - ' + car.priceDisplay + ' - Full details please')}`;
      modalWhatsApp.textContent = `Contact about ${car.make} ${car.model}`;

      modal.style.display = 'flex';
    });
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
