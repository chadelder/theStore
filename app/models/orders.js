var mongoose = require('mongoose');
const jwt    = require('jwt-simple');

// Order Schema
var orderSchema = new mongoose.Schema( {
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
  //dataID: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

//This makes 'Order' accessed from anywhere
var Order = module.exports = mongoose.model('Order', orderSchema);
//get Order - callback is entered thru the route file - Order.find...just like mongo in the shell, looks for plural "orders"

/*module.exports.getOrders = (callback, limit) => {
	Order.find(callback).limit(limit);
}*/

// Get Order by Id
module.exports.getOrderById = function(id, callback){
	Order.findById(id, callback);
}

// Add Order
module.exports.addOrder = function(order, callback){
	Order.create(order, callback);
}

// Update Order
module.exports.updateOrder = function(id, order, options, callback){
	var query = {_id: id};
	var update = {
		bread: order.bread,
    deli: order.deli,
    cheese: order.cheese,
    drink: order.drink,
    quantity: order.quantity
	}
	Order.findOneAndUpdate(query, update, options, callback);
}

// Delete Order
module.exports.removeOrder = function(id, callback){
	var query = {_id: id};
	Order.remove(query, callback);
}

/*var options = { limit : 3, count : 3 };
Order.find(callback, options, count, limit);
}*/

/*// Get quantity
module.exports.totalPrice = function(callback, limit){
  Order.find(callback).limit(limit);
}*/
