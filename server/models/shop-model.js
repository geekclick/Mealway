// const mongoose = require('mongoose');
// const menuItemSchema = require('./food-model')

// const menu1 = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   category: {
//     type: String,
//     enum:['veg','non veg','fast food','bevrage','desert','chinese'],
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   image: {
//     type: String,
//     required: false
//   }
// });

// const vendorSchema = new mongoose.Schema({
//   img: {
//     type: String,
//     required: false
//   },
//   coverImg: {
//     type: String,
//     required: false
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   shopname: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   location: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       required: false
//     },
//     coordinates: {
//       type: [Number],
//       required: false,
//       index: '2dsphere'
//     }
//   },

//   address: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     trim: true
//   },
//   // menu: [menuItemSchema],
//   menuID: [{ 
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'Food'
//    }],

//   menudata: [menu1],

//   contact: {
//     type: Number,
//     required: true
//   },
//   openingHours: {
//     type:Map,
//     of:String,
//   },
// }
// );
// vendorSchema.index({ 'menu.name': 'text' });
// vendorSchema.index({ location: '2dsphere' });

// module.exports = mongoose.model('Vendor', vendorSchema);


const mongoose = require('mongoose');

const shopModel = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  service_time: {
    type: String,
    required: true
  },
  shop_pic: {
    type: String
  },
  shop_cover: {
    type: String
  },
  customer_care_number: {
    type: Number
  },
  holiday: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Shop', shopModel);