$(function() {
    $('input:not(.button)').blur(function() {
        if (validator.isFieldValid(this.id, $(this).val())) {
            $(this).parent().find('.error').text('').hide();
        }
        else {
            $(this).parent().find('.error').text(validator.form[this.id].errorMsg).show();
        }
    });

    $('input.button').click(function() {
        $('input:not(.button)').blur();
        if (!validator.isFormValid()) return false;
        // submit return false - will not submit to the server side
    });
});