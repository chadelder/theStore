var mongoose = require('mongoose');

// Order Schema
var orderSchema = new mongoose.Schema({
  bread: {
    type: String,
    //required: true
  },
  deli: {
    type: String,
    //required: true
  },
  cheese: {
    type: String,
    //required: true
  },
  drink: {
    type: String,
    //required: true
  },
  quantity: {
    type: Number,
    //required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  },
  completed: {
        type: Boolean,
        default: false
    },
    // Add a reference to the user to whom this todo belongs
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true //this might throw an err
    }
});

//This makes 'Order' accessed from anywhere
var Order = module.exports = mongoose.model('Order', orderSchema);
