var express = require("express");
var orderRouter = express.Router();
var Order = require("../models/orders");

orderRouter.route("/")
    .get(function (req, res) {
        Order.find({user: req.user._id}, function (err, todos) {
            if (err) return res.status(500).send(err);
            return res.send(todos);
        });
    })
    .post(function (req, res) {
        var order = new Order(req.body);
        // Set the user property of a todo to req.user (logged-in user)
        order.user = req.user;
        order.save(function (err, newOrder) {
            if (err) return res.status(500).send(err);
            return res.status(201).send(newOrder);
        })
    });

orderRouter.route("/:_orderId")
    .get(function (req, res) {
        Order.findOne({_id: req.params.todoId, user: req.user._id}, function (err, order) {
            if (err) return res.status(500).send(err);
            if (!todo) return res.status(404).send("No todo item found.");
            return res.send(order);
        });
    })
    .put(function (req, res) {
        Order.findByIdAndUpdate({_id: req.params._orderId, user: req.user._id}, req.body, {new: true}, function (err, order) {
            if (err) return res.status(500).send(err);
            return res.send(order);
        });
    })
    .delete(function (req, res) {
        Order.findByIdAndRemove({_id: req.params._orderId, user: req.user._id}, function (err, order) {
            if (err) return res.status(500).send(err);
            return res.send(order);
        })
    });

module.exports = orderRouter;
