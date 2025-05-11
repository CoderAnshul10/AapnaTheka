const mongoose = require('mongoose');

main().then(()=>{
    console.log("connection established with mongodb");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/AapnaTheka');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


let userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    age: { type: Number, required: true }
});

let users = mongoose.model("user",userSchema)

// users.insertMany([{
//     username : "admin",
//     password : "admin",
//     age : 28
// }])

module.exports = users