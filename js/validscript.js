// contact form with validation

$(document).ready(function () {
    // the first item is active after loading
    $('#name').focus();
    $('#all').on('click', function(){
        var checkboxes = $('#form').find('.check');
        if (this.checked) {
            checkboxes.attr('checked', 'true'); 
        } 
        else {
            checkboxes.attr('checked', 'false'); 
        };  
    });

    // validation script
    $('#form').validate({
        rules: {
            name: 'required',
            email: {
                required: true,
                email: true
            },
        },

        messages: {
            name: "* Podanie imienia jest wymagane.",
            email: "* Podanie adresu e-mail jest wymagane.",
        },
        showErrors: function(errorMap, errorList) {
        this.defaultShowErrors();
        }
    });

        //  the message after confirming the form
        var form = $("#form");
        form.valid();
        $("#send").click(function(e) {
            e.preventDefault();
            if(form.valid() === true) {
               alert( "Formularz został przesłany");}
            else{
                alert( "Formularz NIE został przesłany, uzupełnij pola wymagane");}
            });       
    });



//     e.preventDefault();
//     if(form.valid() === true) {
//        alert( "Formularz został przesłany");}
//     else{
//         alert( "Formularz NIE został przesłany, uzupełnij pola wymagane");}
//     });       
// });