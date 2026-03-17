// Sample car data - your real Mazda B2500 added!
const cars = [
  {
    make: "Mazd",
    model: "B2500 2.5TD Pickup",
    year: 2005,
    price: 2500,
    mileage: 153000,
    desc: "Reliable and rugged Mazda B2500 pickup, perfect for work, farm, or light transport. Durable 4x4 drivetrain and manual gearbox make it ideal for all terrains and heavy-duty tasks. Crew cab (double cab) with 4 doors, seats up to 5. MOT valid until 11 February 2027. No write-offs, no theft, not imported/exported/scrapped. Viewing available, delivery on request.",
    img: "https://images.unsplash.com/photo-1502877338535-766e3a6052c0?auto=format&fit=crop&w=800&q=80",  // Exterior front/side - replace with your photo!
    extraImgs: [  // Optional: add more photos for a gallery later if you expand
      "https://images.unsplash.com/photo-1502489597346-d8389a46f1a2?auto=format&fit=crop&w=800&q=80",  // Another angle
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80"   // Rear or interior placeholder
    ],
    specs: {
      fuel: "Diesel",
      gearbox: "Manual",
      drivetrain: "Four-Wheel Drive (4x4)",
      engine: "2.5L Turbo Diesel",
      horsepower: "~107-109 hp",
      color: "White",
      body: "Pickup Truck (Crew Cab / Double Cab)",
      seats: "5 (max seating)",
      mot: "Valid until 11 February 2027"
    },
    priceNote: "+ VAT"
  },
  // Add more cars here later, e.g.:
  // { make: "Toyota", model: "Hilux", year: 2018, ... }
];

// The rest of your script.js stays the same (renderCars, sortCars, event listener)
