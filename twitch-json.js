var online = [];
var offline = [];

var getJSONChannelInfo = function(url, offlineIndex){
	var xmlhttp = new XMLHttpRequest();
	var url = url;
	console.log(url);
	xmlhttp.onreadystatechange = function(){
		console.log("I'm in getJSONChannelInfo2");
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var responseText = xmlhttp.responseText;
			var jsonObj = JSON.parse(responseText);
			offline[offlineIndex].logo = jsonObj.logo;
			console.log(jsonObj.logo);
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
				/*
				$('p').append("<b style='color:red'>" + urlEnd + "</b> is Offline ");
				*/
				offline.push({name:urlEnd, online: false});
				var offlineIndex = offline.length-1;
				getJSONChannelInfo(mainLink+channelsSubLink+urlEnd,index);
			}
			else{
				var streamLink = jsonObj.stream.channel.url;
				var channelLogo = jsonObj.stream.channel.logo;
				var channelName = jsonObj.stream.channel.display_name;
				var currentlyStreaming = jsonObj.stream.channel.status;
				/*$('p').append("<b style='color:green'>" + channelName + "</b>" + " is <b>Online</b> and currently streaming: <b style='color:green'>" + currentlyStreaming + "</b>. <a href='" + streamLink +"'>Click Here</a> <img src='" + channelLogo + "'>");*/
				online.push({name:channelName, link:streamLink,
					logo: channelLogo, status: currentlyStreaming,
					online: true
					});
			}
			if(index===countUsers-1){
				console.log("finish");
				window.setTimeout(displayAll, 1000); //setting a pause for 1 second as a temporary solution
				//displayAll(); //this sometimes doesn't show all channels -- best figure out how to do an asynchrous display
			}
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

var displayAll = function(){
	var all = online.concat(offline);
	displayChannels(all);
};

var displayOnline = function(){
	displayChannels(online);
};

var displayOffline = function(){
	displayChannels(offline);
};

var displayChannels = function(arr){
	$('p').html('');
	arr.forEach(function(value, index, array){
		var channelStatus;
		if(value.online){
			channelStatus = "<b style='color:green'>" + value.name + "</b>" + " is online";
			}
		else{
			channelStatus = "<b style='color:red'>" + value.name + "</b>" + " is offline";
		}
		$('p').append("<img src='" + value.logo + "' >" + channelStatus + "<br><br>");
		});
};

$(document).ready(function(){
	});
