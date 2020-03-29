/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// document.addEventListener("dblclick", (event) => {
//   console.log(event);
// });

$(() => {

  // creates timeline element after new tweet submission
  const createTweetElement = function(tweet) {
    const $article = $('<article>').addClass('timeline');
    const $header = $('<header>').addClass('timeline-header');
    const $pic = $('<img>').attr('src', tweet.user.avatars);
    const $name = $('<p>').addClass('person').text(tweet.user.name);
    const $avatar = $('<div>').addClass('avatar');
    const $handle  = $('<div>').addClass('user').text(tweet.user.handle);
    const $content = $('<p>').addClass('tweetContent').text(tweet.content.text);
    const $footer = $('<footer>').addClass('footer');
    const $actions = $('<div>').addClass('actions');
    const $flag = $('<i>').addClass('fas fa-flag');
    const $retweet = $('<i>').addClass('fas fa-retweet');
    const $heart = $('<i>').addClass('fas fa-heart');


    //used to calculate time since tweet was posted in timeline elements, by comparing tweet time to current time
    let currentTime = (Date.now() / 1000);
    let unix_timestamp = (tweet.created_at / 1000);
    let elapsedTime = (currentTime - unix_timestamp);
    let seconds = Math.floor(elapsedTime);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);

    let $time = 0;
    if (years >= 1) {
      $time = $('<p>').text(years + " years ago");
    } else
    if (months >= 1) {
      $time = $('<p>').text(months + " months ago");
    } else
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
   
    $avatar.append($pic);
    $avatar.append($name);
    $header.append($avatar);
    $header.append($handle);
    $article.append($header);
    $article.append($content);
    $footer.append($time);
    $actions.append($flag);
    $actions.append($retweet);
    $actions.append($heart);
    $footer.append($actions);
    $article.append($footer);
    return $article;
  };


  // takes new tweet text upon submission, checks to ensure it is valid (not empty, and not longer than 140 chars), saves the tweet to db, then posts to timeline.

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
    $('#tweetsContainer').append(createTweetElement(tweet));
    }
  }
  
  const $form = $('form');
  const $counter = $('#counter')
  
  
  $form.on('submit', (event) => {
    event.preventDefault();
    const formData = $form.serialize();
  
    if (formData === 'text=') {
        $( "#alert2" ).slideDown( "slow", function() {
        });
     return;
     } else 
     if ($counter[0].value < 0 ) {
        $( "#alert1" ).slideDown( "slow", function() {
        });
      return;
    }
  
    $.post('/tweets', formData)
    .then((res) => {
      $( "#alert1" ).slideUp( "fast", function() {});
      $( "#alert2" ).slideUp( "fast", function() {});
      $('#tweet-text').val(''); 
      $("#tweetsContainer").html(res);
      $counter.val(140);
      loadtweets(res);
    })
  })
  
  const loadtweets = function() {
  $.getJSON('/tweets') 
  .then((res) => {
    renderTweets(res);
    })
  }

  loadtweets();
  
})
    