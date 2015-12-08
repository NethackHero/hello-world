var online = [];
var offline = [];
var currentActive = [];

var getJSONChannelInfo = function(url, offlineIndex){
	var xmlhttp = new XMLHttpRequest();
	var url = url;
	console.log(url);
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var responseText = xmlhttp.responseText;
			var jsonObj = JSON.parse(responseText);
			offline[offlineIndex].logo = jsonObj.logo;
			offline[offlineIndex].link = jsonObj.url;
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

var getJSONStreamInfo = function(urlBegin, urlEnd, index){
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
				getJSONChannelInfo(mainLink+channelsSubLink+urlEnd,offlineIndex);
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
	getJSONStreamInfo(mainLink + streamsSubLink, value, index);
	});

var displayAll = function(){
	var all = online.concat(offline);
	displayChannels(all);
	currentActive = all;
};

var displayOnline = function(){
	displayChannels(online);
	currentActive = online;
};

var displayOffline = function(){
	displayChannels(offline);
	currentActive = offline;
};

var displayChannels = function(arr){
	$('p').html('');
	arr.forEach(function(value, index, array){
		var channelStatus;
		var currentlyStreaming;
		var logo = "";
		if(value.online){
			channelStatus = "<b style='color:green'>" + value.name + "</b>" + " is online.";
			currentlyStreaming = " Currently streaming: " + value.status
			}
		else{
			channelStatus = "<b style='color:red'>" + value.name + "</b>" + " is offline.";
			currentlyStreaming = "";
		}
		
		if(value.logo != null){
			logo = "<img src='" + value.logo + "' >"
		}
		$('p').append(logo + channelStatus + currentlyStreaming + " <a href='" + value.link +"'>Click Here</a>" + "<br><br>");
		});
};

var searchChannel = function(){
	var text = document.getElementById('searchText').value.toLowerCase();
	var matchList = [];
	for(i=0; i<currentActive.length; i++){
		var matchAt = currentActive[i].name.toLowerCase().indexOf(text);
		if(matchAt != -1){
			matchList.push(currentActive[i]);
		}
		displayChannels(matchList);
	}
	//text.indexOf(text);
}

var clearIfDefault = function(){
	var text = document.getElementById('searchText').value;
	if(text === 'type here'){
		document.getElementById('searchText').value = '';
	}
}

$(document).ready(function(){
	});
