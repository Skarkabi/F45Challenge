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

router.post('/', (req,res,next) => {
    console.log(req.body)
    const newUser = {
        firstName: req.body.name,
        lastName: "Tester",
        team: req.body.team
    }
    User.addUser(newUser).then(() => {
        res.redirect("/");
    })
})

router.post('/update', async (req,res,next) => {
    console.log("THIS ONE")
    console.log(req.body)
    for(let i = 0; i < req.body.userScores.length; i++){
        await User.updateScores(req.body.userScores[i])
    }
   res.redirect("/");
})

export default router;

