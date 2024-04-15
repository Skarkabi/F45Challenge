import mongoose from 'mongoose';
import Bluebird from 'bluebird';

const Schema = mongoose.Schema;
const dates = [
    34,
    54,
    35,
    65,
    34,
    65,
    23,
    54,
    34,
    23
]
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    team: {
        type: String, 
        required: true
    },
    scores: {
        type: [Number],
        default: dates,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

function getTotalScore(scores){
    let total = 0;
    for(let i = 0; i < scores.length; i++){
        total = total + scores[i]
    }
    scores.push(total);
}

function getAllUsersScore(users){
    let total = 0;
    for(let i = 0; i < users.length; i++){
        total = total + users[i].scores[users[i].scores.length - 1]
    }
    users.totalScores = total
}
User.addUser = userData => {
    return new Bluebird((resolve, reject) => {
        User.create(userData).then(() => {
            resolve("User Created")
        }).catch(err => {
            reject(err);
        })
    })
}

User.getAllUsers = () => {
    return new Bluebird((resolve, reject) => {
        User.find({}).then(users => {
            for(let i = 0; i < users.length; i++){
                getTotalScore(users[i].scores)
            }
            getAllUsersScore(users);
            resolve(users);
        }).catch(err => {
            reject(err);
        })
    })
}

export default User