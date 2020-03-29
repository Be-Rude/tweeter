// $(document).ready(function() {
//   $( "#tweet-text" ).keypress(function() {
//       $('#counter').html(function(i, val) { 
//         val--;
//         if (val <= 0) {
//           $(this).css("color", "red");
//         }
//         return val;
//       });
//   })
 

// });

//character counter, counts down from 140, then turns red if characters remaining is less than 0.

$(document).ready(function(){
  let maxlen = 140;
  $("#tweet-text").keyup(function(e){
  
   let txtLen = $(this).val().length;
   let remain = maxlen - txtLen;
    $("#counter").text(remain);

  if (txtLen > maxlen) {
    $('#counter').css("color", "rgb(200, 0, 0)");
   } else
    $('#counter').css("color", "#545149");
  });
 });
