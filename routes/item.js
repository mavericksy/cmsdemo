//
const Item = require('../model/item'),
      express = require('express'),
      router = express.Router()
      ;
//
router.use((r,w,next) => {
  w.set({
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
    "Surrogate-Control": "no-store"
  });
  next();
});
//
//
router.get('/items', async (r,w) => {
  var itemMap = [];
  try {
    const items = await Item.find({});
    for (const item of items) {
      itemMap.push(item);
    }
    w.send(itemMap);
  } catch (e) {
    w.status(500).send('ITEM ERROR');
  }
});
//
router.get('/image/:id', (r,w) => {

});
//
router.get('/thumb/:id', (r,w) => {

});
//
router.get('/item/:id', (r,w) => {

});
//
router.post('/item', async (r,w) => {
  try {
    Item.init();
    const item = new Item(r.body);
    item.updated = Date.now();
    item.itemid = 0;
    console.log(item);
    const saved = await item.save();
    if(!saved) w.status(500).json('Document not Saved');
    w.json(saved);
  } catch (e) {
    console.log(e);
    w.status(500).json('ERROR');
  }
});
//
module.exports = router;
