function loadData(){
  var $nyArticles = $('#ny-times-articles');
  var articleRequest = $(".nySearch").val();

//Sets the articles blank everytime a new search is started.
  $nyArticles.text("");

//The NY API request with the value of the search input.
   var nyUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + articleRequest + '=&sort=newest&api-key=e167471ecd274f53962769e06c849f2b';

    $.getJSON(nyUrl, function(data){

      nyArticles = data.response.docs;
      console.log(nyArticles);
      nySummary = data.response.summary;

      for(var i = 0; i < nyArticles.length; i++){
        var articles = nyArticles[i];

//Appends the the Articles in a list.
        $nyArticles.append('<li class="article">'+
                '<a href="'+articles.web_url+'">'+articles.headline.main+'</a>'+
                '<p>' + articles.snippet + '</p>'+
            '</li>');

      };
// If NY times request fails, throw an error message.
    }).fail(function(e){
      $nyArticles.text("NY times request could not be found.");
      console.log("Request failed");
    });

return false;


};
$(".article").hover(function(renderIframe){
  $('.idModal').css("display", "block");
  $('.idModal').attr('<iframe src="'+nyUrl+ '"></iframe>"');
})

$('.idToHover').mouseout(function(){
  $('.idModal').css("display", "none");
});

$('.search-content').submit(loadData);