
var categorie = "popular";
var midUrl = "discover/movie";
var genreQuery = "";
var page = 1;
var pageMax = 2;
var idGenre = 0;
var main = document.getElementById("mainDiv");
var select = document.getElementById("selectGenres");
var mainIndex = document.getElementById("mainIndex");
var selectPage_haut = document.getElementById("selectPage_haut");
var selectPage_bas = document.getElementById("selectPage_bas");
var serie_or_films=document.getElementById("selectSerie")
var tri_note=""
var tri_title=""

var tab=""

var search=document.getElementById("search");
var container=""
var loader=""


select.onchange=changeGenre;
serie_or_films.onchange=changeSerie_Or_Films


getMovieList();
fillGenresSelect();
showContent()




function changeSerie_Or_Films(){
    page = 1;
    if(serie_or_films.value=="tv"){
        document.getElementById("btnAVenir").innerHTML="Get TV On The Air";
        document.getElementById("btnAlAffiche").innerHTML="Diffusez aujourd'hui";   
         
    }else {
        document.getElementById("btnAVenir").innerHTML="À venir";
        document.getElementById("btnAlAffiche").innerHTML="À l'affiche";
    }

        fillGenresSelect();
   
    if(categorie=="search"){
        midUrl="search/"+serie_or_films.value;
    }else{
        midUrl = serie_or_films.value+"/" + categorie;
    }
    if(select.options[select.selectedIndex].value != 0){
        genreQuery = "&with_genres=" + select.options[select.selectedIndex].value;
        categorie=select.options[select.selectedIndex].value
    } else {
        genreQuery = "";
        categorie = "popular";
    }
    changeCategorie(categorie)
    getMovieList();
}


function changeCategorie(categorieChosen){
    page = 1;
    showContent()

 

    
   
    categorie = categorieChosen;
    if(serie_or_films.value=="tv"&&categorie=="upcoming"){
        categorie="on_the_air"
       
    }
    else if(serie_or_films.value=="tv"&&categorie=="now_playing"){
        categorie="airing_today"
    }
    

    if(categorie=="search"){
        midUrl="search/"+serie_or_films.value;
    }else{
        
        midUrl = serie_or_films.value+"/" + categorie;
    }

    if(select.options[select.selectedIndex].value != 0){
        genreQuery = "&with_genres=" + select.options[select.selectedIndex].value;
    } else {
        genreQuery = "";
    }

    getMovieList();
    
}



function showContent(){
 
    container=document.createElement("div")
    loader=document.createElement("div")
    container.classList.add("loader-container")
    loader.classList.add("loader")

    document.body.appendChild(container)
    container.appendChild(loader)

    setTimeout(removeLoader,300);
}


function removeLoader(){

    loader.remove();
    container.remove()

}

function TriNote(){

    if(tri_note==""){
        tri_note="&sort_by=note.asc"
        document.getElementById("TriNote").innerHTML="Note ASC"
    }
    else if(tri_note=="&sort_by=note.asc"){
        tri_note="&sort_by=note.desc"
        document.getElementById("TriNote").innerHTML="Note DESC"

    }

    else if(tri_note=="&sort_by=note.desc"){
        tri_note=""
        document.getElementById("TriNote").innerHTML="Note"

    }
    showContent();
    getMovieList()

}

function TriTitle(){

    if(tri_title==""){
        tri_title="&sort_by=title.asc"
        document.getElementById("TriTitre").innerHTML="Titre ASC";
        
    }
    else if(tri_title=="&sort_by=title.asc"){
        tri_title="&sort_by=title.desc"
         document.getElementById("TriTitre").innerHTML="Titre DESC";
     

    }

    else if(tri_title=="&sort_by=title.desc"){
        tri_title=""
         document.getElementById("TriTitre").innerHTML="Titre";
    }
    showContent();
    getMovieList();

}








function changeGenre(){
    midUrl = "discover/"+serie_or_films.value;
    showContent()

    if(select.options[select.selectedIndex].value != 0){
        genreQuery = "&with_genres=" + select.options[select.selectedIndex].value;
    } else {
        genreQuery = "";
    }
     getMovieList();
}

function fillGenresSelect(){
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.themoviedb.org/3/genre/"+serie_or_films.value+"/list?api_key=e5cbab0c52f5ec938209af4545633863&language=fr"+tri_note+tri_title);
   
    request.onload = () => {
        if(request.status == 200){
            var obj = JSON.parse(request.response);
            var genresSelect = document.getElementById("selectGenres");
            genresSelect.innerHTML += "<option value=\"0\">Tous</option>";
            for(let i = 0; i < obj.genres.length; i ++){
                genresSelect.innerHTML += "<option value=\"" + obj.genres[i].id + "\">" + obj.genres[i].name + "</option>";
            }
        }
    }
    request.send();
}



function getGenre(id){

    var tab=id.toString().split(",")
    var g=""

   


    let request = new XMLHttpRequest();
    request.open("GET", "https://api.themoviedb.org/3/genre/"+serie_or_films.value+"/list?api_key=e5cbab0c52f5ec938209af4545633863&language=fr"+tri_note+tri_title,false);
    request.send(null);
   
    var r = request.responseText
    var obj = JSON.parse(r);
    for(let i = 0; i < obj.genres.length; i ++){
        for (let index = 0; index < tab.length; index++) {
            if(tab[index]==obj.genres[i].id)
                g+= obj.genres[i].name+","
        }
    }


     return g.substring(0,g.length-1)
}



function getMovieList(){

   
 

    let request = new XMLHttpRequest();


    if(categorie=="search"){
        if(search.value!=""){
            request.open("GET", "https://api.themoviedb.org/3/" + midUrl + "?api_key=e5cbab0c52f5ec938209af4545633863&language=fr&query="+search.value+"&page=" + page + genreQuery+tri_note+tri_title);
            removeLoader()

        }else{
            midUrl="discover/"+serie_or_films.value
            request.open("GET","https://api.themoviedb.org/3/" + midUrl + "?api_key=e5cbab0c52f5ec938209af4545633863&language=fr&page=" + page + genreQuery+tri_note+tri_title);
            removeLoader()
        }

    }else{
        request.open("GET","https://api.themoviedb.org/3/" + midUrl + "?api_key=e5cbab0c52f5ec938209af4545633863&language=fr&page=" + page + genreQuery+tri_note+tri_title);
               
    }
    
   
    request.onload = () => {
        if(request.status == 200){
            var obj = JSON.parse(request.response);
            pageMax = obj.total_pages;
           
            selectPage_haut.innerHTML = "";
            selectPage_bas.innerHTML = "";
          


            mainIndex.innerHTML = "";
            for(let i = 0; i < obj.results.length; i ++){
                var element = obj.results[i];
                if(serie_or_films.value=="movie"){
                
                    mainIndex.innerHTML += "<a class=\"movie\" href=\"detail.html?id=" + element.id +"&" + "genre="+serie_or_films.value + "\"><list-cell id=\"list-movie\" title=" + element.title.replace(/\s/g, '_') + " src=\"https://image.tmdb.org/t/p/w500" + element.poster_path + "\" rate=" + element.vote_average + "\n genre="+getGenre(element.genre_ids)+ "></list-cell></a>"
                }else{
                    mainIndex.innerHTML += "<a class=\"movie\" href=\"detail.html?id=" + element.id+"&" + "genre="+serie_or_films.value+ "\"><list-cell id=\"list-movie\" title=" + element.name.replace(/\s/g, '_') + " src=\"https://image.tmdb.org/t/p/w500" + element.poster_path + "\" rate=" + element.vote_average  + "\n genre="+getGenre(element.genre_ids)+ "></list-cell></a>"
                    
                 
                }
    
            }
          
          
            selectPage_haut.innerHTML = "<page-choice current =" + obj.page + " max=" + pageMax + "></page-choice>";
            selectPage_bas.innerHTML = "<page-choice current =" + obj.page + " max=" + pageMax + "></page-choice>";

            riot.mount("page-choice");
            riot.mount("list-cell");
        } else {
            console.log("erreur");
        }
    }
    request.send();
    
}


function getPage(){
    return pageMax;
}

function nextPage(){
    if(page < pageMax){
        page++;
        getMovieList();
        showContent()
    }
}

function previousPage(){
    if(page > 1){
        page-=1;
        getMovieList();
        showContent()
    }
}

function firstPage(){
    page = 1;
    getMovieList();
    showContent()
}

function lastPage(){
    page = pageMax;
    getMovieList();
    showContent()
}
