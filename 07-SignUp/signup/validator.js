var validator = {
    form: {
        username: {
            status: false,
            errorMsg: 'use 6~18 characters, numbers or _ for your name, begining with characters'
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

    isUsernameValid: function (username) {
        return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(username);
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
        return this.form.username.status && this.form.sid.status && this.form.phone.status && this.form.email.status;
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