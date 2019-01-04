$(function () {
    $('#logout').on('click', function() {
        console.log('logout');
        window.location = 'http://localhost:8000/signout';
    });
});