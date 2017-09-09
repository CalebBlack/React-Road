module.exports = {
  owner: {type:String,required:true,unique: true,lowercase: true},
  created: { type: Date, default: Date.now, required: true },
  expires: { type: Date, required: true},
  key: {type: String, required: true},
  secret: {type: String, required: true}
}
