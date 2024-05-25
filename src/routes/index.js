const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {    
    res.redirect('/login');
});

router.get('/error404', (req, res) => {  
    res.render('404'); 
    console.log('Solicitud Incorrecta'); 
});

router.get('/error401', (req, res) => {    
    res.render('401');
    console.log('Error de autenticación');
});

module.exports = router;