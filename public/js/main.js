// Variables 

let searchForm = document.querySelector('form');
let searchBar = document.querySelector('.search-input');
let input;

// Mediawiki api search function 

async function searchWiki(title){
    let api = "https://en.wikipedia.org/w/api.php?";
    if(!title || title == ''){
       alert('Please enter valid search entry!');
    } else {
        let params = 'action=query'
        params += '&format=json'
        params += '&prop=description'
        params += '&list=search'
        params += '&formatversion=2'
        params += '&origin=*'
        params += `&srsearch=${title}`
        params += '&srlimit=10'
        api += params;

        await fetch(api)
            .then(response => response.json())
            .then(data => {
                data = data.query.search;
                for(let item of data){
                    let wikiPage = document.createElement('div');
                    wikiPage.classList.add("wikiPage");
                    let title = document.createElement('h2');
                    title.innerHTML = item.title + ":";
                    let description = document.createElement('p');
                    description.innerHTML = item.snippet;
                    wikiPage.appendChild(title);
                    wikiPage.appendChild(description);
                    document.querySelector('main').appendChild(wikiPage);

                    // click on article
                    wikiPage.addEventListener('click', function(){
                        window.open(`http://en.wikipedia.org/wiki?curid=${item.pageid}`, '_blank');
                    })
                }
            });
        }
}

// Submit button is pressed 

searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    document.querySelector('main').innerHTML = "";
    input = searchBar.value;
    searchWiki(input);
})