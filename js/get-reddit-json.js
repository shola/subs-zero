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

function getSubReddit(rurl) {
	  $.ajax({
	  	type: 'GET',
	  	dataType: "jsonp",
	  	jsonp: "jsonp",
	  	url: rurl, 
	  	cache: false,
	  	success: function(data) { 
	  		var postsArray = getChildrenInfo(data);
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