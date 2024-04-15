import mongoose from 'mongoose';
import Bluebird from 'bluebird';

const Schema = mongoose.Schema;
const dates = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
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
    for(let i = 0; i < scores.length - 1; i++){
        total = total + scores[i]
    }
    scores.push(total);
}

function getAllUsersScore(users){
    let total = 0;
    for(let i = 0; i < users.length; i++){
        total = total + users[i].scores[users[i].scores.length - 1]
        console.log(total)
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

User.updateScores = userData => {
    return new Bluebird((resolve, reject) => {
        let totalScore = 0
        for(let i = 0; i < userData.scores.length - 1; i++){
            totalScore = totalScore + parseFloat(userData.scores[i])
        }
        userData.scores[userData.scores.length - 1] = totalScore
        User.updateOne({_id: userData.id}, {scores: userData.scores}).then(() => {
            resolve("Updated")
        }).catch(err => {
            reject(err);
        })
    })
}

export default User