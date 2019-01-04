var validator = {
	form: {
		username: {
			status: false,
			errorMsg: 'use 6~18 characters, numbers or _ for your name, begining with characters'
		},
		password: { 
			status: false,
			errorMsg: 'use 6~12 characters, numbers, - or _ for your password'
		},
		confirmPassword: {
			status: false,
			errorMsg: 'your passwords do not match, please check them again'
		},
		sid: {
			status: false,
			errorMsg: 'containing 8 numbers, not begining with 0'
		},
		phone: {
			status: false,
			errorMsg: 'containing 11 numbers, not begining with 0'
		},
		email: {
			status: false,
			errorMsg: 'please input a valid email address'
		}
	},

	findFormatErrors: function(user) {
		var errorMessages = [];
		for (var key in user) {
			// if (user.hasOwnProperty(key)) {
				if (!validator.isFieldValid(key, user[key])) errorMessages.push(validator.form[key].errorMsg);
			}
		// }
		errorMessages.length > 0 ? new Error(errorMessages.join('<br />')) : null;
	},

	isUsernameValid: function (username) {
		return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(username);
	},

	isPasswordValid: function (password) {
		this.password = password;
		return this.form.password.status = /^[a-zA-Z0-9_\-]{6,12}$/.test(password);
	},

	isConfirmPasswordValid: function(confirmPassword) {
		return this.form.confirmPassword.status = (this.password == confirmPassword);
	},

	isSidValid: function (sid) {
		return this.form.sid.status = /^[1-9]\d{7}$/.test(sid);
	},

	isPhoneValid: function (phone) {
		return this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
	},

	isEmailValid: function (email) {
		return this.form.email.status = /^[a-zA-Z0-9_\-]+@(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$/.test(email);
	},

	isFieldValid: function (fieldname, value) {
		var CapFiledname = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
		return this['is' + CapFiledname + 'Valid'](value);
	},

	isFormValid: function () {
		return this.form.username.status && this.form.password.status && (this.form.confirmPassword.status || typeof window !== 'object') &&
					 this.form.sid.status && this.form.phone.status && this.form.email.status;
	},

	getErrorMsg: function (fieldname) {
		return this.form[fieldname].errorMsg;
	},

	isAttrValueUnique: function (registered, user, attr) {
		for (var key in registered) {
			if (registered.hasOwnProperty(key) && registered[key][attr] == user[attr]) return false;
		}
		return true;
	}
}

// share with server side
if (typeof module == 'object') {
	module.exports = validator;
}