const cars = [
  // 1. 2009 Peugeot 308 – £1,000 (new)
  {
    make: "Peugeot",
    model: "308",
    year: 2009,
    price: 1000,
    priceDisplay: "£1,000",
    mileage: 91000,
    mileageUnit: "miles",
    color: "Silver",
    fuel: "Petrol",
    transmission: "Manual",
    engine: "1.4L",
    hp: 95,
    mpg: 41,
    body: "Hatchback",
    doors: 5,
    seats: 5,
    desc: `**2009 Peugeot 308 1.4 S 5 Door – £1,000**

Affordable and reliable hatchback 🔥 Perfect for a first car or daily driving, with low running costs and good fuel economy.

**Key Details**  
• Price: £1,000  
• Mileage: 91,000 miles  
• Exterior colour: Silver  
• Fuel type: Petrol  
• Gearbox: Manual  
• Drivetrain: Front-wheel drive  
• Engine: 1.4L Petrol  
• Horsepower: 95 hp  
• MPG: 41 MPG (combined)  
• ULEZ compliant: Yes  

**Vehicle Overview**  
• Make: Peugeot  
• Model: 308  
• Year: 2009  
• Variant: 1.4 S 5d  
• Body type: Hatchback  
• Doors: 5  
• Seats: 5  

**Fuel Economy**  
• Fuel tank size: 60 L  
• City: 31 MPG  
• Highway: 54 MPG  

**Features / Options**  
• ISOFIX  
• Privacy glass  
• Alarm/immobiliser  
• Practical 5-door design  

**History**  
• Passed MOT  
• Valid from 02 September 2025 to 01 September 2026  
• No insurance write-offs  
• No theft record  
• Not imported or exported  
• Not scrapped  

**Warranty**  
• 6 months warranty included ✔️  

**Finance Option Available**  
• Deposit: £200  
• Monthly payment: £100  
• Term: 10 months  

A budget-friendly car that’s ideal for new drivers or anyone looking for a cheap, reliable runaround.`,
    img: "/IMG_9641.jpeg",  // change to your best main photo if needed
    images: [
      "/IMG_9641.jpeg", "/IMG_9642.jpeg", "/IMG_9643.jpeg", "/IMG_9644.jpeg", "/IMG_9645.jpeg",
      "/IMG_9646.jpeg", "/IMG_9647.jpeg", "/IMG_9648.jpeg", "/IMG_9649.jpeg", "/IMG_9650.jpeg",
      "/IMG_9651.jpeg", "/IMG_9652.jpeg", "/IMG_9653.jpeg"
    ]
  },

  // 2. 2016 Land Rover Range Rover Evoque – £5,500 (new)
  {
    make: "Land Rover",
    model: "Range Rover Evoque",
    year: 2016,
    price: 5500,
    priceDisplay: "£5,500",
    mileage: 124000,
    mileageUnit: "miles",
    color: "Red",
    fuel: "Diesel",
    transmission: "Automatic",
    engine: "2.0L",
    hp: 180,
    mpg: 53,
    body: "SUV / Crossover",
    doors: 5,
    seats: 5,
    desc: `**2016 Land Rover Range Rover Evoque 2.0 TD4 SE Auto – £5,500**

Stylish, premium SUV with great fuel economy and strong performance 🔥 A perfect mix of luxury, comfort, and everyday practicality.

**Key Details**  
• Price: £5,500  
• Mileage: 124,000 miles  
• Exterior colour: Red  
• Fuel type: Diesel  
• Gearbox: Automatic  
• Drivetrain: Four-wheel drive  
• Engine: 2.0L Diesel  
• Horsepower: 180 hp  
• MPG: 53 MPG (combined)  
• ULEZ compliant: Yes  

**Vehicle Overview**  
• Make: Land Rover  
• Model: Range Rover Evoque  
• Year: 2016  
• Variant: 2.0 TD4 SE Auto  
• Body type: SUV / Crossover  
• Doors: 5  
• Seats: 5  

**Fuel Economy**  
• Fuel tank size: 63 L  
• City: 46 MPG  
• Highway: 62 MPG  

**Features / Options**  
• Satellite navigation  
• Panoramic sunroof  
• Heated seats  
• Parking assist  
• Cruise control  
• Bluetooth & DAB radio  
• Climate control  
• Alloy wheels  
• ISOFIX  

**History**  
• Passed MOT  
• Valid from 02 September 2025 to 01 September 2026  
• No insurance write-offs  
• No theft record  
• Not imported or exported  
• Not scrapped  

**Warranty**  
• 6 months warranty included ✔️  

**Finance Option Available**  
• Deposit: £1,000  
• Monthly payment: £250  
• Term: 24 months  

A premium SUV with modern features, strong performance, and excellent road presence.

🚚 Delivery available`,
    img: "/IMG_9662.jpeg",  // main photo – change if you prefer another
    images: [
      "/IMG_9662.jpeg", "/IMG_9661.jpeg", "/IMG_9659.jpeg", "/IMG_9675.jpeg", "/IMG_9668.jpeg",
      "/IMG_9670.jpeg", "/IMG_9664.jpeg", "/IMG_9667.jpeg", "/IMG_9666.jpeg", "/IMG_9669.jpeg",
      "/IMG_9672.jpeg", "/IMG_9671.jpeg", "/IMG_9673.jpeg", "/IMG_9674.jpeg", "/IMG_9663.jpeg",
      "/IMG_9660.jpeg", "/IMG_9682.jpeg"
    ]
  },

  // Add your other cars here (MINI, Mercedes, Audi, etc.)
  // Example for MINI (copy full object from your previous script.js):
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
    desc: `**2010 MINI Cooper – Clean & Reliable Automatic Hatchback** ... (paste full desc)`,
    img: "/IMG_9287.jpeg",
    images: ["/IMG_9287.jpeg", "/IMG_9288.jpeg", /* etc */]
  },

  // ... paste Mercedes and Audi here too
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
      const card = document.createElement('div');
      card.className = 'car-card';
      card.innerHTML = `
        <img src="${car.img}" alt="${car.year} ${car.make} ${car.model}">
        <div class="car-info">
          <h3>${car.year} ${car.make} ${car.model}</h3>
          <p class="price">${car.priceDisplay}</p>
          <div class="car-details">
            <span>${car.mileage.toLocaleString()} ${car.mileageUnit}</span>
            <span>${car.transmission} • ${car.fuel}</span>
            <span>${car.color}</span>
          </div>
          <p class="car-desc">${car.desc.substring(0, 140)}...</p>
          <div class="btn-group">
            <button class="btn btn-primary view-details" data-index="${index}">View Details</button>
            <a href="mailto:mixam1autos@outlook.com?subject=Enquiry%20about%20${encodeURIComponent(car.year + ' ' + car.make + ' ' + car.model)}&body=Hi,%0AI%20am%20interested%20in%20${encodeURIComponent(car.year + ' ' + car.make + ' ' + car.model)}%20priced%20at%20${car.priceDisplay}.%0A%0APlease%20provide%20more%20details.%0A%0AThank%20you!" 
               class="btn btn-secondary" target="_blank">Contact</a>
          </div>
        </div>
      `;
      carGrid.appendChild(card);
    });

    document.querySelectorAll('.view-details').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        const car = carList[index];

        modalTitle.textContent = `${car.year} ${car.make} ${car.model}`;
        modalImg.src = car.img;
        modalFullDesc.innerHTML = car.desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

        modalEmail.href = `mailto:mixam1autos@outlook.com?subject=Enquiry%20about%20${encodeURIComponent(car.year + ' ' + car.make + ' ' + car.model)}&body=Hi,%0AI%20am%20interested%20in%20${encodeURIComponent(car.year + ' ' + car.make + ' ' + car.model)}%20priced%20at%20${car.priceDisplay}.%0A%0APlease%20provide%20more%20details.%0A%0AThank%20you!`;

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
    const value = sortSelect.value;
    if (value === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (value === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (value === 'year-desc') sorted.sort((a, b) => b.year - a.year);
    renderCars(sorted);
  }

  renderCars(cars);
  sortSelect.addEventListener('change', sortCars);
});
