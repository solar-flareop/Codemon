const productModel = require("../models/productModel");
const request = require("supertest");
const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;
let db;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const mongoose = require("mongoose");
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = mongoose.connection;
});

afterAll(async () => {
  await mongod.stop();
  await db.close();
});

//Test the GET all products route
describe("GET /api/v1/products", () => {
  test("should respond with 200 status and products array", async () => {
    const response = await request(app).get("/api/v1/products");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.products).toBeDefined();
    expect(Array.isArray(response.body.products)).toBe(true);
  });
});

// Test the GET product by ID route
describe("GET /api/v1/product/:id", () => {
  test("should respond with 200 status and product object", async () => {
    const product = {
      name: "Product 1",
      price: 10,
      description: "A sample product",
    };
    const createdProduct = await productModel.create(product);
    const response = await request(app).get(
      `/api/v1/product/${createdProduct._id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.product._id).toBe(createdProduct._id.toString());
  });

  test("should respond with 404 status and error message if product not found", async () => {
    const response = await request(app).get(
      "/api/v1/product/645e853eb53751524e7efd4a"
    );
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Product not found");
  });
});

// Test the PUT product price by ID route
describe("PUT /api/v1/product/:id", () => {
  test("should respond with 200 status and updated product object if price is valid", async () => {
    const product = {
      name: "Product 1",
      price: 10,
      description: "Test product",
    };

    const createdProduct = await productModel.create(product);
    const updatedPrice = { price: 15 };
    const response = await request(app)
      .put(`/api/v1/product/${createdProduct._id}`)
      .send(updatedPrice);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.updatedProduct.price).toBe(updatedPrice.price);
  });

  test("should respond with 400 status and error message if price is not a number", async () => {
    const product = {
      name: "Product 1",
      price: 10,
      description: "Test product",
    };

    const createdProduct = await productModel.create(product);
    const updatedPrice = { price: "invalid" };
    const response = await request(app)
      .put(`/api/v1/product/${createdProduct._id}`)
      .send(updatedPrice);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Price must be a number");
  });

  test("should respond with 404 status and error message if product not found", async () => {
    const invalidId = "609dab2c51d2c31ea86ab6b3";
    const newPrice = 15;
    const response = await request(app)
      .put(`/api/v1/product/${invalidId}`)
      .send({ price: newPrice });
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Product not found");
  });
});
