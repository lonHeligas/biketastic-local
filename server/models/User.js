const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    require: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order'}]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema.virtual('orderCount').get( function () {
  return this.orders.length;
})


const User = model('User', userSchema);
module.exports = User;
