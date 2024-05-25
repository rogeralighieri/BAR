const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//Modulo de conexion a directorio activo
// const ActiveDirectory = require("activedirectory2").promiseWrapper;
const pool = require('../database');
const helpers = require('./helpers');
const keys = require('../keys');
// var os = require('os');


//Test Local Login
passport.use('local.Login', new LocalStrategy ({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) =>{
    // console.log(req.body);
    const rows = await pool.query('SELECT * FROM tbl_rusuarios WHERE USU_CUSUARIO =?', [username]);
    console.log(rows)
    if (rows.length > 0){ 
        const user = rows[0];
        const estado = user.USU_CESTADO;
        console.log(estado)      
        const validPassword = await helpers.matchPassword(password, user.USU_CPASSWORD)
        console.log(validPassword)
        if (validPassword == true && estado == 'Activo' ) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.USU_CUSUARIO));            
        } else if (validPassword == true && user.Estado == "Inactivo") {
            done(null, false, req.flash('message', 'El usuario se encuentra Inactivo - Validar con el supervisor'));
        } else if (validPassword == false){
            done(null, false, req.flash('message', 'Contraseña Incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El usuario ingresado no existe'));
    }
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    done(null, user);
})
