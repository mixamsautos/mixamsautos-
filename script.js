const cars = [
  { year: 2010, make: "MINI", model: "Cooper", price: 3989, priceDisplay: "£3,989", mileage: 83386, color: "Silver", fuel: "Petrol", transmission: "Automatic", img: "/IMG_9287.jpeg", images: ["/IMG_9287.jpeg","/IMG_9288.jpeg","/IMG_9290.jpeg"] },
  { year: 2016, make: "Mercedes-Benz", model: "C-Class", price: 6500, priceDisplay: "£6,500", mileage: 109000, color: "White", fuel: "Hybrid", transmission: "Automatic", img: "/IMG_9738.jpeg", images: ["/IMG_9738.jpeg","/IMG_9739.jpeg","/IMG_9740.jpeg"] },
  { year: 2021, make: "Audi", model: "A1", price: 5800, priceDisplay: "£5,800", mileage: 80028, color: "Black", fuel: "Petrol", transmission: "Automatic", img: "/IMG_9792.jpeg", images: ["/IMG_9792.jpeg","/IMG_9793.jpeg","/IMG_9794.jpeg"] }
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
  modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

  function renderCars(list) {
    carGrid.innerHTML = '';
    list.forEach((car, i) => {
      const card = document.createElement('div');
      card.className = 'car-card';
      card.innerHTML = `
        <img src="${car.img}" alt="${car.year} ${car.make} ${car.model}">
        <div class="car-info">
          <h3>${car.year} ${car.make} ${car.model}</h3>
          <p class="price">${car.priceDisplay}</p>
          <div class="car-details">
            <span>${car.mileage.toLocaleString()} miles</span>
            <span>${car.transmission} • ${car.fuel}</span>
            <span>${car.color}</span>
          </div>
          <div class="btn-group">
            <button class="btn btn-primary view-details" data-index="${i}">View Details</button>
            <a href="mailto:mixam1autos@outlook.com?subject=Enquiry%20${car.year}%20${car.make}%20${car.model}" class="btn btn-secondary">Contact</a>
          </div>
        </div>
      `;
      carGrid.appendChild(card);
    });

    document.querySelectorAll('.view-details').forEach(btn => {
      btn.addEventListener('click', () => {
        const car = list[btn.dataset.index];
        modalTitle.textContent = `${car.year} ${car.make} ${car.model}`;
        modalImg.src = car.img;

        thumbnails.innerHTML = '';
        car.images.forEach(src => {
          const img = document.createElement('img');
          img.src = src;
          img.onclick = () => modalImg.src = src;
          thumbnails.appendChild(img);
        });

        modalEmail.href = `mailto:mixam1autos@outlook.com?subject=Enquiry%20${car.year}%20${car.make}%20${car.model}`;
        modal.style.display = 'flex';
      });
    });
  }

  function sortCars() {
    let sorted = [...cars];
    const v = sortSelect.value;
    if (v === 'price-asc') sorted.sort((a,b) => a.price - b.price);
    if (v === 'price-desc') sorted.sort((a,b) => b.price - a.price);
    if (v === 'year-desc') sorted.sort((a,b) => b.year - a.year);
    renderCars(sorted);
  }

  renderCars(cars);
  sortSelect.addEventListener('change', sortCars);
});
