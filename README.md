# Creating of database

As part of the prerequisites, you installed and configured MySQL, which included creating a user. Now you will create an empty database.

To do that, first, you need to **log in to your MySQL instance**. If you are using a locally running MySQL instance, you can use the following command, replacing your_username with your MySQL username:

> $ mysql -u your_username -p

**-u is username** and the **-p option** is passed if the account is secured with a **password**.

The MySQL server will ask for your database password. Type your password and press ENTER.

Once you’re logged in, use the **MySQL CLI** create a database called cafemanager using the following command:

> mysql> CREATE DATABASE cafemanager;

To verify whether you have created the database successfully, you can use this command:

> mysql> SHOW DATABASES;

Your output will be similar to this:

```
+--------------------+
| Database           |
+--------------------+
| cafemanager        |
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
```

## Connecting Nodejs to MySQL Database

In **config\config.json**, please change the **MySQL username and password** according to your local credentials.

_For this demo, I will not be using Environment Variables to minimise misconfigurations_

```
{
  "development": {
    "username": "root", // MySQL username
    "password": "root", // MySQL password
    "database": "cafemanager", // Database name
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

# Installing Dependencies in Nodejs

To install dependencies, run the following:

> npm install

# MySQL Migrations

## Run MySQL Migrations

To create Cafes and Employees Table

> npx sequelize-cli db:migrate

## Undo MySQL Migrations

To undo the creation of Cafes and Employees Table

> npx sequelize-cli db:migrate:undo:all

# MySQL Seeds

## Run MySQL Seeds

To import data into Cafes and Employees Table

> npx sequelize-cli db:seed:all

# Undo MySQL Seeds

To undo data from Cafes and Employees Table

> npx sequelize-cli db:seed:undo:all

# To start Nodejs API

To install dependencies, run the following:

> npm run dev
