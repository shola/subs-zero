function fixPrefix(e){var t=e.split("//"),n=t[1];if(n.slice(0,11)==="i.imgur.com"){return e}else{return"http://i."+n}}function fixPostfix(e){var t={".jpg":true,".png":true,".gif":true};var n=e.slice(-4);if(n in t){return e}else{return e+".jpg"}}function fixImgurURL(e){return fixPostfix(fixPrefix(e))}function getSubReddit(e){$.ajax({type:"GET",dataType:"jsonp",jsonp:"jsonp",url:e,cache:false,success:function(e){var t=getChildrenInfo(e),n=9;for(var r=1;r<=n;r++){var i=t[r-1],s=$("#"+r),o=fixImgurURL(i.url);console.log(i);s.find(".thumbnail").html(i.title);s.find(".modal-title").html(i.title);s.find(".modal-body").append("<img src='"+o+"'>")}},error:function(){alert("there was an error retrieving the json from url")}})}function isNotMediaObject(e){var t=/imgur\.com/;if(t.test(e)){return!(/\/gallery\//.test(e)||/\/a\//.test(e))}else{return false}}function getChildrenInfo(e){var t=e.data.children,n=t.length,r=[],i=0;for(var s=0;s<n;s++){var o=t[s].data,u=o.url;if(isNotMediaObject(u)){r[i]={id:o.id,url:u,title:o.title};i++}}return r}getSubReddit("http://www.reddit.com/r/funny.json")