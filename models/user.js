/*
User:
- email string
- password string
- name string
- profilePic string
- posts array of objects ref Post
- reviews array of object ref Review
*/
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: String,
	/*
	password and name can be ommited because they are going to be included with
	the passwordLocalMongoose plugin
	*/
	profileImage: String,
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);