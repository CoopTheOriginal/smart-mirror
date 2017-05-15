$(document).ready(function () {

  // Date and Time
  var months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday'];

  function update(){
    var date = new Date();
    var ampm = date.getHours() < 12 ? 'AM' : 'PM';
    var hours = date.getHours() == 0
                ? 12
                : date.getHours() > 12
                  ? date.getHours() - 12
                  : date.getHours();

    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    var dayOfWeek = days[date.getDay()];
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();

    var dateString = dayOfWeek + ', ' + month + ' ' + day + ', ' + year;

    $('#date').text(dateString);
    $('#hours').text(hours);
    $('#minutes').text(minutes);
    $('#seconds').text(seconds);
    $('#ampm').text(ampm);
  }
  update();
  window.setInterval(update, 1000);

  // Pusher
  var pusher = new Pusher('d1a2deaa33578d481a34', {
    cluster: 'us2',
    encrypted: true
  });

  var channel = pusher.subscribe('my-channel');
  channel.bind('my-event', function(response_obj) {
    data = response_obj.data
    $('#intent').text(response_obj.intent)
    $('#response').text(response_obj.response)
    $('#name').text(response_obj.name)

    $('#weatherHighTemp').text(data.weather_high_temp)
    $('#weatherLowTemp').text(data.weather_high_temp)
    $('#weatherConditions').attr('src', weatherConditions(data.weather_conditions))
    $('#weatherWindSpeed').text(data.weather_wind_speed)
    $('#weatherWindDirection').attr('src', weatherWindDirection(data.weather_conditions))

    $('#reminderType').text(data.reminder_type)
    $('#reminderTitle').text(data.reminder_title)
    $('#reminderDate').text(data.reminder_date)
    $('#reminderTime').text(data.reminder_time)

    $('#trafficConditions').text(data.traffic_conditions)
    $('#trafficExptectedTime').text(data.traffic_exptected_time)
    $('#trafficUsualTime').text(data.traffic_usual_time)
    $('#trafficAlternativeRoute').text(data.traffic_alternative_route)
  });

  function weatherConditions(condition) {
    var image = condition === 'sunny' ? 'sunny' : 'rainy'
    return 'css/images/' + image + '.png'
  };

  function weatherWindDirection(condition) {
    var image = condition === 'north' ? 'north' : 'south'
    return 'css/images/' + image + '.png'
  };

});
