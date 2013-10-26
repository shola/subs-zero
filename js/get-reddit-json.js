// (function() {
//   var rurl = "http://www.reddit.com/r/funny.json";
//   $.ajax({
//   	type: 'GET',
//   	dataType: "jsonp",
//   	jsonp: "jsonp",
//   	url: rurl, 
//   	cache: false,
//   	success: function(data) { 
//   		alert(data.data.children[0].data.url); 
//   		alert(typeof data);
//   		console.log(data);
//   	},
//   	error: function() { alert("bad"); }
//   });
// })();

function fixPrefix(url) {
	var splitURL = url.split("//"),
			tail = splitURL[1];

	if (tail.slice(0, 11) === "i.imgur.com") {
		return url;
	} else {
		return "http://i." + tail;
	}
}

function fixPostfix(url) {
	var imgExt = {'.jpg': true, '.png': true, '.gif': true};
	var urlPostfix = url.slice(-4);

	if (urlPostfix in imgExt) {
		return url;
	} else {
		// imgur will open an image with any extension. use gif as default
		return url + ".gif";
	}
}

function fixImgurURL(url) {
	var splitURL = url.split("//"),
			tail = splitURL[1],
			re = /imgur\.com/;

	if (!re.test(url)) {
		return false;
	} 

	// trim "gallery/" to ensure that the url goes to an image link, not album.
	// assume "gallery/" will only be included un URL once 
	splitURL = url.split("gallery/");
	if (splitURL.length > 1) {
		url = splitURL[0] + splitURL[1];
	} else {
		url = splitURL[0];
	}

	return fixPostfix(fixPrefix(url));
}


function getSubReddit(rurl) {
	  $.ajax({
	  	type: 'GET',
	  	dataType: "jsonp",
	  	jsonp: "jsonp",
	  	url: rurl, 
	  	cache: false,
	  	success: function(data) { 
	  		var postsArray = getChildrenInfo(data),
	  				numTiles = 9;
	  			 	i = 1;

	  		while (i <= numTiles) {
	  			postItem = postsArray[i];
	  				
		  		// the only imgur images that will not be displayed in this version are media albums,
		  		// which are identified by have a populated media_embed attribute. further explanation
		  		// to follow

		  		// need to generalize beyond just the first item in the list!
		  		// console.log(postsArray, postItem, postItem.media_embed);
		  		if (!postItem.media_embed)	{		
			  		var el = $("#" + i),
			  				url = fixImgurURL(postItem.url);
			  		el.find(".thumbnail").html(postItem.title);
			  		el.find(".modal-title").html(postItem.title);
			  		el.find(".modal-body").append("<img src='" + url + "'>");
			  		i++;
			  	}
		  		// console.log(el);
		  	}
	  	},
	  	error: function() { alert("there was an error retrieving the json from url"); }
	  });
	}

function getChildrenInfo(subredditJSON) {
	// assumes a valid JSON object from the Reddit API
	var children = subredditJSON.data.children,
			numChildren = children.length
			result = [];
	
	for (var i = 0; i < numChildren; i++) {
		var child = children[i].data,
				url = fixImgurURL(child.url);
		if (url)
			result[i] = {"id": child.id, "url": url, "title": child.title};
	};

	return result;
}

getSubReddit("http://www.reddit.com/r/funny.json");