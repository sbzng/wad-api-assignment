import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  birthday: { type: String },
  known_for_department: { type: String },
  gender: { type: Number },
  profile_path: { type: String }
});

ActorSchema.statics.findByActorDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Actor', ActorSchema);
