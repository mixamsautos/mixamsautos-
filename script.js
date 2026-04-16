// script.js - Mixam's Autos (UK)
const cars = [
  {
    make: "Seat",
    model: "Mii 1.0 SE (60ps) 5d",
    year: 2012,
    price: 3290,
    priceDisplay: "£3,290",
    mileage: 29000,
    mileageUnit: "miles",
    color: "Red",
    fuel: "Petrol",
    transmission: "Manual",
    engine: "1.0 L",
    hp: 59,
    body: "Hatchback",
    drivetrain: "Front-wheel drive",
    desc: `2012 Seat Mii 1.0 SE (60ps) 5d

Price: £3,290
Mileage: 29,000 mi
Exterior colour: Red
Engine: 1.0 Petrol
Gearbox: Manual
Drivetrain: Front-wheel drive
MPG: 60 MPG
Fuel type: Petrol
Alloy wheels

Overview
• Make: Seat
• Model: Mii
• Year: 2012
• Variant: 1.0 SE (60ps) 5d
• Body type: Hatchback
• Exterior colour: Red
• Mileage: 29,000 mi
• Condition: Used
• Insurance group: 1
• Reg. date: 31 Oct 2012

Fuel Economy
• Fuel tank size: 35 L
• Combined: 60 MPG
• City: 50 MPG
• Highway: 72 MPG
• CO2 emissions: 105 g/km
• ULEZ compliant: Yes

Performance
• Gearbox: Manual
• Drivetrain: Front-wheel drive
• Engine: 1.0 L
• Horsepower: 59 hp

Measurements
• Doors: 5
• Seats: 4
• Height: 1478 mm
• Width: 1641 mm
• Length: 3557 mm
• Wheelbase: 2420 mm

Options
• AUX/USB connectivity
• Air conditioning
• Alloy wheels
• ISOFIX
• Privacy glass/tinted windows

History
• Passed MOT valid from 23 February 2026 to 22 February 2027
• No insurance write-offs
• No theft record
• Not imported or exported
• Not scrapped

Finance Option Available
• Deposit: £250
• Monthly payment options:
  • ~£95/month → 32 months
  • ~£100/month → 30 months`,
    img: "IMG_1568.webp",
    images: [
      "IMG_1568.webp", "IMG_1575.jpeg", "IMG_1576.jpeg", "IMG_1579.jpeg",
      "IMG_1578.jpeg", "IMG_1591.jpeg", "IMG_1587.jpeg", "IMG_1586.jpeg", "IMG_1584.jpeg"
    ]
  }
];

let currentCar = null;
let currentImageIndex = 0;

// Render inventory grid
function renderCars(carList) {
  const carGrid = document.getElementById('carGrid');
  if (!carGrid) return;
  carGrid.innerHTML = '';

  carList.forEach((car, index) => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${car.img}" alt="${car.year} ${car.model}" onerror="this.src='https://via.placeholder.com/320x200?text=No+Image';">
      <div class="car-info">
        <h3>${car.year} ${car.model}</h3>
        <p class="price">${car.priceDisplay}</p>
        <div class="car-details">
          <span>${car.mileage.toLocaleString()} ${car.mileageUnit}</span>
          <span>${car.transmission}</span>
          <span>${car.color}</span>
        </div>
        <p class="car-desc">${car.desc.substring(0, 140)}...</p>
        <button class="btn btn-primary-small view-details" data-index="${index}">View Details</button>
      </div>
    `;
    carGrid.appendChild(card);
  });

  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      currentCar = carList[idx];
      currentImageIndex = 0;
      showCarModal();
    });
  });
}

// Modal with Email-only contact button
function showCarModal() {
  if (!currentCar) return;

  let modal = document.getElementById('carModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'carModal';
    modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:2000;padding:10px;`;
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div style="background:#fff;width:100%;max-width:620px;border-radius:16px;overflow:hidden;max-height:96vh;display:flex;flex-direction:column;">
      <div style="position:relative;height:280px;background:#000;">
        <img id="modalMainImg" src="${currentCar.images[currentImageIndex]}" style="width:100%;height:100%;object-fit:cover;">
        <div id="imageCounter" style="position:absolute;top:16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.75);color:white;padding:6px 16px;border-radius:20px;font-size:15px;font-weight:600;">
          ${currentImageIndex + 1} / ${currentCar.images.length}
        </div>
        <button onclick="prevImage()" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.6);color:white;border:none;width:44px;height:44px;border-radius:50%;font-size:28px;">‹</button>
        <button onclick="nextImage()" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.6);color:white;border:none;width:44px;height:44px;border-radius:50%;font-size:28px;">›</button>
      </div>

      <div style="display:flex;gap:8px;padding:12px;overflow-x:auto;background:#f8f9fa;border-bottom:1px solid #eee;">
        ${currentCar.images.map((src, i) => `
          <img src="${src}" onclick="goToImage(${i})" 
               style="width:78px;height:58px;object-fit:cover;border-radius:8px;cursor:pointer;border:3px solid ${i === currentImageIndex ? '#2563EB' : '#ddd'};">
        `).join('')}
      </div>

      <div style="padding:20px 20px 30px;flex:1;overflow-y:auto;">
        <h2 style="font-size:26px;line-height:1.2;margin:0 0 12px;">${currentCar.year} ${currentCar.model}</h2>
        <p style="font-size:32px;font-weight:700;color:#2563EB;margin:8px 0;">${currentCar.priceDisplay}</p>
        
        <div style="display:flex;gap:20px;margin:16px 0 24px;font-size:15.5px;color:#444;">
          <div><strong>${currentCar.mileage.toLocaleString()} miles</strong></div>
          <div><strong>${currentCar.transmission}</strong></div>
          <div><strong>${currentCar.color}</strong></div>
        </div>

        <div style="white-space:pre-line;line-height:1.65;color:#333;margin-bottom:30px;">
          ${currentCar.desc}
        </div>

        <!-- Email-only Contact Button -->
        <a href="mailto:mixam1autos@outlook.com?subject=Interest in 2012 Seat Mii 1.0 SE (60ps) 5d" 
           style="display:block;background:#2563EB;color:white;padding:16px;border-radius:12px;text-align:center;font-weight:600;text-decoration:none;">
          📧 Email Us About This Car
        </a>
      </div>

      <button onclick="closeModal()" style="margin:0 20px 20px;background:#eee;color:#333;border:none;padding:14px;border-radius:999px;font-size:16px;">Close</button>
    </div>
  `;

  addSwipeSupport();
}

function addSwipeSupport() {
  const container = document.getElementById('modalMainImg');
  if (!container) return;
  let startX = 0;
  container.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  container.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 60) nextImage();
    else if (diff < -60) prevImage();
  });
}

function prevImage() {
  if (!currentCar) return;
  currentImageIndex = (currentImageIndex - 1 + currentCar.images.length) % currentCar.images.length;
  updateModalImage();
}

function nextImage() {
  if (!currentCar) return;
  currentImageIndex = (currentImageIndex + 1) % currentCar.images.length;
  updateModalImage();
}

function goToImage(index) {
  currentImageIndex = index;
  updateModalImage();
}

function updateModalImage() {
  const img = document.getElementById('modalMainImg');
  const counter = document.getElementById('imageCounter');
  if (img) img.src = currentCar.images[currentImageIndex];
  if (counter) counter.textContent = `${currentImageIndex + 1} / ${currentCar.images.length}`;
}

function closeModal() {
  const modal = document.getElementById('carModal');
  if (modal) modal.remove();
}

// Sort function
function sortCars() {
  const value = document.getElementById('sortSelect').value;
  let sorted = [...cars];
  if (value === 'price-asc') sorted.sort((a,b) => a.price - b.price);
  else if (value === 'price-desc') sorted.sort((a,b) => b.price - a.price);
  else if (value === 'year-desc') sorted.sort((a,b) => b.year - a.year);
  renderCars(sorted);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.addEventListener('change', sortCars);
  renderCars(cars);
});
