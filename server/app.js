const { init, db } = require('./db');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use('/public', express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || '5997';
const serverInit = async () => {
  try {
    app.listen(port, () => console.log(`listening on port ${port}`));
    init();
  } catch (error) {
    console.log(error);
  }
};
serverInit();

app.get('/api/categories', async (req, res, next) => {
  try {
    const categories = await db.query(`
    select * from categories;
    `);
    res.send(categories.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/api/categories/:name', async (req, res, next) => {
  const category = req.params.name;
  try {
    const categoriesName = await db.query(`
    select * from categories
    inner join interests
    on categories.id = interests.categories_id
    where categories.name = '${category}';
    `);
    res.send(categoriesName.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/api/categories/:name/:subinterest', async (req, res, next) => {
  const category = req.params.name;
  const subinterest = req.params.subinterest;
  const interestRow = await db.query(
    `select * from interests where interests.name = '${subinterest}'`
  );
  constInterestRowId = interestRow.rows[0].id;
  try {
    const categoriesName = await db.query(`
    select * from categories
    inner join interests
    on categories.id = interests.categories_id
    inner join interests as subinterests
    on interests.id = subinterests.parentInterest
    where categories.name = '${category}'
    and subinterests.parentInterest = ${Number(constInterestRowId)}
    `);
    res.send(categoriesName.rows);
  } catch (error) {
    next(error);
  }
});
