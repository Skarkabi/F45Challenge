import express from 'express';
import User from '../models/User';

const router = express.Router();

/** 
 * Express Route to Displays login page.
 */
router.get('/', (req, res, next) => {
    //Checking if a user is already logged in
    //if (req.user){
        User.getAllUsers().then(users => {
            res.render("homePage", 
            {title: 'Home Page',
            jumbotronDescription: "Welcome! This is your dashboard and you can access everything from here easily.",
            users: users,
            totalScores: users.totalScores,
            msgType: req.flash(),
            user: req.user

        })
        })
        
       
    /*}else{
       res.redirect('/login');

    }*/

});

export default router;

