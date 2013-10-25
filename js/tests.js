// test( "hello test", function() {
//   ok( 1 == "1", "Passed!" );
//   ok( 3 == "3", "Passed!" );
// });

var subredditJSON = {
  "kind": "Listing",
  "data": {
      "modhash": "1fdj6snd0qe017cfc07c987ac80cc3c73f093c3c9e8c3c7a0d",
      "children": [{
          "kind": "t3",
          "data": {
              "domain": "i.imgur.com",
              "banned_by": null,
              "media_embed": {},
              "subreddit": "funny",
              "selftext_html": null,
              "selftext": "",
              "likes": null,
              "secure_media": null,
              "saved": false,
              "id": "1p6ks5",
              "secure_media_embed": {},
              "stickied": false,
              "author": "red_4",
              "media": null,
              "score": 2035,
              "approved_by": null,
              "over_18": false,
              "hidden": false,
              "thumbnail": "http://d.thumbs.redditmedia.com/49HOA4P7qdw-M28i.jpg",
              "subreddit_id": "t5_2qh33",
              "edited": false,
              "link_flair_css_class": null,
              "author_flair_css_class": null,
              "downs": 3486,
              "is_self": false,
              "permalink": "/r/funny/comments/1p6ks5/my_pet_lizard_susie_balancing_two_soda_cans_on/",
              "name": "t3_1p6ks5",
              "created": 1382718712.0,
              "url": "http://i.imgur.com/VbrHSv5.jpg",
              "author_flair_text": null,
              "title": "My pet lizard, Susie, balancing two soda cans on her head.",
              "created_utc": 1382689912.0,
              "link_flair_text": null,
              "distinguished": null,
              "num_comments": 176,
              "visited": false,
              "num_reports": null,
              "ups": 5521
          }
      }, {
          "kind": "t3",
          "data": {
              "domain": "imgur.com",
              "banned_by": null,
              "media_embed": {},
              "subreddit": "funny",
              "selftext_html": null,
              "selftext": "",
              "likes": null,
              "secure_media": null,
              "saved": false,
              "id": "1p6ouk",
              "secure_media_embed": {},
              "stickied": false,
              "author": "thomisaac",
              "media": null,
              "score": 684,
              "approved_by": null,
              "over_18": false,
              "hidden": false,
              "thumbnail": "http://d.thumbs.redditmedia.com/_VLbdGHEzM_DD-7Q.jpg",
              "subreddit_id": "t5_2qh33",
              "edited": false,
              "link_flair_css_class": null,
              "author_flair_css_class": null,
              "downs": 205,
              "is_self": false,
              "permalink": "/r/funny/comments/1p6ouk/you_maybe_hipster_but_you_will_never_be_this/",
              "name": "t3_1p6ouk",
              "created": 1382725933.0,
              "url": "http://imgur.com/W44bbC9",
              "author_flair_text": null,
              "title": "You maybe Hipster, but you will never be this hipster [x-post from r/hipster]",
              "created_utc": 1382697133.0,
              "link_flair_text": null,
              "ups": 889,
              "num_comments": 44,
              "visited": false,
              "num_reports": null,
              "distinguished": null
          }
      }],
      "after": "t3_1p5l0r",
      "before": null
    }
  };

var sampleChild = {
            "kind": "t3",
            "data": {
                "domain": "i.imgur.com",
                "banned_by": null,
                "media_embed": {},
                "subreddit": "funny",
                "selftext_html": null,
                "selftext": "",
                "likes": null,
                "secure_media": null,
                "saved": false,
                "id": "1p6ks5",
                "secure_media_embed": {},
                "stickied": false,
                "author": "red_4",
                "media": null,
                "score": 2035,
                "approved_by": null,
                "over_18": false,
                "hidden": false,
                "thumbnail": "http://d.thumbs.redditmedia.com/49HOA4P7qdw-M28i.jpg",
                "subreddit_id": "t5_2qh33",
                "edited": false,
                "link_flair_css_class": null,
                "author_flair_css_class": null,
                "downs": 3486,
                "is_self": false,
                "permalink": "/r/funny/comments/1p6ks5/my_pet_lizard_susie_balancing_two_soda_cans_on/",
                "name": "t3_1p6ks5",
                "created": 1382718712.0,
                "url": "http://i.imgur.com/VbrHSv5.jpg",
                "author_flair_text": null,
                "title": "My pet lizard, Susie, balancing two soda cans on her head.",
                "created_utc": 1382689912.0,
                "link_flair_text": null,
                "distinguished": null,
                "num_comments": 176,
                "visited": false,
                "num_reports": null,
                "ups": 5521
            }
        };

test("getJsonItem test", function () {
	ok( _.isEqual(getChildrenInfo(subredditJSON), [{	"id": "1p6ks5", 
																						"url": "http://i.imgur.com/VbrHSv5.jpg", 
																						"title": "My pet lizard, Susie, balancing two soda cans on her head."},
																					{	"id": "1p6ouk",
																						"url": "http://i.imgur.com/W44bbC9.jpg",
																						"title": "You maybe Hipster, but you will never be this hipster [x-post from r/hipster]"}]), 
			"Passed!");

	ok( !_.isEqual(getChildrenInfo(subredditJSON), [{	"id": "1p6ks5", 
																						"url": "http://i.imgur.com/VbrHSv5.jpg", 
																						"title": "My pet lizard, Susie, balancing two soda cans on her head."}]), 
			"Passed!");
});


module("imgur url cleanup");
test("fixPrefix test", function() {
	ok(fixPrefix("http://i.imgur.com/Itn0JuB.gif") == "http://i.imgur.com/Itn0JuB.gif");
	ok(fixPrefix("http://imgur.com/Itn0JuB.gif") === "http://i.imgur.com/Itn0JuB.gif");
	ok(fixPrefix("http://i.imgur.com/Itn0JuB") === "http://i.imgur.com/Itn0JuB");
	ok(fixPrefix("http://imgur.com/Itn0JuB") === "http://i.imgur.com/Itn0JuB");
});

test("fixPostfix test", function() {
	ok(fixPostfix("http://i.imgur.com/s598E4Z.jpg") === "http://i.imgur.com/s598E4Z.jpg");
	ok(fixPostfix("http://imgur.com/s598E4Z.jpg") === "http://imgur.com/s598E4Z.jpg");
	ok(fixPostfix("http://i.imgur.com/s598E4Z") === "http://i.imgur.com/s598E4Z.jpg");
	ok(fixPostfix("http://imgur.com/s598E4Z") === "http://imgur.com/s598E4Z.jpg");
});

test("fixImgurURL test", function() {
	// cases to test:
	// 1) missing "i." after "//"
	// 2) present "i." after "//"
	// 3) missing file extension (jpg, gif, png)
	// 4) present file extension (jpg, gif, png)
	// 5) non-imgur link

	ok(fixImgurURL("http://i.imgur.com/qfT0wUg.png") === "http://i.imgur.com/qfT0wUg.png");
	ok(fixImgurURL("http://imgur.com/qfT0wUg.png") === "http://i.imgur.com/qfT0wUg.png");
	ok(fixImgurURL("http://i.imgur.com/qfT0wUg") === "http://i.imgur.com/qfT0wUg.jpg");
	ok(fixImgurURL("http://imgur.com/qfT0wUg") === "http://i.imgur.com/qfT0wUg.jpg");

	ok(fixImgurURL("http://i.imgur.com/s598E4Z.jpg") === "http://i.imgur.com/s598E4Z.jpg");
	ok(fixImgurURL("http://imgur.com/s598E4Z.jpg") === "http://i.imgur.com/s598E4Z.jpg");
	ok(fixImgurURL("http://i.imgur.com/s598E4Z") === "http://i.imgur.com/s598E4Z.jpg");
	ok(fixImgurURL("http://imgur.com/s598E4Z") === "http://i.imgur.com/s598E4Z.jpg");

	ok(fixImgurURL("http://i.imgur.com/Itn0JuB.gif") === "http://i.imgur.com/Itn0JuB.gif");
	ok(fixImgurURL("http://imgur.com/Itn0JuB.gif") === "http://i.imgur.com/Itn0JuB.gif");
	ok(fixImgurURL("http://i.imgur.com/Itn0JuB") === "http://i.imgur.com/Itn0JuB.jpg");
	ok(fixImgurURL("http://imgur.com/Itn0JuB") === "http://i.imgur.com/Itn0JuB.jpg");

	ok(fixImgurURL("http://31.media.tumblr.com/137f92927437c1c83cbfefe6787f8552/tumblr_mv2az1qoqy1rqd0kpo1_400.gif") === false);
});
