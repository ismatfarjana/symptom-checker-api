let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//symptoms schema definition
let SymptomSchema = new Schema(
  {
    id: { type: String },
    symptom: { type: String },
    createdAt: { type: Date, default: Date.now },
  }
);

// Sets the createdAt parameter equal to the current time
SymptomSchema.pre('save', next => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('symptom', SymptomSchema);