// db.js

import sqlite3 from 'sqlite3';

// Path to your SQLite database file
// const dbPath = _resolve('./supermercado.sql');

// Open SQLite database connection
const db = new sqlite3.Database(dbPath);

// Function to add an item to the database
const addItem = (item) => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO supermercado (name) VALUES (?)',
            [item],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
};

// Function to get all items from the database
const getItems = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM supermercado', (err, rows) => {
            if (err) {
                console.log(rows, err)
                reject(err);
            } else {
                console.log(rows)
                resolve(rows);
            }
        });
    });
};

// Function to update an item in the database
const updateItem = (id, newName) => {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE supermercado SET name = ? WHERE id = ?',
            [newName, id],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            }
        );
    });
};

// Function to delete an item from the database
const deleteItem = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM supermercado WHERE id = ?', [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
};

export { addItem, getItems, updateItem, deleteItem };
