<?php

require 'reddit-console/vendor/autoload.php';

$reddit = new RedditApiClient\Reddit;
$top25links = $reddit->getLinksBySubreddit('funny'); #default limit is 25

function fixImgurURL($url) {
	return $url;
}

// foreach ($top25links as $link) {
// 	$title = $link->getTitle();
// 	$id = $link->getID();
// 	$url = $link->getURL();

// 	// prepend with a "i." if needed
// 	$url = explode("//", $url)[1];
// 	if ($url[1] != ".") {
// 		$url = "i." . $url . ".jpg";
// 	}
// 	$url = "http://" . $url;

// 	// echo nl2br($title . "\n");
// 	// echo nl2br($id . "\n");
// 	// echo nl2br($url . "\n\n");

// 	//if the image link does not lead directly to image, prepend with an 'i'
// 	// echo "<div id=\"$id\">
// 	// 				<p>$title</p>
// 	// 				<img src=\"$url\">
// 	// 			</div>";
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
	echo nl2br("Author: " . $link->getAuthorName() . "\n\n");
	echo nl2br("Upvotes: " . $link->getUpvotes() . "\n");	
	echo nl2br("Downvotes: " . $link->getDownvotes() . "\n");	
	echo nl2br("ID: " . $link->getId() . "\n");
	echo nl2br("# Comments: " . $link->countComments() . "\n");
	echo nl2br("Self Text: " . $link->getSelfText() . "\n");
	echo nl2br("Permalink: " . $link->getPermaLink() . "\n");
	echo nl2br("Comments: " . $link->getComments() . "\n\n");
}
