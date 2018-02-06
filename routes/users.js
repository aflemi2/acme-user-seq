const app = require('express').Router();
const db = require('../db');
const { models } = db;
const { User } = models;

module.exports = app;

app.get('/', (req,res,next)=>{
    res.render('index', { title: 'Home' });
});

app.get('/users', (req, res, next)=>{
  User.findAll()
  .then( users => res.render('users', { users }))
  .catch( err => next(err));
});

app.post('/users', (req, res, next)=>{
  User.create(req.body)
  .then( user => res.redirect('/users'))
  .catch( err => next(err));
})

app.delete('/users/:id', (req, res, next)=>{
  User.findById(req.params.id)
  .then( user => user.destroy())
  .then( ()=> res.redirect('/users'))
  .catch( err => next(err));
});
