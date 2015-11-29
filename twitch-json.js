var getJSONText = function(url){
	var xmlhttp = new XMLHttpRequest(); //keystone of AJAX
	var url = url;

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var responseText = xmlhttp.responseText;
			var jsonObj = JSON.parse(responseText);
			if(jsonObj.stream === null){
				//console.log("Offline ");
				$('p').append("Offline ");
			}
			else{
				//console.log("Online ");
				var streamLink = jsonObj.stream.channel.url;
				var channelLogo = jsonObj.stream.channel.logo;
				var channelName = jsonObj.stream.channel.display_name;
				var currentlyStreaming = jsonObj.stream.game;
				$('p').append("<b style='color:red'>" + channelName + "</b>" + " is <b>Online</b> and currently streaming: <b style='color:green'>" + currentlyStreaming + "</b>. <a href='" + streamLink +"'>Click Here</a> <img src='" + channelLogo + "'>");
			}
			//console.log(responseText);
			$('p').append(responseText + "<br><br>");
			//we can append to HTML text
			//getJSONText("https://api.twitch.tv/kraken/channels/freecodecamp/"); //LOOPING
			//return responseText; //doesn't work because the outside gets called first ... this may have an asynchronous
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","medrybw"]
var mainLink = "https://api.twitch.tv/kraken/";
var channelsSubLink = "channels/";
var streamsSubLink = "streams/";
users.forEach(function(value, index, array){
	//getJSONText(mainLink + channelsSubLink + value);
	getJSONText(mainLink + streamsSubLink + value);
	console.log("Index: "+index);
	});
//getJSONText("https://api.twitch.tv/kraken");
//var ffc = getJSONText("https://api.twitch.tv/kraken/channels/freecodecamp/");

//console.log(main); //the reason it is undefined is because this comes first
//console.log(ffc);

$(document).ready(function(){
	});
