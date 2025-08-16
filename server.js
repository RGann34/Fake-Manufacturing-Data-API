const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies


// In-Memory Storage
let products = [];
let orders = [];

// Get Endpoint Users
app.get('/users', (req, res) => {
    res.json(
        [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ]
    );
});

// Get Endpoint Products
app.get('/products', (req, res) => {
    res.json(
        [
            {
                id: 1,
                name: "Servo Motor X200",
                price: 120.50,
                category: "Motor",
                sku: "MTR-X200",
                part_number: "PN-1001",
                unit: "piece",
                stock: 150,
                description: "High torque servo motor for industrial automation.",
                image: "https://example.com/images/motor.jpg"
            },
            {
                id: 2,
                name: "Conveyor Belt A300",
                price: 850.00,
                category: "Assembly Line",
                sku: "CB-A300",
                part_number: "PN-1002",
                unit: "meter",
                stock: 400,
                description: "Durable conveyor belt used in material handling systems.",
                image: "https://example.com/images/conveyor.jpg"
            },
            {
                id: 3,
                name: "PLC Controller S10",
                price: 450.75,
                category: "Electronics",
                sku: "PLC-S10",
                part_number: "PN-1003",
                unit: "unit",
                stock: 75,
                description: "Programmable Logic Controller with 10 input/output ports.",
                image: "https://example.com/images/plc.jpg"
            },
            {
                id: 4,
                name: "Hydraulic Pump Z9",
                price: 1200.00,
                category: "Hydraulics",
                sku: "HP-Z9",
                part_number: "PN-1004",
                unit: "unit",
                stock: 30,
                description: "Industrial-grade hydraulic pump used in heavy machinery.",
                image: "https://example.com/images/pump.jpg"
            },
            {
                id: 5,
                name: "Precision Bearing B5",
                price: 35.25,
                category: "Mechanical",
                sku: "BRG-B5",
                part_number: "PN-1005",
                unit: "set",
                stock: 500,
                description: "High-precision ball bearing for rotating shafts.",
                image: "https://example.com/images/bearing.jpg"
            }
        ]
    );
});
//adding comit to submit commit
// Get Endpoint Customers
app.get('/customers', (req, res) => {
    res.json([
        {
            id: 101,
            name: "Acme Corp",
            contact_name: "John Doe",
            email: "john.doe@acme.com",
            phone: "+1-555-1234",
            address: "123 Industrial Way, Houston, TX",
            industry: "Automotive",
            account_status: "Active"
        },
        {
            id: 102,
            name: "Globex Industries",
            contact_name: "Jane Smith",
            email: "jane.smith@globex.com",
            phone: "+1-555-5678",
            address: "456 Enterprise Rd, Detroit, MI",
            industry: "Aerospace",
            account_status: "Active"
        },
        {
            id: 103,
            name: "Initech Solutions",
            contact_name: "Peter Gibbons",
            email: "pgibbons@initech.com",
            phone: "+1-555-2468",
            address: "789 Software Blvd, Austin, TX",
            industry: "Technology",
            account_status: "On Hold"
        }
    ]);
});

// Get Endpoint Orders
app.get('/orders', (req, res) => {
    res.json([
        {
            id: 5001,
            customer_id: 101,
            order_date: "2025-08-01",
            status: "In Progress",
            shipping_address: "123 Industrial Way, Houston, TX",
            total_amount: 1450.75,
            items: [
                {
                    product_id: 1,
                    name: "Servo Motor X200",
                    quantity: 3,
                    unit_price: 120.50,
                    line_total: 361.50
                },
                {
                    product_id: 3,
                    name: "PLC Controller S10",
                    quantity: 2,
                    unit_price: 450.75,
                    line_total: 901.50
                }
            ]
        },
        {
            id: 5002,
            customer_id: 102,
            order_date: "2025-08-03",
            status: "Shipped",
            shipping_address: "456 Enterprise Rd, Detroit, MI",
            total_amount: 1200.00,
            items: [
                {
                    product_id: 4,
                    name: "Hydraulic Pump Z9",
                    quantity: 1,
                    unit_price: 1200.00,
                    line_total: 1200.00
                }
            ]
        },
        {
            id: 5003,
            customer_id: 103,
            order_date: "2025-08-04",
            status: "Pending Approval",
            shipping_address: "789 Software Blvd, Austin, TX",
            total_amount: 105.75,
            items: [
                {
                    product_id: 5,
                    name: "Precision Bearing B5",
                    quantity: 3,
                    unit_price: 35.25,
                    line_total: 105.75
                }
            ]
        }
    ]);
});

// Post Endpoint Users
app.post('/users', (req, res) => {
    const newUser = req.body;
    // In a real application, you would save the new user to a database here
    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    });
});

// Post Endpoint Products
app.post('/products', (req, res) => {
    const newProduct = req.body;
    // Check if required fields are present
    if (!newProduct.name || !newProduct.price || !newProduct.sku) {
        return res.status(201).json({
            error: 'PMissing Required fields: name, price, sku'
        });
    }
    // In a real system, you'd save this to a DB
    newProduct.id = Math.floor(Math.random() * 10000); // Simulate ID assignment
    products.push(newProduct);
    res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    });
});

// Post Endpoint Customers
app.post('/customers', (req, res) => {
    const newCustomer = req.body;
    // In a real application, you would save the new customer to a database here
    res.status(201).json({
        message: 'Customer created successfully',
        customer: newCustomer
    });
});

// POST Endpoint Orders
app.post('/orders', (req, res) => {
  const newOrder = req.body;

  if (!newOrder.customer_id || !Array.isArray(newOrder.items) || newOrder.items.length === 0) {
    return res.status(400).json({ error: "Missing customer_id or items" });
  }

  // Optional: Calculate totals
  let totalAmount = 0;
  newOrder.items = newOrder.items.map(item => {
    item.line_total = item.unit_price * item.quantity;
    totalAmount += item.line_total;
    return item;
  });

  newOrder.id = Math.floor(Math.random() * 10000);
  newOrder.order_date = newOrder.order_date || new Date().toISOString().split("T")[0];
  newOrder.status = newOrder.status || "Pending";
  newOrder.total_amount = totalAmount;
  orders.push(newOrder);
  res.status(201).json({
    message: "Order created successfully",
    order: newOrder
  });
});

// Start the server

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
