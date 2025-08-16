# Fake Manufacturing Data API

This is a simple in-memory API for simulating a manufacturing data system. It provides endpoints for **Users**, **Products**, **Customers**, and **Orders**. This API is ideal for testing, demos, and learning purposes.

> **Note:** Data is stored in memory and will reset whenever the server restarts.

---

## Base URL

```
https://fake-manufacturing-data-api.onrender.com
```

---

## Endpoints

### 1. Users

#### GET `/users`

Retrieve a list of users.

**Response Example:**

```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
```

#### POST `/users`

Add a new user.

**Request Body Example:**

```json
{
  "id": 3,
  "name": "Charlie"
}
```

**Response Example:**

```json
{
  "message": "User created successfully",
  "user": {
    "id": 3,
    "name": "Charlie"
  }
}
```

---

### 2. Products

#### GET `/products`

Retrieve a list of products.

**Response Example:**

```json
[
  {
    "id": 1,
    "name": "Servo Motor X200",
    "price": 120.50,
    "category": "Motor",
    "sku": "MTR-X200",
    "part_number": "PN-1001",
    "unit": "piece",
    "stock": 150,
    "description": "High torque servo motor for industrial automation.",
    "image": "https://example.com/images/motor.jpg"
  }
]
```

#### POST `/products`

Add a new product.

**Required Fields:** `name`, `price`, `sku`

**Request Body Example:**

```json
{
  "name": "Demo Product",
  "price": 99.99,
  "sku": "DEMO-001",
  "category": "Electronics",
  "stock": 100
}
```

**Response Example:**

```json
{
  "message": "Product created successfully",
  "product": {
    "id": 4378,
    "name": "Demo Product",
    "price": 99.99,
    "sku": "DEMO-001",
    "category": "Electronics",
    "stock": 100
  }
}
```

---

### 3. Customers

#### GET `/customers`

Retrieve a list of customers.

**Response Example:**

```json
[
  {
    "id": 101,
    "name": "Acme Corp",
    "contact_name": "John Doe",
    "email": "john.doe@acme.com",
    "phone": "+1-555-1234",
    "address": "123 Industrial Way, Houston, TX",
    "industry": "Automotive",
    "account_status": "Active"
  }
]
```

#### POST `/customers`

Add a new customer.

**Request Body Example:**

```json
{
  "id": 104,
  "name": "New Customer Inc.",
  "contact_name": "Alice Johnson",
  "email": "alice@newcustomer.com",
  "phone": "+1-555-9999",
  "address": "101 New Ave, Chicago, IL",
  "industry": "Logistics",
  "account_status": "Active"
}
```

**Response Example:**

```json
{
  "message": "Customer created successfully",
  "customer": {
    "id": 104,
    "name": "New Customer Inc.",
    "contact_name": "Alice Johnson",
    "email": "alice@newcustomer.com"
  }
}
```

---

### 4. Orders

#### GET `/orders`

Retrieve a list of orders.

**Response Example:**

```json
[
  {
    "id": 5001,
    "customer_id": 101,
    "order_date": "2025-08-01",
    "status": "In Progress",
    "shipping_address": "123 Industrial Way, Houston, TX",
    "total_amount": 1450.75,
    "items": [
      {
        "product_id": 1,
        "name": "Servo Motor X200",
        "quantity": 3,
        "unit_price": 120.50,
        "line_total": 361.50
      }
    ]
  }
]
```

#### POST `/orders`

Create a new order.

**Required Fields:** `customer_id`, `items` (array of products with `product_id`, `quantity`, `unit_price`)

**Request Body Example:**

```json
{
  "customer_id": 101,
  "items": [
    { "product_id": 1, "quantity": 2, "unit_price": 120.50 }
  ]
}
```

**Response Example:**

```json
{
  "message": "Order created successfully",
  "order": {
    "id": 7892,
    "customer_id": 101,
    "order_date": "2025-08-15",
    "status": "Pending",
    "total_amount": 241.00,
    "items": [
      {
        "product_id": 1,
        "quantity": 2,
        "unit_price": 120.50,
        "line_total": 241.00
      }
    ]
  }
}
```

---

### 5. Unsupported Methods

All unsupported HTTP methods return **405 Method Not Allowed**:

```json
{
  "error": "Method PATCH not allowed"
}
```

---

### Notes

* **In-Memory Storage:** Data is not persisted. Restarting the server will reset all POSTed data.
* **CORS:** Not implemented yet. Will be added later to allow only requests from specific domains (e.g., `*.fuuz.app` or `@fuuz.com` emails).
* **Port:** The server listens on `process.env.PORT || 3000`.


---

### Example `curl` Requests

**GET products:**

```bash
curl https://fake-manufacturing-data-api.onrender.com/products
```

**POST new product:**

```bash
curl -X POST https://fake-manufacturing-data-api.onrender.com/products \
-H "Content-Type: application/json" \
-d '{"name":"Demo Product","price":99.99,"sku":"DEMO-001"}'
```

---

### License

MIT License – Free to use for internal demos or learning.

