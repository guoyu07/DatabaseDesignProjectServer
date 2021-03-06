"use strict";

let express = require('express');
let router = express.Router();

let UserServiceProvider = require('../services/users');

router.get('/', function (req, res, next) {
  let nameList = req.query.name, idList = req.query.id, typeList=req.query.type;

  UserServiceProvider.getUsers(nameList, idList,typeList).then((result)=> {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end();
  });
});

router.post('/', function (req, res, next) {
  let users = (req.body instanceof Array) ? req.body : [req.body];

  UserServiceProvider.createUsers(users);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({"message":"OK\n"}));
  res.end();
});

router.delete('/', function (req, res, next) {
  let idList = req.query.id;

  UserServiceProvider.deleteUsers(idList);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({"message":"OK\n"}));
  res.end();
});


router.get('/:user_id', function (req, res, next) {
  let id = req.params.user_id;

  UserServiceProvider.getUser(id).then((result)=> {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end();
  });
});

router.put('/:user_id', function (req, res, next) {
  let user = req.body, id = req.params.user_id;

  UserServiceProvider.updateUser(id, user);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({"message":"OK\n"}));
  res.end();
});

router.delete('/:user_id', function (req, res, next) {
  let id = req.params.user_id;

  UserServiceProvider.deleteUser(id);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({"message":"OK\n"}));
  res.end();
});

module.exports = router;
