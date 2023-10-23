const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('id')
const genre = urlParams.get('genre')
var tri_note=""
var tri_titre=""

var title = "";
var src = "";
var categories = "";
var director = "";
var actorlist = "";
var srcactorone = "";
var srcactortwo = "";
var srcactorthree = "";
var nameactorone = "";
var countries;
var nameactortwo = "";
var nameactorthree = "";
var resume = "";
var rate = "";
var rateAmount = "";
var date=""

getMovieDetails();

function getMovieDetails(){
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.themoviedb.org/3/"+genre+"/" + product + "?api_key=e5cbab0c52f5ec938209af4545633863&language=fr");
    console.log("https://api.themoviedb.org/3/"+genre+"/" + product + "?api_key=e5cbab0c52f5ec938209af4545633863&language=fr")

    request.send();
    request.onload = () => {
        if(request.status == 200){
            var obj = JSON.parse(request.response);
            if(genre=="movie"){
                countries=obj.production_countries[0].iso_3166_1;
                title = obj.title;
                date=obj.release_date;
            }else{
                countries=obj.origin_country;
                title=obj.name ;
                date=obj.first_air_date
                if(obj.created_by.length!=0)
                    director=obj.created_by[0].name;
                
            }
            src = obj.poster_path;
            for(let i = 0; i < obj.genres.length; i ++){
                if(i < obj.genres.length - 1){
                    categories = categories + obj.genres[i].name + ", ";
                } else {
                    categories = categories + obj.genres[i].name;
                }
            }
            resume = obj.overview;
            rate = obj.vote_average;
            rateAmount = obj.vote_count;
           
           
      
            getHumanDetails();
        } else {
            console.log("erreur");
        }
    }
}

function getHumanDetails(){
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.themoviedb.org/3/"+genre+"/" + product + "/credits?api_key=e5cbab0c52f5ec938209af4545633863&language=fr");
    request.send();
    request.onload = () => {
        if(request.status == 200){
            var obj = JSON.parse(request.response);
            console.log(request.responseText)
            srcactorone = "https://image.tmdb.org/t/p/w500" + obj.cast[0].profile_path;
            nameactorone = obj.cast[0].name;
            srcactortwo = "https://image.tmdb.org/t/p/w500" + obj.cast[1].profile_path;
            nameactortwo = obj.cast[1].name;
            srcactorthree = "https://image.tmdb.org/t/p/w500" + obj.cast[2].profile_path;
            console.log("https://image.tmdb.org/t/p/w500" + obj.cast[2].profile_path);
            nameactorthree = obj.cast[2].name;
            obj.prod
            actorlist = nameactorone + ", " + nameactortwo + ", " + nameactorthree;
            if(genre=="movie"){
                for(let i = 0; i < obj.crew.length; i ++){
                    if(obj.crew[i].department === "Directing" && obj.crew[i].job === "Director"){
                        director = obj.crew[i].name;
                    }
                }

            }
            var divMainDetail = document.getElementById("maindetail");
            divMainDetail.innerHTML += "<movie-detail title=\"" + title + "\" src=\"https://image.tmdb.org/t/p/w500" + src + "\" categories=\"" + categories +"\" countrie=\""+countries+"\" date=\""+date+"\" resume=\"" + resume + "\" director=\"De " + director + "\" actorname=\"Avec " + actorlist + "\" srcactorone=\"" +  srcactorone + "\" srcactortwo=\"" + srcactortwo + "\" srcactorthree=\"" + srcactorthree + "\" rate=\"Note : " + rate + "/10\" rateamount=\"" + rateAmount + " Avis\"></movie-detail>";
            riot.mount("movie-detail")
        } else {
            console.log("erreur");
        }
    }
}