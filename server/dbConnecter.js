import Bluebird from 'bluebird';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const dbConnecter = () => {
    mongoose.connect('mongodb+srv://saleemkarkabi:wRdYU6H7Hb0hpanU@f45challenge.yj4oaup.mongodb.net/').then(() => {
        console.log("Connected");
    }).catch(err => {
        console.error(err);
    })
}

/*
dbConnecter.connectToCluster = () => {
    return new Bluebird((resolve, reject) => {
        let mongoClient = new MongoClient(process.env.DB_URI);
        console.log('Connecting to MongoDB Atlas cluster...');
        mongoClient.connect().then(() => {
            console.log('Successfully connected to MongoDB Atlas!');
            mongoClient.db('school');
            resolve(mongoClient);
        }).catch(error => {
            console.error('Connection to MongoDB Atlas failed!', error);
            reject(process.exit());
        })
    })
    
}
*/

export default dbConnecter;