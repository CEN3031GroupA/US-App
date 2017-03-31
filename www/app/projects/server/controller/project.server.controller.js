'use strict';

var path = require('path');
var mongoose = require('mongoose');
var Project = require('../models/project');

exports.create = function(req, res, next) {
  var project = new Project(req.body);
  project.save(function (err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(project);
    }
  });
};

exports.list = function(req, res) {
  Project.find({}, function(err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(data);
    }
  });
};

exports.delete = function(req, res, next) {
  req.project.remove(function(err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(req.project);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.project);
};

exports.projectById = function(req, res, next, id) {
  Project.findOne({ _id: id } ,
  function(err, project) {
    if (err) {
      return next(err);
    }
    else {
      req.project = project;
      next();
    }
  });
};

exports.update = function (req, res) {
  var project = req.project;
  //TODO: filter which kind of update to do
  /*
  project.title = req.body.title;
  project.description.long = req.body.description.long;
  */

  project.votes = req.body.votes;

  project.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json(project);
    }
  });
};