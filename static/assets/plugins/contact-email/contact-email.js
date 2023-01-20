// FOR CSRF TOKEN
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

$(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });
});

// CSRF TOKEN END


// FOR SESSION VALIDATION
function validateSession(session) {
    //alert(session);
    $('#form_session').val(session);
    var form = $('#contact-form');
    $.ajax({
        method: "GET",
        url: 'https://jaypeemendoza2014.pythonanywhere.com/confirm_session/',
        jsonp: "callback",

        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",
        data: form.serialize(),
        // crossOrigin: true,
        success: function (result) {
            console.log('result OK :');
            console.log(result);
            if (result.status == 'OK') {
                $('#contact-form')[0].reset();
                $('#spinner-msg').text(result.msg);
                $('#spinner-msg').removeClass('hidden');
                $('#contact-form-loading').addClass('hidden');
            } else {
                $('#spinner-msg').removeClass('hidden');
                $('#spinner-msg').text(result.msg + ": " + result.details);
                $('#contact-form-loading').addClass('hidden');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('result ERROR :');
            console.log(result);
            $('#spinner-msg').removeClass('hidden');
            $('#spinner-msg').text(xhr.status + ": " + thrownError + ", Internal Error: Message Not Sent");
            // console.log(result.status+" "+result.msg+" "+result.details+" "+result.client_ip);
            $('#contact-form-loading').addClass('hidden');
        }
    });
}
// FOR SESSION VALIDATION END

// CREATE SESSION AND WAIT FOR REPLY FROM MAILING SYSTEM
var public_ip = "";
//    $.getJSON('https://www.geoplugin.net/json.gp?jsoncallback=?', function(data) {
//console.log(JSON.stringify(data, null, 2));
//  console.log(data.geoplugin_request);
//  public_ip = data.geoplugin_request;
// });

function send_email() {
    console.log("yea");
    $('#contact-form-loading').removeClass('hidden');
    //console.log(getCookie("csrftoken"));
    var form = $('#contact-form');
    $('#form_domain').val("www.egrub.net");
    $.ajax({
        method: "GET",
        url: 'https://jaypeemendoza2014.pythonanywhere.com/create_session/',
        jsonp: "callback",

        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",
        data: form.serialize(),
        // crossOrigin: true,
        success: function (result) {
            // console.log(result);
            //alert(result);
            if (result.status == 'OK') {
                var session = result.session;
                var msg = result.msg;
                var s = result.splitter;
                var array = session.split(s);
                var session = array[0] + ":" + array[1] + ":" + array[2];
                validateSession(session);

            } else {
                $('#spinner-msg').removeClass('hidden');
                $('#spinner-msg').text(result.msg);
                // console.log(result.status+" "+result.msg+" "+result.details+" "+result.client_ip);
                $('#contact-form-loading').addClass('hidden');

            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#spinner-msg').removeClass('hidden');
            $('#spinner-msg').text(xhr.status + ": " + thrownError + ", Internal Error: Message Not Sent");
            // console.log(result.status+" "+result.msg+" "+result.details+" "+result.client_ip);
            $('#contact-form-loading').addClass('hidden');
        }
    });
    // scrollto('home_marker');
}


function validateOrderSession(session) {
    //alert(session);
    $('#order-form_session').val(session);
    var mail1 = $('#order-mail').val();
    var package_name1 = $('#order-package').val();
    var phone1 = $('#order-phone').val();
    var domain1 = $('#order-form_domain').val();
    $.ajax({
        method: "GET",
        url: 'https://jaypeemendoza2014.pythonanywhere.com/confirm_session/',
        data: {
            'email': mail1,
            'firstname': 'None',
            'lastname': 'None',
            'message': 'Order Package: ' + package_name1,
            'phone': phone1,
            'session': session,
            'domain': 'None'
        },
        jsonp: "callback",

        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",
        success: function (result) {
            //alert(result.status);
            if (result.status == 'OK') {
                $('#order-form')[0].reset();
                $('#order-spinner-msg').text(result.msg);
                $('#order-spinner-msg').removeClass('hidden');
                $('#order-form-loading').addClass('hidden');
            } else {
                $('#order-spinner-msg').removeClass('hidden');
                $('#order-spinner-msg').text(result.msg + ": " + result.details);
                $('#order-form-loading').addClass('hidden');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#order-spinner-msg').removeClass('hidden');
            $('#order-spinner-msg').text(xhr.status + ": " + thrownError + ", Internal Error: Message Not Sent");
            // console.log(result.status+" "+result.msg+" "+result.details+" "+result.client_ip);
            $('#order-form-loading').addClass('hidden');
        }


    });
}







// CREATE SESSION AND WAIT FOR REPLY FROM MAILING SYSTEM END

function order_now() {
    $('#order-form-loading').removeClass('hidden');
    //console.log(getCookie("csrftoken"));
    //  var form = $('#order-form');
    var mail1 = $('#order-mail').val();
    var package_name1 = $('#order-package').val();
    var phone1 = $('#order-phone').val();
    var session1 = $('#order-form_session').val();
    var domain1 = $('#order-form_domain').val();

    $('#order-form_domain').val("www.egrub.net");
    $.ajax({
        method: "GET",
        url: 'https://jaypeemendoza2014.pythonanywhere.com/create_session/',
        data: {
            'email': mail1,
            'firstname': 'None',
            'lastname': 'None',
            'message': 'Order Package: ' + package_name1,
            'phone': phone1,
            'session': 'None',
            'domain': 'None'
        },
        jsonp: "callback",

        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",
        success: function (result) {
            //alert(result);
            if (result.status == 'OK') {
                var session = result.session;
                var msg = result.msg;
                var s = result.splitter;
                var array = session.split(s);
                var session = array[0] + ":" + array[1] + ":" + array[2];
                validateOrderSession(session);

            } else {
                $('#order-spinner-msg').removeClass('hidden');
                $('#order-spinner-msg').text(result.msg);
                // console.log(result.status+" "+result.msg+" "+result.details+" "+result.client_ip);
                $('#order-form-loading').addClass('hidden');

            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#order-spinner-msg').removeClass('hidden');
            $('#order-spinner-msg').text(xhr.status + ": " + thrownError + ", Internal Error: Message Not Sent");
            // console.log(result.status+" "+result.msg+" "+result.details+" "+result.client_ip);
            $('#order-form-loading').addClass('hidden');
        }
    });
}