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
		// imgur will open an image with any extension. use jpg as default
		return url + ".jpg";
	}
}

function fixImgurURL(url) {
	var splitURL = url.split("//"),
			tail = splitURL[1],
			re = /imgur\.com/;

	if (!re.test(url)) {
		return false;
	} 

	var fixedURL = fixPostfix(fixPrefix(url));

	$.ajax({
				type: 'HEAD',
				url: fixedURL,
				success: function() {
					return fixedURL;
				},
				error: function() {
					return false;
				}
	});

	// if (!(preg_match("/imgur.com/", url))) {
	// 	return false;
	// } 

	// // post = fixPostfix(url);
	// // if(post) {
	// // 	return fixPrefix(post);
	// // }
	// // else {
	// // 	return "doesn't exist";
	// // }

	// res = fixPostfix(fixPrefix(url));
	// if(@exif_imagetype(res)) {
	// 	return res;
	// } else {
	// 	return false;
	// }
}


function getSubReddit(rurl) {
	  $.ajax({
	  	type: 'GET',
	  	dataType: "jsonp",
	  	jsonp: "jsonp",
	  	url: rurl, 
	  	cache: false,
	  	success: function(data) { 
	  		var postsArray = getChildrenInfo(data);
	  		var postItem = postsArray[0];
	  		var el = $("#4");
	  		var url = fixImgurURL(postItem.url);

	  		el.find("a").attr("href", url);
	  		el.find(".thumbnail").html(postItem.title);
	  		el.find(".modal-title").html(postItem.title);
	  		el.find(".modal-body").append("<img src='" + url + "'>");
	  		console.log(el);
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
		var child = children[0].data;
		result[i] = {"id": child.id, "url": child.url, "title": child.title};
	};

	return result;
}