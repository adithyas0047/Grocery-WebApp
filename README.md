# Grocery WebApp

A comprehensive grocery shopping web application built with modern web technologies. This application enables users to browse products, add them to cart, and complete purchases with a seamless shopping experience.

## 📋 Features

- **User Authentication**: Secure login and registration system
- **Product Browsing**: View groceries categorized by type
- **Shopping Cart**: Add and remove items from your cart
- **Responsive Design**: Works across desktop and mobile devices
- **Search Functionality**: Find products quickly

## 🛠️ Technologies Used

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript
  - Bootstrap 5

- **Backend**:
  - MySQL Database
  - PHP
  - Springboot

## 🚀 Getting Started

### Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adithyas0047/Grocery-WebApp.git
   cd Grocery-WebApp
   ```

2. **Configure database**
   - Create a MySQL database
   - Import the SQL file from the `database` folder
   - Update the database connection details in `config/db_connect.php`

3. **Set up server**
   - Configure your web server to point to the project directory
   - Ensure PHP is properly set up on your server

4. **Launch the application**
   - Open your browser and navigate to your server's URL

## 📂 Project Structure

```
Grocery-WebApp/
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── config/
│   └── db_connect.php
├── includes/
│   ├── header.php
│   └── footer.php
├── pages/
│   ├── login.php
│   ├── register.php
│   ├── products.php
│   └── cart.php
├── database/
│   └── grocery_db.sql
├── .htaccess
├── index.php
└── README.md
```

## 💻 Usage

1. Register a new account or login with existing credentials
2. Browse through various grocery categories
3. Add desired items to your shopping cart
4. Proceed to checkout and enter shipping details
5. Complete your purchase

## 🔧 Configuration

The application can be configured by modifying the following files:
- `config/db_connect.php`: Database connection settings
- `config/config.php`: Application-wide settings

### Contributors

- [Shreyas N](https://github.com/Sheryas-N22) - Project Lead
- [Adithya S](https://github.com/adithyas0047) - Contributor

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Contact

Adithya S - [LinkedIn](https://www.linkedin.com/in/adithya-s-027342237/)

Project Link: [https://github.com/adithyas0047/Grocery-WebApp](https://github.com/adithyas0047/Grocery-WebApp)

## 🙏 Acknowledgements

- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [PHP Documentation](https://www.php.net/docs.php)
