import './visualization';

$(function() {
  $('#buttonbutton').on('click', (e) =>{
    e.preventDefault()
    var newInterval = $('#intervalPicker').val()
    var dateRoot = 'http://localhost:3001'

    function getDateData() {
      $.ajax({
        url: dateRoot + '/api/domain/currentZones/' + newInterval,
        method: 'GET'
      }).then(function(data) {
        console.log(data)
      });
    }

    getDateData();
  });

  var options = '';

  for(var i = 5; i <= 120; i += 5){
    if(i === 60) {
      options += '<option value = "' + i + '" selected="selected">' + i +'</option>';
    } else {
        options += '<option value = "' + i + '">' + i +'</option>';
    }
  }

  $('#intervalPicker').html(options)
});
