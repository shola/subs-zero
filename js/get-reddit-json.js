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
	// // assumes imgur.com link
	// if (preg_match("/http:\/\/i.imgur.com/", url)) {
	// 	return url;
	// } else {
	// 	url = explode("//", url)[1];
	// 	return "http://i." . url;
	// }
}

function fixPostfix(url) {
	// imgExt = ['.jpg', '.png', '.gif'];
	// urlPostfix = substr(url, -4);

	// if (in_array(urlPostfix, imgExt)) {
	// 	return url;
	// } else {
	// 	// imgur will open an image with any extension. use jpg as default
		
	// 	return url . ".jpg";
	// }
}

function fixImgurURL(url) {
	// // assume only image URL's

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