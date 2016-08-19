$.get('/api/days')
  .then(function(days) {
    days.forEach(function(day) {
      $('<button class="btn btn-circle day-btn"></button>')
        .text(day.number).insertBefore($('.day-buttons #day-add'))
      $('.day-buttons :contains("1")').addClass('current-day')
      var hotel = $($hotelSelect.find('[value="' + day.hotelId + '"]')[0])
      var $button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');
      var $title = $('<span class="title"></span>').text(hotel.text()).val(hotel.val());
      var $itnItem = $('<div class="itinerary-item" data-day="' + $('.current-day').text() + '"></div>')
        .append($title)
        .append($button);
    });
  })
  .then(function() {
    console.log('hereeee')
    console.log($('[data-day="' + $('.current-day').text() + '"]'))
    $('[data-day="' + $('.current-day').text() + '"]')
      .each(function(index, item) {
        console.log(item)
        $hotel.append($(item))
      })
  });






// add a day button
$addDay = $('#day-add');
$addDay.on('click', function() {
  // ajax request to post new day
  var dayArray
  $.get('/api/days')
    .then(function(days) {
      dayArray = days;
    })
    .then(function() {
      $.post('/api/days/' + (dayArray.length + 1));
    })
    .then(function() {
      var $newDayBtn = $('<button class="btn btn-circle day-btn"></button>')
        .text(dayArray.length + 1);
      $newDayBtn.insertBefore($addDay);
    })
    .catch(function(err) {
      return err
    });
})


$('.day-buttons').on('click', '.day-btn', function() {
  if ($(this).text() === '+') return;

  $('#itinerary').find('[data-day="' + $('.current-day').text() + '"]').each(function(index, item) {
    console.log(item)
    $(item).hide()
  });

  $('.day-btn').removeClass('current-day')
  $(this).addClass('current-day')

  $('#itinerary').find('[data-day="' + $('.current-day').text() + '"]').each(function(index, item) {
    console.log(item)
    $(item).show()
  });


})
