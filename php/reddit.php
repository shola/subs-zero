<?php

require 'reddit-console/vendor/autoload.php';

function fixImgurURL($url) {
	// assume only image URL's

	if (!(preg_match("/imgur.com/", $url))) {
		return false;
	} 

	// $post = fixPostfix($url);
	// if($post) {
	// 	return fixPrefix($post);
	// }
	// else {
	// 	return "doesn't exist";
	// }

	$res = fixPostfix(fixPrefix($url));
	if(@exif_imagetype($res)) {
		return $res;
	} else {
		return false;
	}
}

function fixPrefix($url) {
	// assumes imgur.com link
	if (preg_match("/http:\/\/i.imgur.com/", $url)) {
		return $url;
	} else {
		$url = explode("//", $url)[1];
		return "http://i." . $url;
	}
}

function fixPostfix($url) {
	$imgExt = ['.jpg', '.png', '.gif'];
	$urlPostfix = substr($url, -4);

	if (in_array($urlPostfix, $imgExt)) {
		return $url;
	} else {
		// imgur will open an image with any extension. use jpg as default
		
		return $url . ".jpg";
	}
}

// Instead of checking if the image URL's existed, I checked if they were valid images
// with @exif_imagetype
function doesURLExist($url) {
	// this function was modified from Roman Poca's answer to "How can one check to see if a remote file exists using PHP?"" on StackOverflow
	$ch = curl_init($url);

	curl_setopt($ch, CURLOPT_NOBODY, true);
	curl_exec($ch);

	$retcode = curl_getinfo($ch, CURLINFO_HTTP_CODE); 
	curl_close($ch);

	// $retcode >= 400 -> not found, $retcode = 200, found.
	// echo "return code: $retcode";
	if ($retcode == 200) {
		return true;
	} else {
		return false;
	}
}

// // simple proof of concept code
// $reddit = new RedditApiClient\Reddit;
// $top25links = $reddit->getLinksBySubreddit('funny'); #default limit is 25
// $result = [];

// foreach ($top25links as $link) {
// 	$title = $link->getTitle();
// 	$id = $link->getID();
// 	$url = fixImgurURL($link->getURL());

// 	// if ($url) {
// 		// echo nl2br($title . "\n");
// 		// echo nl2br($id . "\n");
// 		// echo nl2br($url . "\n\n");
// 		echo "<div id=\"$id\">
// 						<p>$title</p>
// 						<img src=\"$url\">
// 					</div>";
// 	// }
// }

class redpost {
	public $id;
	public $title;
	public $url;

	public function __construct($id, $title, $url) {
		$this->id = $id;
		$this->title = $title;
		$this->url = $url;
	}
}

$r = new redpost("1p4fu8", "Picking your nose in public...harmless right? (from /r/whatcouldgowrong)", "http://i.imgur.com/k06LEV6.gif");

function imgJson($r) {
	return json_encode(array(	"id" => $r->id,
														"title" => $r->title,
														"url" => $r->url));
}

echo imgJson($r);

// foreach ($top25links as $link) {
// 	printSummary($link);
// }
// $toplink = $top25links[0];
// printSummary($toplink);
// foreach($top25links as $l) {
// 	printSummary($l);
// }

function printSummary($link) {
	echo nl2br("Title: " . $link->getTitle() . "\n");
	echo nl2br("Score: " . $link->getScore() . "\n");
	echo nl2br("URL: " . $link->getURL() . "\n");
	echo nl2br("Author: " . $link->getAuthorName() . "\n");
	echo nl2br("Upvotes: " . $link->getUpvotes() . "\n");	
	echo nl2br("Downvotes: " . $link->getDownvotes() . "\n");	
	echo nl2br("ID: " . $link->getId() . "\n");
	echo nl2br("# Comments: " . $link->countComments() . "\n");
	echo nl2br("Self Text: " . $link->getSelfText() . "\n");
	echo nl2br("Permalink: " . $link->getPermaLink() . "\n");
	echo nl2br("Comments: " . $link->getComments() . "\n\n");
}
