/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// document.addEventListener("dblclick", (event) => {
//   console.log(event);
// });

$(() => {

const createTweetElement = function(tweet) {
 const $article = $('<article>').addClass('timeline')
 const $header = $('<header>').addClass('timeline-header');
 const $avatar = $('<div>').addClass('avatar');
 const $pic = $('<img>').attr('src', tweet.user.avatars);
 const $name = $('<p>').addClass('person').text(tweet.user.name);
 const $handle  = $('<div>').addClass('user').text(tweet.user.handle);
 const $content = $('<p>').addClass('tweetContent').text(tweet.content.text);
 const $footer = $('<footer>').addClass('footer');
 const $div = $('<div>')
 const $flag = $('<i>').addClass('fas fa-flag');
 const $retweet = $('<i>').addClass('fas fa-retweet');
 const $heart = $('<i>').addClass('fas fa-heart');

 let currentTime = Math.floor(Date.now() / 1000);
 let unix_timestamp = Math.floor(tweet.created_at) / 1000;
 let elapsedTime = currentTime - unix_timestamp;
 let seconds = Math.floor(elapsedTime);
 let minutes = Math.floor(seconds / 60);
 let hours = Math.floor(minutes / 60);
 let days = Math.floor(hours / 24);

 let $time = 0;
 if (days >= 1) {
  $time = $('<p>').text(days + " days ago");
 } else 
 if (hours >= 1) {
   $time = $('<p>').text(hours + " hours ago");
 } else
 if (minutes >= 1) {
  $time = $('<p>').text(minutes + " minutes ago");
 } else
 $time = $('<p>').text(seconds + " seconds ago");

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

// renderTweets(data);

const $form = $('form');


$form.on('submit', (event) => {
  event.preventDefault();
  const formData = $form.serialize();

  $.post('/tweets', formData)
  .then((res) => {
    console.log(res);
  });
  $('#tweet-text').val(''); 
});


const loadtweets = function() {
$.getJSON('/tweets') 
.then((res) => {
  renderTweets(res);
})
}
loadtweets();

})