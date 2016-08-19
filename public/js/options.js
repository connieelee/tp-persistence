// so we can select things
var $optionsPanel = $('#options-panel');
var $hotelSelect = $optionsPanel.find('#hotel-choices');
var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
var $activitySelect = $optionsPanel.find('#activity-choices');
var $itn = $('#itinerary');
var $hotel = $itn.find('ul[data-type="hotel"]');
var $restaurants = $itn.find('ul[data-type="restaurants"]');
var $activities = $itn.find('ul[data-type="activities"]');


// populate select menus
$.get('/api/hotels')
    .then(function(hotels) {
        hotels.forEach(function(hotel) {
            var $option = $('<option></option>')
                .text(hotel.name)
                .val(hotel.id);
            $hotelSelect.append($option);
        });
    })
    .catch(console.error.bind(console));

$.get('/api/restaurants')
    .then(function(restaurants) {
        restaurants.forEach(function(restaurant) {
            var $option = $('<option></option>')
                .text(restaurant.name)
                .val(restaurant.id);
            $restaurantSelect.append($option);
        });
    })
    .catch(console.error.bind(console));

$.get('/api/activities')
    .then(function(activities) {
        activities.forEach(function(activity) {
            var $option = $('<option></option>')
                .text(activity.name)
                .val(activity.id);
            $activitySelect.append($option);
        });
    })
    .catch(console.error.bind(console));

// to add things to itn
$optionsPanel.on('click', 'button', function() {
    var $selectType = $($(this).siblings('select')[0]);
    var $selectedOption = $selectType.find('option:selected');
    var attractionId = $selectedOption.val();
    var name = $selectedOption.text();
    var type = $selectType.attr('id').slice(0, -8);

    // build the item!
    var $button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');
    var $title = $('<span class="title"></span>').text(name);
    var $itnItem = $('<div class="itinerary-item"></div>')
        .append($title)
        .append($button);

    // put item into panel based on type
    switch (type) {
        case 'hotel':
            $hotel.append($itnItem);
            break;
        case 'restaurant':
            $restaurants.append($itnItem);
            break;
        case 'activity':
            $activities.append($itnItem);
            break;
        default:
            throw Error;
    }

    // finally getting to persissssstence
	var curDay = $('.current-day').text();
	$.post('/api/days/' + curDay + '/' + type + '/' + attractionId);
})

// remove items from itn
$itn.on('click', '.remove', function(){
	$($(this).parent()[0]).detach();
})












