//
const User = require('../model/user'),
      express = require('express'),
      router = express.Router()
;
//
router.use((r,w,next) => {
  next();
});
//
router.options('/login', (r,w) => {
   r.set('Access-Control-Allow-Origin', '*');
})
router.get('/login', (r,w) => {
  // TODO CSRF Token
  w.send('OK');
});
//
router.post('/login', (r,w) => {
  //
  // TODO actual user handling and authentication
  // TODO password hashing
  if (r.body.username == 'cmsadmin' && r.body.password == 'cmsadminsecretpa$$word') {
    //
    // TODO enforce expiry
    var a = new Date(); a.setDate(a.getDate()+1); // 24 hours
    w.send({
      payload: {
        username: "cmsadmin",
        passhash: "************",
      },
      expiresAt: a,
    });
  } else {
    w.status(401).send('UNAUTHORISED');
  }
});
//
module.exports = router;
