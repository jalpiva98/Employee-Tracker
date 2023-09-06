## Employee-Tracker
# Overview
The Employee Tracker is a command-line application that allows you to manage employee data within your organization. With this application, you can perform various tasks such as viewing departments, roles, and employees, adding new departments, roles, and employees, and updating employee roles. It provides a convenient way to keep track of your workforce.

# Features
View a list of all departments in your organization.
View a list of all roles within each department.
View a list of all employees, along with their roles and managers.
Add new departments to your organization.
Add new roles to existing departments, including salary information.
Add new employees to your organization, specifying their roles and managers.
Update an employee's role within the organization.
Log out and exit the application when you're done.
Prerequisites
Before using the Employee Tracker, make sure you have the following installed:

Node.js - JavaScript runtime environment.
npm - Node.js package manager.
MySQL - MySQL Database Management System.

# Installation
Clone the repository to your local machine:

``` bash
git clone https://github.com/jalpiva98/Employee-Tracker
```
Navigate to the project directory:


``` bash
cd employee-tracker
```
Install the project dependencies:


``` bash
npm install
```
Configure the MySQL database connection by editing the db/connection.js file and providing your database credentials.


Create the database by running the SQL script provided in db/schema.sql.

Seed the database with initial data by running the SQL script provided in db/seeds.sql.

# Usage
To start the Employee Tracker, run the following command:

``` bash
node index.js
```
Follow the on-screen prompts to perform various tasks within the application. You can view, add, and update departments, roles, and employees as needed.


## License
This project is licensed under the MIT License.

# Acknowledgments
This application was created as part of [Your Name]'s coding project.
Special thanks to the inquirer package for interactive command-line prompts and MySQL for database management.
Feel free to customize this README with additional information, usage examples, troubleshooting tips, or any other relevant details about your Employee Tracker app.