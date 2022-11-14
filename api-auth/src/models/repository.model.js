const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const repositorySchema = Schema(
  {
    name: String,
    isFavorite: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: false, versionKey: false }
);

module.exports = mongoose.model('Repository', repositorySchema, 'repositories');
