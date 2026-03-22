// script.js - CarGurus-style layout + modal + payment

const cars = [
  {
    make: "MINI",
    model: "Cooper",
    year: 2010,
    price: 3989,
    priceDisplay: "£3,989",
    marketPrice: 4726,
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
    img: "/IMG_9287.jpeg",
    images: [
      "/IMG_9287.jpeg",
      "/IMG_9288.jpeg",
      "/IMG_9289.jpeg",
      "/IMG_9290.jpeg",
      "/IMG_9291.jpeg",
      "/IMG_9292.jpeg",
      "/IMG_9293.jpeg",
      "/IMG_9294.jpeg",
      "/IMG_9295.jpeg",
      "/IMG_9296.jpeg",
      "/IMG_9297.jpeg"
    ]
  },

  // Add your other cars here...
];

document.addEventListener('DOMContentLoaded', () => {
  const carGrid = document.getElementById('carGrid');
  const sortSelect = document.getElementById('sortSelect');
  const modal = document.getElementById('carModal');
  const modalImg = document.getElementById('modalImg');
  const thumbnails = document.getElementById('thumbnails');
  const modalTitle = document.getElementById('modalTitle');
  const modalFullDesc = document.getElementById('modalFullDesc');
  const modalEmail = document.getElementById('modalEmail');
  const closeBtn = document.querySelector('.close');

  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  function renderCars(carList) {
    carGrid.innerHTML = '';

    if (carList.length === 0) {
      carGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align:center; padding:3rem; color:#666;">No cars found.</p>';
      return;
    }

    carList.forEach((car, index) => {
      const savings = car.marketPrice ? car.marketPrice - car.price : 0;
      const savingsText = savings > 0 ? `£${savings.toLocaleString()} below` : '';

      const card = document.createElement('div');
      card.className = 'car-card';
      card.innerHTML = `
        ${savings > 0 ? `
          <div class="price-badge">
            <span class="deal">Great Deal</span>
            <span class="savings">${savingsText}</span>
          </div>
        ` : ''}
        <img src="${car.img}" alt="${car.make} ${car.model} ${car.year}">
        <div class="car-info">
          <h3>${car.make} ${car.model} ${car.year}</h3>
          <p class="price">${car.priceDisplay}</p>
          <div class="car-details">
            <span>${car.mileage.toLocaleString()} ${car.mileageUnit}</span>
            <span>${car.transmission} • ${car.fuel}</span>
            <span>${car.color}</span>
          </div>
          <p class="car-desc">${car.desc.substring(0, 130)}...</p>
          <div class="btn-group">
            <button class="btn btn-primary view-details" data-index="${index}">View Details</button>
            <a href="mailto:mixam1autos@outlook.com?subject=Enquiry%20about%20${encodeURIComponent(car.make + ' ' + car.model + ' ' + car.year)}&body=Hi,%0AI%20am%20interested%20in%20${encodeURIComponent(car.make + ' ' + car.model + ' ' + car.year)}%20priced%20at%20${car.priceDisplay}.%0A%0APlease%20provide%20more%20details.%0A%0AThank%20you!" 
               class="btn btn-secondary">Contact</a>
          </div>
        </div>
      `;
      carGrid.appendChild(card);
    });

    document.querySelectorAll('.view-details').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        const car = carList[index];

        modalTitle.textContent = `${car.make} ${car.model} ${car.year}`;
        modalImg.src = car.img;
        modalFullDesc.textContent = car.desc;

        modalEmail.href = `mailto:mixam1autos@outlook.com?subject=Enquiry%20about%20${encodeURIComponent(car.make + ' ' + car.model + ' ' + car.year)}&body=Hi,%0AI%20am%20interested%20in%20${encodeURIComponent(car.make + ' ' + car.model + ' ' + car.year)}%20priced%20at%20${car.priceDisplay}.%0A%0APlease%20provide%20more%20details.%0A%0AThank%20you!`;

        thumbnails.innerHTML = '';
        car.images.forEach(src => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = "Car photo";
          img.onclick = () => modalImg.src = src;
          thumbnails.appendChild(img);
        });

        modal.style.display = 'flex';
      });
    });
  }

  function sortCars() {
    let sorted = [...cars];
    const val = sortSelect.value;
    if (val === 'price-asc') sorted.sort((a,b) => a.price - b.price);
    if (val === 'price-desc') sorted.sort((a,b) => b.price - a.price);
    if (val === 'year-desc') sorted.sort((a,b) => b.year - a.year);
    renderCars(sorted);
  }

  renderCars(cars);
  sortSelect.addEventListener('change', sortCars);
});
