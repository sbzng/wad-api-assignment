import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ShowSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    overview: { type: String },
    first_air_date: { type: Date },
    vote_average: { type: Number },
    poster_path: { type: String }
});

ShowSchema.statics.findByShowDBId = function (id) {
    return this.findOne({ id: id });
};

export default mongoose.model('Show', ShowSchema); 

