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
	// assumes that the url starts with 'http://...'
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
		// imgur will open an image with any extension. use jpg as default
		return url + ".jpg";
	}
}

function fixImgurURL(url) {
	var re = /imgur\.com/;

	if (!re.test(url)) {
		return false;
	} else {
		return fixPostfix(fixPrefix(url));
	}
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

	  		for (var i = 0; i < numTiles; i++) {
	  			var postItem = postsArray[i],
		  		 		el = $("#" + i),
		  				url = fixImgurURL(postItem.url);

		  		el.find(".thumbnail").html(postItem.title);
		  		el.find(".modal-title").html(postItem.title);
		  		el.find(".modal-body").append("<img src='" + url + "'>");
		  	}
	  	},
	  	error: function() { alert("there was an error retrieving the json from url"); }
	  });
	}

function isNotMediaObject(url) {
	// the imgur link leads to a media object if "/gallery/" or "/a/" is present
	return !((/\/gallery\//).test(url) || (/\/a\//.test(url)));
}

function getChildrenInfo(subredditJSON) {
	// assumes a valid JSON object from the Reddit API
	// only returns single-image links, result's length may be less than children's
	var children = subredditJSON.data.children,
			numChildren = children.length,
			result = [],
			j = 0;
	
	for (var i = 0; i < numChildren; i++) {
		var child = children[i].data,
				url = child.url;

		if (isNotMediaObject(url)) {
			result[j] = {"id": child.id, "url": url, "title": child.title};
			j++;
		}
	}

	return result;
}

getSubReddit("http://www.reddit.com/r/funny.json");