const assert = require('assert');

Feature('Liking Restoran');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('liking one restoran', async ({ I }) => {
    I.see('Tidak ada restoran yang ditampilkan', '.resto-item__not__found');

    I.amOnPage('/');
    
    I.seeElement('h3 a');

    const firstResto = locate('h3 a').first();
    const firstRestoTitle = await I.grabTextFrom(firstResto);
    I.click(firstResto);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.resto-item');
    const likedRestoTitle = await I.grabTextFrom('.resto__title');

     assert.strictEqual(firstRestoTitle, likedRestoTitle);
});
