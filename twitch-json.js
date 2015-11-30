var online = [];
var offline = [];

var getJSONChannelInfo = function(url){
	var xmlhttp = new XMLHttpRequest();
	var url = url;
	
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var responseText = xmlhttp.responseText;
			var jsonObj = JSON.parse(responseText);
		}
	}
}

var getJSONText = function(urlBegin, urlEnd, index){
	var xmlhttp = new XMLHttpRequest(); //keystone of AJAX
	var url = urlBegin +urlEnd;

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var responseText = xmlhttp.responseText;
			var jsonObj = JSON.parse(responseText);
			if(jsonObj.stream === null){
				//console.log("Offline ");
				$('p').append("<b style='color:red'>" + urlEnd + "</b> is Offline ");
				offline.push({name:urlEnd, online: false});
			}
			else{
				//console.log("Online ");
				var streamLink = jsonObj.stream.channel.url;
				var channelLogo = jsonObj.stream.channel.logo;
				var channelName = jsonObj.stream.channel.display_name;
				var currentlyStreaming = jsonObj.stream.channel.status;
				$('p').append("<b style='color:green'>" + channelName + "</b>" + " is <b>Online</b> and currently streaming: <b style='color:green'>" + currentlyStreaming + "</b>. <a href='" + streamLink +"'>Click Here</a> <img src='" + channelLogo + "'>");
				online.push({name:channelName, link:streamLink,
					logo: channelLogo, status: currentlyStreaming,
					online: true
					});
			}
			if(index===countUsers-1){
				console.log("finish");
				displayAll();
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

var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","medrybw","tsm_theoddone"]
var mainLink = "https://api.twitch.tv/kraken/";
var channelsSubLink = "channels/";
var streamsSubLink = "streams/";
var countUsers = users.length;
users.forEach(function(value, index, array){
	//getJSONText(mainLink + channelsSubLink, value);
	getJSONText(mainLink + streamsSubLink, value, index);
	});
//getJSONText("https://api.twitch.tv/kraken");
//var ffc = getJSONText("https://api.twitch.tv/kraken/channels/freecodecamp/");

//console.log(main); //the reason it is undefined is because this comes first
//console.log(ffc);

var displayAll = function(){
	console.log("Displaying all");
	var all = online.concat(offline);
	console.log(all);
};

var displayOnline = function(){
	console.log("Displaying online");
	console.log(online);
};

var displayOffline = function(){
	console.log("Displaying offline");
	console.log(offline);
};

$(document).ready(function(){
	});
