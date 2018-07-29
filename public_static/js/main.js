$(document).ready(()=>{
    initiatParticles();
    togglingClass();
    setInterval(togglingbg(),5000);
    getToken();
});

function initiatParticles() {
    particlesJS.load('particles-js', 'assets/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
}

function togglingClass(){
    let header = $('.navigation');
    $(window).scroll(function() {
        let scroll = $(window).scrollTop();

        if (scroll >= 400) {
            header.removeClass('navbar-light').addClass('navbar-dark');
            $('.btn-outline-dark').removeClass('btn-outline-dark').addClass('btn-outline-light')
        } else {
            header.removeClass('navbar-dark bg-dark').addClass('navbar-light bg-transparent');
            $('.btn-outline-light').removeClass('btn-outline-light').addClass('btn-outline-dark')
        }
    });
}

function togglingbg() {
    let images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg','image6.jpg','image7.jpg','image8.jpg','image9.jpg'];
    let random = Math.floor(Math.random() * images.length);
    let url = '../Images/'+images[random];
    let imgProp = {
        'background-image': 'url('+url+')',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-size': 'cover',
        'transition': 'all 1s'
    };
    console.log(url);
    console.log(imgProp);
    $('#background').css(imgProp);
}

function getToken() {
    axios.get('/shows/token').then((res)=>{
        console.log(res)
    });
}