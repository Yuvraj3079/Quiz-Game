"use strict";
    /*technology: Access a built-in property for the document object*/

var $ = function(id) { return document.getElementById(id); };

var hour, minute, second, ampm;

var displayCurrentTime = function() {
    /*technology: Create a Date object*/
    /*technology: Use a built-in method for the Date object*/



    var myDate = new Date();
    hour = 0; //myDate.getHours();
    minute = myDate.getMinutes();
    second = myDate.getSeconds();
    //adds a leading zero to single digits.
    hour = padSingleDigit(hour);
    minute = padSingleDigit(minute);
    second = padSingleDigit(second);

    if(parseInt(hour) == 24 || parseInt(hour) == 0){
        hour = "12";
        ampm = "AM";
    }
    else if(parseInt(hour) > 12){
        hour = parseInt(hour) - 12;
        ampm = "PM";
    }else{
        ampm = "AM";
    }

    /*technology: Access a built-in property for the window object*/
    $("hours").innerHTML = (hour);
    $("minutes").innerHTML = (minute);
    $("seconds").innerHTML = (second);
    $("ampm").innerHTML = (ampm);

}

var padSingleDigit = function(num) {
	if (num < 10) {	return "0" + num; }
	else { return num; }
};

window.onload = function() {
    // set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.
    setInterval(displayCurrentTime, 1000);

};