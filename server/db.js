const pg = require('pg');
const db = new pg.Client(
  process.env.DATABASE_URL || 'postgres://localhost/hills-interests'
);

const seed = async () => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS interests;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS users;

      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
      );

      CREATE TABLE categories(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id)
      );

      CREATE TABLE interests(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        link TEXT,
        categories_id INTEGER REFERENCES categories(id),
        parentInterest INTEGER REFERENCES interests(id)
      );

      INSERT INTO users(name) VALUES ('Hill');

      INSERT INTO categories(name, description, user_id) VALUES('harley', 'her life, her soul, her baby girl', 1);
      INSERT INTO categories(name, description, user_id) VALUES('food', 'she enjoys cooking more than consuming it', 1);
      INSERT INTO categories(name, description, user_id) VALUES('reading', 'her best way to escape from the comfort of her condo', 1);
      INSERT INTO categories(name, description, user_id) VALUES('the mountains', 'her favourite place to be', 1);

      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('walking harley', 'morning, afternoon, and night: this doggy needs her walks!', null, 1, null);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('training harley', 'this high energy doggo needs to know how to conduct herself like a proper lady!', null, 1, null);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('feeding harley', 'she isn''t allowed to eat pupperino pizzas, but a healthy raw food diet is a must!', null, 1, null);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('cuddling harley', 'while this strong independent doggo don''t need no man... hill is often found bribing harley to cuddle with her', null, 1, null);


      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('cooking', 'this is hill''s favourite thing to do that brings her immediate peace', null, 2, null);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('dry laap', 'this is hill''s favourite thing to make.... for me. simple carbs and protein, that''s all you need', 'https://avocadopesto.com/minced-meat-herb-salad-laap-recipe/', null, 5);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('wet laap', 'this actually isn''t a thing.... but it''s pretty much dry laap with an amazing sauce', null, null, 5);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('wet laap', 'this actually isn''t a thing.... but it''s pretty much dry laap with an amazing sauce', null, null, 5);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('that chicken with the cheese and spinach inside of it', 'this is one of my faves... it''s so gooooood mm delishus', 'https://thatlowcarblife.com/spinach-stuffed-chicken-2/', null, 5);


    `);
    await db.query('SELECT 1 + 1 AS RESULT;');
  } catch (error) {
    console.log(error);
  }
};

const init = async () => {
  try {
    await db.connect();
    await seed();
    console.log('connected to hills-interests db!');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  init,
};
