const mongoose = require('mongoose');

main().then(()=>{
    console.log("connection established with mongodb");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/AapnaTheka');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true },
  message:   { type: String, required: true, trim: true },
});

let contacts = mongoose.model("contact",contactSchema)

// contacts.insertMany([{
//     firstName: "Anshul",
//     lastName: "Phondni",
//     email: "anshul1781.be23@chitkara.edu.in",
//     message: "This is the best alcohol site"
// }])

module.exports = contacts