import express from 'express';
const router = express.Router();
import Contact from "../models/contact";
import {AuthGuard, UserDisplayName} from "../utils";
import passport from "passport";
import User from "../models/user";

/** TOP-LEVEL ROUTES  **/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page: "home", displayName: UserDisplayName(req) });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page: "home", displayName: UserDisplayName(req) });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Us', page: "about", displayName: UserDisplayName(req) });
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us', page: "contact", displayName: UserDisplayName(req) });
});

router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Our Products', page: "products", displayName: UserDisplayName(req) });
});

router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Our Services', page: "services", displayName: UserDisplayName(req) });
});

/** AUTHENTICATION ROUTES  **/
router.get('/login', function(req, res, next) {
  if(!req.user){
    res.render('index', { title: 'Login', page: "login", messages: req.flash('loginMessage'),
      displayName: UserDisplayName(req) });
  }
  return res.redirect('/contact-list');
});

router.get('/register', function(req, res, next) {
  if(!req.user) {
    res.render('index', {title: 'Register Now', page: "register", messages: req.flash('registerMessage') ,
      displayName: UserDisplayName(req)});
  }
  return res.redirect('/contact-list');
});

router.post('/login', function(req, res, next){
  passport.authenticate('local', function (err: Error, user: Express.User, info: string){
    // Check if there was an error during authentication
    if(err){
      console.error(err);
      res.end();
    }
    if(!user){
      req.flash('loginMessage', 'Authentication Failed');
      return res.redirect('/login'); // Status 302
    }
    // Attempt to log in the user (establish a login session)
    req.logIn(user, function(err){
      if(err){
        console.error(err);
        res.end();
      }
      res.redirect('/contact-list');
    });
  })(req, res, next);
});

router.post('/register', function(req, res, next){
  let newUser = new User(
      {
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + ' ' + req.body.lastName
      }
  );
  console.log("username: " + req.body.username);
  console.log("email: " + req.body.emailAddress);
  console.log("password: " + req.body.password);
  //debugger;

  User.register(newUser, req.body.password, function(err){
    if(err){
      let errorMessage = "Server Error";
      if(err.name == 'UserExistsError'){
        console.error("Error: User Already Exists");
        errorMessage = "Registration Error";
      }
      req.flash('registerMessage', errorMessage);
      res.redirect('/register');
    }
    return passport.authenticate('local')(req, res, function(){
      return res.redirect('/contact-list');
    });
  });
});

router.get('/logout', function(req, res, next){
  req.logOut(function(err){
    if(err){
      res.end();
    }
    res.redirect('/login');
  });
});

/** CONTACT-LIST ROUTES  **/
router.get('/contact-list', AuthGuard, function(req, res, next) {
  Contact.find().then(function(data : any){
    //console.log(contacts);
    res.render('index', { title: 'Contact List', page: "contact-list", contacts : data, displayName: UserDisplayName(req) });
  }).catch(function(err){
    console.error("Error reading contacts from Database" + err);
    res.end();
  });
});

router.get('/edit/:id', AuthGuard, function(req, res, next) {
  let id = req.params.id;
  Contact.findById(id).then(function(contactToEdit){
    res.render('index', { title: 'Edit Contact', page: "edit", contact: contactToEdit, displayName: UserDisplayName(req) });
  }).catch(function(err){
    console.error(err);
    res.end();
  });
});

router.get('/add', AuthGuard, function(req, res, next) {
  console.log("add GET");
  res.render('index', { title: 'Add Contact', page: "edit", contact: '', displayName: UserDisplayName(req) });
});

router.get('/delete/:id', AuthGuard, function(req, res, next) {
  let id = req.params.id;
  Contact.deleteOne({_id : id}).then(function(){
    res.redirect('/contact-list');
  }).catch(function(err){
    console.error(err);
    res.end();
  });
});

/** POST **/
router.post('/edit/:id', AuthGuard, function(req, res, next){
  let id = req.params.id;
  let updatedContact = new Contact(
      {
        "_id": id,
        "FullName" : req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
      }
  );
  Contact.updateOne({_id: id}, updatedContact).then(function(){
    res.redirect('/contact-list');
  }).catch(function(err){
    console.error(err);
    res.end;
  });
});

router.post('/add', AuthGuard, function(req, res, next){
  console.log("Add POST");
  let newContact = new Contact(
      {
        "FullName" : req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
      }
  );
  console.log("username: " + req.body.fullName);
  console.log("email: " + req.body.emailAddress);
  console.log("phone: " + req.body.contactNumber);
  //debugger;
  Contact.create(newContact).then(function(){
    res.redirect('/contact-list');
  }).catch(function(err){
    console.error(err);
    res.end;
  });
});

export default router;
