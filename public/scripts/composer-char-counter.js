$(document).ready(function() {
  $( "#tweet-text" ).keypress(function() {
      $('#counter').html(function(i, val) { 
        val--;
        if (val <= 0) {
          $(this).css("color", "red");
        }
        return val;
      });
  })
});
