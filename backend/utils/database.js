const fs = require('fs');
const path = require('path');

// Path to the database file
const dbPath = path.join(__dirname, '../database.json');

// Function to get the database
const getDatabase = () => {
  const rawData = fs.readFileSync(dbPath);
  return JSON.parse(rawData);
};

// Function to write data back to the database
const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { getDatabase, writeData };
