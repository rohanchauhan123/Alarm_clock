// to get the alarm file in a variable
var alarmAudio = new Audio('alarm.mp3');
var alarms = [];
// funtion to display real time 
function displayTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  var timeString = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  document.getElementById("clockTime").innerHTML = timeString;
}
// function to add alarm by choosing a time from input type time 
function addAlarm() {
  var alarmTimeInput = document.getElementById("alarmTime");
  var ampmSelector = document.getElementById("ampmSelector");
  var alarmTime = alarmTimeInput.value;

  if (alarmTime) {
    var alarmListItem = document.createElement("li");
    // /To add items or alarms in the li 
    alarmListItem.innerHTML = alarmTime + ' ' + ' <button onclick="deleteAlarm(this)" class="delete-btn">Delete</button>';
    document.getElementById("alarmList").appendChild(alarmListItem);
    alarmTimeInput.value = "";

    alarms.push({ time: alarmTime});
  }
}
// To delete a element of li form the list 
function deleteAlarm(button) {
  var listItem = button.parentNode;
  var list = listItem.parentNode;
  list.removeChild(listItem);

  var alarmTime = listItem.innerHTML.split(' ')[0];
  var ampm = listItem.innerHTML.split(' ')[1];
  
  var index = -1;
  for (var i = 0; i < alarms.length; i++) {
    if (alarms[i].time === alarmTime && alarms[i].ampm === ampm) {
      index = i;
      break;
    }
  }
  
  if (index > -1) {
    alarms.splice(index, 1);
  }
}
//To check the real time is matching with any alarm time if yes the alarm sound will play
function checkAlarms() {
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();

  for (var i = 0; i < alarms.length; i++) {
    var alarmTime = alarms[i].time;
    var alarmAMPM = alarms[i].ampm;
    var alarmHour = parseInt(alarmTime.split(':')[0]);
    var alarmMinute = parseInt(alarmTime.split(':')[1]);

    if (currentHour === alarmHour && currentMinute === alarmMinute) {
      alarmAudio.play();
      break;
    }
  }
}

setInterval(displayTime, 1000);
setInterval(checkAlarms, 1000);
