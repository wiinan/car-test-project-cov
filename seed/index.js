const { faker } = require("@faker-js/faker");
const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Customer = require("../src/entities/customer");
const { join } = require("path");
const { writeFile } = require("fs/promises");

const seederBaseFolder = join(__dirname, "../", "database");
const ITEMS_AMOUNT = 2;
const cars = [];
const customers = [];

const carCategory = new CarCategory({
  id: faker.random.alphaNumeric(12),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

for (let i = 0; i <= ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.random.alphaNumeric(12),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });

  const customer = new Customer({
    id: faker.random.alphaNumeric(12),
    name: faker.name.findName(),
    age: faker.datatype.number({ min: 18, max: 50 }),
  });

  cars.push(car);
  carCategory.carIds.push(car.id);
  customers.push(customer);
}

const write = (fileName, data) =>
  writeFile(join(seederBaseFolder, fileName), JSON.stringify(data));

(async () => {
  await write("cars.json", cars);
  await write("customers.json", customers);
  await write("carCategory.json", [carCategory]);

  console.log(cars);
  console.log(customers);
  console.log(carCategory);
})();
