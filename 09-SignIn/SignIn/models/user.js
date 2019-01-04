var bcrypt = require('bcryptjs');
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:user');
var _ = require('lodash');

module.exports = function(db) {
	var users = db.collection('users');

	return {
		findUser: function(username, password) {
			return users.findOne({username: username}).then(function(user){
				if(!user) return  Promise.reject('user does not exist');
				else{
					return bcrypt.compareSync(password, user.password) ? user : Promise.reject('wrong password');
				}
			});
		},

		createUser: function(user){
			console.log('creating');
			var iteration = 10;
			return bcrypt.hash(user.password, iteration).then(function(hash){
					user.password = hash;
					console.log('created');
					return users.insert(user);
			});
		},

		checkUser: function(user){
			var formatErrors = validator.findFormatErrors(user);
			return new Promise(function(reslove, reject){
					formatErrors ? reject(formatErrors) : reslove(user);
			}).then(function(){
					return users.findOne(getQueryForUniqueInAttrs(user)).then(function(existedUser){
							return existedUser ? Promise.reject('user is not unique') : Promise.resolve(user);
					});
			});
		}
	}
}

function getQueryForUniqueInAttrs(user) {
	return {
		// $or: _(user).omit('password').paris().map(pairToObject).value()
		$or: _.toPairs(_.omit(user,'password')).map(pairToObject)
	}
}

function pairToObject(pair) {
	obj = {};
	obj[pair[0]] = pair[1];
	return obj;
}