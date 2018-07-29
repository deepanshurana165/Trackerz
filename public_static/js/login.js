$('.notRegistered a').click(()=>{
    $('.login-form').hide();
    $('.register-form').show();
});

$('.registered a').click(()=>{
    $('.login-form').show();
    $('.register-form').hide();
});


