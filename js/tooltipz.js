var $tip1 = $('#tip1');
var $tip2 = $('#tip2');

$tip1.tooltip({trigger: 'hover'})
  .on('click', function() {
     $tip1.tooltip('toggle');
  });

$tip2.tooltip({trigger: 'hover'})
  .on('click', function() {
     $tip2.tooltip('toggle');
  });