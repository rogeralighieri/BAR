const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');


router.get('/Login', isNotLoggedIn, (req, res) => {
  res.render('auth/Login');
});

router.post('/Login', (req, res, next) => {
  passport.authenticate('local.Login', {
    successRedirect: '/estado',
    failureRedirect: '/Login',
    failureFlash: true
  })(req, res, next)
});

router.get("/estado", (req, res, next) => {
  try {
    if (req.user.USU_CESTADO === "Activo") {
      res.redirect("/redirect");
    } if (req.user.USU_CESTADO === "Inactivo") {
      res.redirect("/logout");
      console.log('El usuario ingresado se encuentra inactivo en la base de datos !!!');
    }
  } catch (error) {
    res.render('404');
  }
});

router.get("/redirect", isLoggedIn, (req, res, next) => {
  try {
    if (req.user.USU_CROL == "Administrador") {
      res.redirect("/adminusuarios");
    }
    else if (req.user.USU_CROL == "Cajero") {
      res.redirect("/adminpedidos");
    }
    else if (req.user.USU_CROL == "Mesero") {
      res.redirect("/crearpedido");
    }
    else {
      res.render('401');
      console.log("Usuario sin rol asignado");
    }
  } catch (error) {
    res.render('404');
  }
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/Login')
})

module.exports = router;

