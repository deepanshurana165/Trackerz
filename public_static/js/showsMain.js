$(document).ready(()=>{
    $('#searchForm').on('submit',(e)=>{
        let searchQuery = $('#searchText').val();
        getShows(searchQuery);
        e.preventDefault();
    })
});

function getShows(searchQuery) {
    axios.get(`http://api.tvmaze.com/search/shows?q=${searchQuery}`)
        .then((response)=>{
            console.log(response);
            let shows = response.data;

            let output = '';
            $.each(shows,(ind,shows)=>{
                if(shows.show.image!=null ) {
                    output += `
                            <a onclick="showSelected(${shows.show.id},${shows.show.externals.thetvdb})" href='/shows?id=${shows.show.externals.thetvdb}'>
                            <img src="${shows.show.image.medium}" alt="${shows.show.name}">
                            </a>
                            `
                }
            });
            $('#shows').html(`<div id ='images'>${output}</div>`);
        })
        .then(()=>{
            $('img').parazoom({
            overflow: 'visible',
            cursor: 'pointer'
            }
        );
        })
        .catch((err)=>{
            console.log(err)
        })
}

function showSelected(data,tv_db_id) {
    sessionStorage.setItem('showid' , data);
    return false;
}