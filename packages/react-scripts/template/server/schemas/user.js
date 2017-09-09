module.exports = {
  username: {type:String,required:true},
  displayname: {type:String,required:true},
  email: {type:String,required:true},
  admin: {type:Boolean,default:false,required:true},
  hash: {type:String,required:false},
  created: { type: Date, default: Date.now }
}
