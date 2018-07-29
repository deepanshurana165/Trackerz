$(document).ready(()=>{
    getshowdata();
    getCast();
});

function getshowdata() {
    let id = sessionStorage.getItem('showid');
    axios.get(`http://api.tvmaze.com/shows/${id}`)
        .then((response)=>{
            console.log(response);
            setBackground(response.data.externals.thetvdb);
            setPoster(response.data.image.original);
            setDetails(response.data);
            setRatings(response.data.rating.average);
            setShowSchedule(response.data.id);
        });
}

function setPoster(url) {
    console.log(url);
    $('#show-image').html(`<img src="${url}" alt="">`)
}

function setDetails(data) {
    let genresArr = data.genres;
    let genres = '';
    genresArr.forEach((ele)=>{
        genres += `<span>`+ele+`</span> `;
    });

    let ratings = data.rating.average;

    if (ratings==null)ratings = 'Not Yet Rated';
    else ratings= ratings+'/10';

    let airedOrStreamed='';
    if (data.network!=null) airedOrStreamed = `<span class="h4">Airs on </span>`+data.network.name;
    else airedOrStreamed = `<span class="h4"> Streamed on </span> `+ data.webChannel.name;
    
    let output = `
    <div id="show-name"><span id="name">${data.name}</span> 
    <span id="stars"><span class="fa fa-star unchecked"></span>
        <span class="fa fa-star unchecked"></span>
        <span class="fa fa-star unchecked"></span>
        <span class="fa fa-star unchecked"></span>
        <span class="fa fa-star unchecked"></span>
        <span class="fa fa-star unchecked"></span>
        <span class="fa fa-star unchecked"></span>
        <span class="fa fa-star unchecked"></span>
        <span class="fa fa-star unchecked"></span>
        <span class="fa fa-star unchecked"></span>
        </span>
        </div>
    <div class="card border-info mb-0">
    <div class="card-header"><h2>Details</h2></div>
    <div class="card-body text-info">
    <p class="card-text ">
    <div id="genres" class="text-white"><span class="h4">Genres: </span>${genres}</div>
    <div id="language" class="text-white"><span class="h4">Language: </span>${data.language}</div>
    <div id="streaming" class="text-white">${airedOrStreamed}</div>
    <div id="run-time" class="text-white"><span class="h4">Runtime: </span>${data.runtime} mins</div>
    <div id="ratings" class="text-white"><span class="h4">Ratings: </span>${ratings}</div>
    </p>
    </div>
    </div>
    <div id="show-summ"><h3>Summary: </h3>${data.summary}</div>
    `;
    $('#show-info').html(output);
}

function getCast(){
    let id = sessionStorage.getItem('showid');
    axios.get(`http://api.tvmaze.com/shows/${id}/cast`)
        .then((response)=>{
            console.log(response);
            setCast(response.data);
        });
}

function setCast(data) {
    let output = '<h3>Main cast</h3>';
    let i= 0;
    console.log('cast data '+data);
    data.forEach((cast)=>{
        if (i<12){
            output += `
        <figure class="imghvr-flip-horiz">
        <img src="${cast.person.image.medium}" style="background-color: #1c7430">
        <figcaption>
            ${cast.person.name} <br>AS<br> ${cast.character.name}
        </figcaption>
        </figure>
        
        `;
        }
        i++;
    });
    $('#show-cast').html(output);
}

function setBackground(id) {
    let url='';
    axios.get(`/shows/hello?id=${id}`)
        .then((response)=>{
            url = JSON.stringify(response.data);
            console.log('url is '+ url);
            $('#bgbg').css({'background-image':'url('+url+')','filter':'blur(0px)'});
        }).catch((err)=>{
        console.log(err)
    });
}

function setRatings(ratings) {
    let stars = Math.round(ratings);
    for (let i = 0;i<stars;i++){
        $('.unchecked').first().addClass('checked').removeClass('unchecked');
    }
}

function settingShowSchedule(data) {
    let output = `
        <h3>Previous Episodes</h3>
        <hr>
        <ul>
        `
    ;
    // data = JSON.parse(data);
    for (let i = data.length-1;i>data.length-6;i--){
        console.log(JSON.stringify(data[i]));
        let summary='';
        if (data[i].summary.length>150){
            summary = data[i].summary.substr(0,150)+' ...';
        } else {
            summary = data[i].summary;
        }
        if (data[i].summary!==null)
        output += `
            <li><span class="text-uppercase font-weight-bold">${data[i].season} x ${data[i].number}: ${data[i].name}</span> : ${summary}</li>
            <hr>
        `
    }
    output+='</ul>';
    $('#show-episodes').html(output);
}

function setShowSchedule(id){
    console.log('id is '+id);
    axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
        .then((response)=>{
            let data = response.data;
            settingShowSchedule(data);
        })
}
