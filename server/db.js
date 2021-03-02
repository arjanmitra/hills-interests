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

      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('eating', 'she enjoys basic foods', null, 2, null);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('cauliflower chechki', 'you already know i had to start this list with the one food i am proud to have introduced into her life. basically an indian cauliflower dish. it''s amazing', 'https://spicechronicles.com/alu-kopir-chechki-curried-soft-cauliflower/#sthash.M57HOR4S.dpbs', null, 10);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES
      ('cabbage chechki', 'i think she likes this one more. still gotta swing her the recipe', 'https://www.archanaskitchen.com/bandhakopir-ghonto-recipe-bengali-style-cabbage-fry', null, 10);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('sushi', 'specifically a dynamite roll. that''s it. she hates complex rolls muddled with a whole bunch of sauces. and don''t get me started on soy sauce. her favourite joint is tomo sushi.', 'https://www.tomosushi.ca/', null, 10);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('bubble tea', 'taro milk tea, 25% sugar, pearls. bubble republic. OR that mango thing from real fruit. but the first is elite.', 'http://www.bubblerepublic.ca/index.html', null, 10);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('pho', 'ben thanh waterloo days. the simpler days.', 'https://www.phobenthanh.ca/', null, 10);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('pork bone soup', 'we went to a few joints in waterloo, can''t really pick one. spicy as hell though', null, null, 10);

      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('baking', 'she''s an ultimate baker. and i am a proud sous chef. did you know there''s a difference between folding and stirring a mix?', null, 2, null);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('MATCHA COOKIES!!!', 'these changed my life. i have consumed so many of these bad boys i am now 50% matcha', 'https://kirbiecravings.com/crispy-chewy-matcha-green-tea-cookies/', null, 17);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('peanut butter cookies', 'these were nougaty and soft and wonderful. loved all 38974923 of them that i often ate in batches of ten', 'https://www.cookingclassy.com/classic-peanut-butter-cookies/', null, 17);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('oreo cups!!!', 'these are absolutely amazing i literally can''t stop thinking about them... can you imagine her old roommates just left them in a tupperware container and i proudly inhaled them in a few seconds', 'https://livforcake.com/oreo-cheesecake-cookie-cups/', null, 17);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('st patty''s cake', 'i actually loved this cake but she didn''t because it was really moist. all good for me because it was like a soft pudding mmm so good. i remember i was sick and i still had two massive slices lol good times', 'https://www.foodnetwork.com/recipes/food-network-kitchen/st-patricks-day-green-velvet-layer-cake-3362434', null, 17);


      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('beneath a scarlet sky', 'a book we both enjoyed for personal reasons', 'https://www.goodreads.com/book/show/32487617-beneath-a-scarlet-sky', 3, null);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('sapiens', 'a book she recommended to me before it all started', 'https://www.goodreads.com/book/show/23692271-sapiens', 3, null);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('environmental debt', 'the first book i bought her', 'https://www.goodreads.com/book/show/16059654-environmental-debt', 3, null);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('why we sleep', 'the book she uses to justify her excessive napping', 'https://www.goodreads.com/book/show/34466963-why-we-sleep', 3, null);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('dyatlov pass', 'the second book she recommended to me which was an absolute page turner', 'https://www.goodreads.com/book/show/17557470-dead-mountain', 3, null);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('bad blood', 'the book i''ve recommended to her for the past two years that she is now FINALLY reading', 'https://www.goodreads.com/book/show/37976541-bad-blood', 3, null);

      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('hiking', 'when she can, she loves to hike trails and be in the mountains with harley', null, 4, null);
      INSERT INTO interests(name, description, link, categories_id, parentInterest) VALUES('breathing in the fresh air', 'doesn''t compare to that polluted city air', null, 4, null);



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
