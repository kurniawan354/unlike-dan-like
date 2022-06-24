const assert = require('assert');

Feature('Unliking Restauran');
Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('unliking one restauran', async ({ I }) => {
  I.see('Tidak ada restoran yang ditampilkan', '.resto-item__not__found');
  I.amOnPage('/');
  I.seeElement('h3 a');

  const firstRestaurant = locate('h3 a').first();
  const firstRestaurantsTitles = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.resto-item');
  
  const unlikedRestaurantsTitles = await I.grabTextFrom('h3 a');
  assert.strictEqual(firstRestaurantsTitles, unlikedRestaurantsTitles);

  I.seeElement('h3 a');
  await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.see('Tidak ada restoran yang ditampilkan', '.resto-item__not__found');
});
