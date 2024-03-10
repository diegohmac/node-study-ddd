# Mapping the domain

💡 In this activity, you will read a conversation between a Domain Expert and a developer responsible for creating the application. Your goal is to identify the entities and use cases for this application based on this conversation!

## Ubiquitous conversation

`Dev`: Hello, thank you for participating in the interview. To begin, what are the main features you would like to see in this inventory management system?

`Domain Expert`: We need a solution that allows us to track each product individually, set minimum stock quantities, and receive alerts when we're running low on a particular product. It would also be helpful if we could view sales and inventory history to help make future purchasing decisions.

`Dev`: Understood. Could you give me an example of how you would like the individual product tracking functionality to work?

`Domain Expert`: We would like to be able to assign a unique identification number to each product, so we can easily track its movements in our inventory. It would also be helpful if we could add extra information, such as size and color, to make tracking even more accurate.

`Dev`: And what about the functionality of defining minimum stock quantities, how would you imagine that working?

`Domain Expert`: We would like to be able to set a minimum limit for each product, so that we can receive an alert when the stock is approaching the end. This would help us ensure that we never run out of a popular product and would also allow us to make more efficient orders.

`Dev`: How would you like to receive these alerts? By email, SMS, or some other method?

`Domain Expert`: It would be great if we could receive alerts by email and also through a notification in our inventory management system.

`Dev`: Understood. And regarding the functionality of viewing sales and inventory history, what kind of information would you like to see?

`Domain Expert`: We would like to be able to see how many products we sold in a given period, what was the profit generated per product, and which products are selling better in each period. It would also be helpful if we could observe inventory trends over time to help us make more appropriate purchasing decisions.

`Dev`: Okay, do you have any other functionality you would like to see in the system?

`Domain Expert`: It would be very helpful if the system could allow us to create and manage purchase orders automatically, based on the defined minimum stock quantities and sales trends. It would also be great if we could integrate the system with our suppliers, so that we could receive automatic updates about the delivery deadlines for new shipments.

---

## Domains
### Inventory Management
This domain packs all functionalities related to the control and monitoring of product inventory.

## Use Cases
### Individual Product Tracking
- Assignment of unique identification numbers to each product.
- Addition of extra information, such as size and color, for accurate tracking.

### Definition of Minimum Stock Quantities
- Establishment of minimum limits for each product.
- Receipt of alerts when inventory is approaching the minimum limit.

### Alert Reception
- Receipt of alerts via email and notification in the system when inventory is approaching the minimum limit.

### Viewing Sales and Inventory History
- Viewing sales by period, profit per product, and best-selling products.
- Observing inventory trends over time.

### Creation and Management of Automatic Purchase Orders
- Automatic creation of purchase orders based on minimum stock quantities and sales trends.
- Integration with suppliers to receive automatic updates about delivery deadlines.

## Entities
### Product
- Represents an item being sold or stored in inventory.
- Attributes: Unique ID, name, description, category, size, color, etc.
### Purchase Order
- Represents a request to purchase products to replenish inventory.
- Attributes: Unique ID, products to be purchased, quantity, supplier, creation date, etc.
### Sale
- Represents a transaction of selling products.
- Attributes: Unique ID, products sold, quantity, price, customer, sale date, etc.
### Inventory Alert
- Represents an alert generated when the inventory of a product is approaching the minimum limit.
- Attributes: Unique ID, affected product, alert type (email, notification), issuance date, etc.