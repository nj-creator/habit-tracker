const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Habit-Tracker")
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((e) => {
    console.log("Not Connected");
  });
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profession: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  passkey: {
    type: String,
    required: false,
    default: ''
  },
  habits: {
    sunday: [
      {
        title: String,
        description: String,
      },
    ],
    monday: [
      {
        title: String,
        description: String,
      },
    ],
    tuesday: [
      {
        title: String,
        description: String,
      },
    ],
    wednesday: [
      {
        title: String,
        description: String,
      },
    ],
    thursday: [
      {
        title: String,
        description: String,
      },
    ],
    friday: [
      {
        title: String,
        description: String,
      },
    ],
    saturday: [
      {
        title: String,
        description: String,
      },
    ]
  }
}, {
  versionKey: false
})
const User = mongoose.model('users', Schema);
// node Mailer
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'joginandan7091@gmail.com',
    pass: 'qgtyoykhlbvxnrfv',
  },
});

// Express
const expr = require('express')
const app = expr()
const cors = require('cors');
const { data } = require('jquery');
app.use(expr.json())
app.use(cors())
app.post('/signup', (req, res) => {
  const data = req.body
  User.findOne({ email: data.email })
    .then(user => {
      if (user) {
        res.send({ set: false })
      } else {
        newUser = new User({
          name: data.uname,
          email: data.email,
          password: data.password,
          profession: data.profession,
          gender: data.gender
        })
        newUser.save().then(() => {
          res.send({ set: true, email: data.name })
        }).catch(err => res.send({ set: err }))
      }
    })
})
app.post('/login', (req, res) => {
  const val = req.body
  User.findOne({ $or: [{ email: val.email }, { name: val.email }] })
    .then(user => {
      if (user) {
        if (user.password === val.password) {
          res.send({ set: true, user: user })
        } else {
          res.send({ set: false })
        }
      } else {
        res.send({ set: false })
      }
    })
})
app.post('/forget_pass', (req, res) => {
  const email = req.body.email
  const resetKey = Math.random().toString(36).substring(2, 10);
  console.log(req.body);
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        user.passkey = resetKey;
        user.save().then(() => {
          res.send({ set: true })
        });
        const mailOptions = {
          from: "noreply@example.com",
          to: email,
          subject: "Password Reset",
          text: `Hello! To reset your password, use the following key: ${resetKey}`,
        };
        const info = transporter.sendMail(mailOptions)
      } else {
        res.send({ set: false })
      }
    })
})
app.post('/password_change', (req, res) => {
  const data = req.body.data
  User.findOne({ email: req.body.email })
    .then(user => {
      if (data.pass === data.cpass && data.key === user.passkey) {
        user.passkey = ''
        user.password = data.pass
        user.save().then(() => {
          res.send({ change: true })
        })
      } else {
        res.send({ change: false })
      }
    })
})
app.post("/contact", (req, res) => {
  const { name, email, subject, message, profession } = req.body;

  // Create the email message
  const mailOption = {
    from: email,
    to: 'joginandan7091@gmail.com',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nProfession: ${profession}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error sending email" });
    } else {
      console.log(info);
      res.send({ message: "Email sent successfully" });
    }
  });
});
app.post('/addhabit', async(req, res) => {
  const data = req.body.data
  insert=false
  console.log(data);
    if(data.sunday){
      pushed =await User.updateOne({ email: req.body.user },{$push:{'habits.sunday':{'title': data.title,'description': data.description}}})
      insert=true
    }
    if(data.monday){
      pushed =await User.updateOne({ email: req.body.user },{$push:{'habits.monday':{'title': data.title,'description': data.description}}})
      insert=true
    }
    if(data.tuesday){
      pushed =await User.updateOne({ email: req.body.user },{$push:{'habits.tuesday':{'title': data.title,'description': data.description}}})
      insert=true
    }
    if(data.wednesday){
      pushed =await User.updateOne({ email: req.body.user },{$push:{'habits.wednesday':{'title': data.title,'description': data.description}}})
      insert=true
    }
    if(data.thursday){
      pushed =await User.updateOne({ email: req.body.user },{$push:{'habits.thursday':{'title': data.title,'description': data.description}}})
      insert=true
    }
    if(data.friday){
      pushed =await User.updateOne({ email: req.body.user },{$push:{'habits.friday':{'title': data.title,'description': data.description}}})
      insert=true
    }
    if(data.saturday){
      pushed =await User.updateOne({ email: req.body.user },{$push:{'habits.saturday':{'title': data.title,'description': data.description}}})
      insert=true
    }
    if(insert){
      res.send({set:true})
    }else{
      res.send({set:false})
    }
})
app.post('/tasks',(req,res)=>{
  const user=req.body.user
  User.findOne({email:user})
  .then(user=>{
    console.log(user.habits);
    res.send({habits:user.habits})
  })
})
app.post('/delete',async(req,res)=>{
  const user = req.body.user;
  const day = req.body.day;
  const title = req.body.title;
  const description= req.body.desc
    await User.updateOne(
      { email: user },
      {
        $pull: {
          [`habits.${day}`]: {
            title: title,
            description: description
          }
        }
      }).then((error, result) => {
        if (error) {
          console.error(error);
          res.send({ set: false });
        } else {
          if (result.nModified > 0) {
            res.send({ set: true });
          } else {
            res.send({ set: false });
          }
        }})
})
app.listen(8000)