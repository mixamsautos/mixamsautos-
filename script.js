// script.js - With Flutterwave Inline for reservation/full payment

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
  }
];

const carGrid = document.getElementById('carGrid');
const sortSelect = document.getElementById('sortSelect');

// Modal elements
const modal = document.getElementById('carModal');
const modalImg = document.getElementById('modalImg');
const thumbnails = document.getElementById('thumbnails');
const modalTitle = document.getElementById('modalTitle');
const modalFullDesc = document.getElementById('modalFullDesc');
const modalWhatsApp = document.getElementById('modalWhatsApp');
const closeBtn = document.querySelector('.close');
const reserveViewBtn = document.getElementById('reserveViewBtn');
const reserveDeliveryBtn = document.getElementById('reserveDeliveryBtn');
const buyNowBtn = document.getElementById('buyNowBtn');

// Flutterwave public key - REPLACE WITH YOUR REAL ONE!
const FLW_PUBLIC_KEY = "FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // ← Your public key here (test or live)

// Current car
let currentCar = null;

// Close modal
closeBtn.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

// Render cars
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
        <p class="price">${car.priceDisplay}</p>
        <div class="car-details">
          <span>${car.mileage.toLocaleString()} ${car.mileageUnit}</span>
          <span>${car.transmission} • ${car.fuel}</span>
          <span>${car.color}</span>
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

  // View Details listener
  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      currentCar = carList[index];

      modalTitle.textContent = `${currentCar.make} ${currentCar.model} ${currentCar.year} – ${currentCar.priceDisplay}`;
      modalImg.src = currentCar.img;
      modalFullDesc.textContent = currentCar.desc;

      modalWhatsApp.href = `https://wa.me/1234567890?text=Interested%20in%20${encodeURIComponent(currentCar.make + ' ' + car.model + ' ' + car.year + ' - ' + currentCar.priceDisplay)}`;

      // Thumbnails
      thumbnails.innerHTML = '';
      currentCar.images.forEach((src, i) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.alt = `Photo ${i+1}`;
        thumb.onclick = () => modalImg.src = src;
        thumbnails.appendChild(thumb);
      });

      modal.style.display = 'flex';
    });
  });
}

// Sort
function sortCars() {
  let sorted = [...cars];
  const val = sortSelect.value;
  if (val === 'price-asc') sorted.sort((a,b) => a.price - b.price);
  if (val === 'price-desc') sorted.sort((a,b) => b.price - a.price);
  if (val === 'year-desc') sorted.sort((a,b) => b.year - a.year);
  renderCars(sorted);
}

// Flutterwave payment function
function makePayment(amount, description, type = 'reservation') {
  if (!currentCar) return alert("No car selected.");

  const txRef = `mixamautos-${currentCar.make.toLowerCase()}-${Date.now()}`;

  FlutterwaveCheckout({
    public_key: FLW_PUBLIC_KEY,
    tx_ref: txRef,
    amount: amount,
    currency: "GBP",
    payment_options: "card, banktransfer, ussd, mobilemoney", // adjust as per your setup
    redirect_url: window.location.href, // refresh after payment or change to success page
    customer: {
      email: prompt("Your email for receipt:") || "customer@example.com",
      phone_number: prompt("Your phone number:") || "",
      name: prompt("Your full name:") || "Customer",
    },
    customizations: {
      title: `${type === 'full' ? 'Full Purchase' : 'Reservation'} - ${currentCar.make} ${currentCar.model} ${currentCar.year}`,
      description: description,
      logo: window.location.origin + currentCar.img
    },
    callback: (response) => {
      console.log(response);
      if (response.status === "successful") {
        alert(`Payment successful! Ref: ${response.tx_ref}\nWe'll confirm your reservation/purchase shortly. Fee is refundable after viewing/delivery.`);
        // Optional: mark as reserved in localStorage
        localStorage.setItem(`reserved_${txRef}`, JSON.stringify({ car: `${currentCar.make} ${currentCar.model}`, amount, date: new Date().toISOString() }));
      } else {
        alert("Payment failed or cancelled.");
      }
      modal.style.display = 'none';
    },
    onclose: () => {
      // User closed popup
    }
  });
}

// Button listeners
reserveViewBtn.onclick = () => makePayment(300, "Refundable £300 reservation for viewing & test drive");
reserveDeliveryBtn.onclick = () => makePayment(500, "Refundable £500 reservation for delivery & test drive");
buyNowBtn.onclick = () => makePayment(currentCar.price, "Full payment for vehicle purchase", 'full');

// Initial
renderCars(cars);
sortSelect.addEventListener('change', sortCars);
