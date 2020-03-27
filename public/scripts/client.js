/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// document.addEventListener("dblclick", (event) => {
//   console.log(event);
// });

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

/*{ <section class="timeline">
        <form>
          <header class="timeline-header">
            <div class="avatar">
            <img src="https://i.imgur.com/nlhLi3I.png">
            <p class="person">Joline</p>
            </div>
            <div class="user">@joline</div>
          </header>
          
          <p class="tweetContent">
            If I have seen further it is by standing on the shoulders of giants (or possibly just regular tall dudes)
          </p>
          <footer class="footer">
            <p >10 days ago</p>
            <div>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
            </div>
          </footer>
        </form>
      </section> }*/

$(() => {

const createTweetElement = function(tweet) {
 const $article = $('<article>').addClass('timeline')
 const $form = $('<form>');
 const $header = $('<header>').addClass('timeline-header');
 const $avatar = $('<div>').addClass('avatar');
 const $pic = $('<img>').attr('src', tweet.user.avatars);
 const $name = $('<p>').addClass('person').text(tweet.user.name);
 const $handle  = $('<div>').addClass('user').text(tweet.user.handle);
 const $content = $('<p>').addClass('tweetContent').text(tweet.content.text);
 const $footer = $('<footer>').addClass('footer');
//  const $time = $('<p>').text(tweet.created_at);
 const $div = $('<div>')
 const $flag = $('<i>').addClass('fas fa-flag');
 const $retweet = $('<i>').addClass('fas fa-retweet');
 const $heart = $('<i>').addClass('fas fa-heart');

 let unix_timestamp = tweet.created_at
 let actualdate = new Date(unix_timestamp * 1000); 
 let hours = actualdate.getHours();
 let days = hours / 24;

 let $time = 0;
 if (hours < 24) {
   $time = $('<p>').text(hours + " hours ago");
 } else
  $time = $('<p>').text(days + " days ago");

 $header.append($avatar);
 $header.append($pic);
 $header.append($name);
 $header.append($handle);
 $article.append($header);
 $article.append($content);
 $footer.append($time);
 $footer.append($div);
 $footer.append($flag);
 $footer.append($retweet);
 $footer.append($heart);
 $article.append($footer);
 return $article;
};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
  $('#tweetsContainer').append(createTweetElement(tweet));
  }
}

renderTweets(data);

});