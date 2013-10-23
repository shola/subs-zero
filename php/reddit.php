<?php

// SAMPLE CODE
// require 'reddit-console/vendor/autoload.php';

// $reddit = new RedditApiClient\Reddit;
// // $links  = $reddit->getLinksBySubreddit('botcirclejerk');
// $links  = $reddit->getLinksBySubreddit('funny');

// foreach ($links as $link) {
//     echo $link->getTitle(), "\n";
// }


// SAMPLE CODE
//  require 'reddit-console/vendor/autoload.php';

// $reddit   = new RedditApiClient\Reddit;
// $proggit  = $reddit->getLinksBySubreddit('programming');
// $topLink  = $proggit[0];
// $comments = $topLink->getComments();

// echo $topLink->getTitle(), "\n\n";

// foreach ($comments as $comment) {
//     showComment($comment);
// }

// function showComment($comment, $level = 1)
// {
//     $prefix = str_pad('', $level * 4, ' ');

//     $body = $comment->getBody();
//     $body = wordwrap($body, 80 - strlen($prefix), "\n", true);
//     $body = str_replace("\n", "\n{$prefix}", $body);

//     echo $prefix, $body, "\n\n";

//     $replies = $comment->getReplies();

//     foreach ($replies as $reply) {
//         showComment($reply, $level + 1);
//     }
// }

require 'reddit-console/vendor/autoload.php';

$reddit = new RedditApiClient\Reddit;
$limit = 10;
$top10links = $reddit->getLinksBySubreddit('funny', $limit); #default limit is 25

// $toplink = $top10links[0];
// printSummary($toplink);

foreach($top10links as $l) {
	printSummary($l);
}

function printSummary($link) {
	echo nl2br("Title: " . $link->getTitle() . "\n");
	echo nl2br("Score: " . $link->getScore() . "\n");
	echo nl2br("URL: " . $link->getURL() . "\n");
	echo nl2br("Author: " . $link->getAuthorName() . "\n\n");
	// echo nl2br("Upvotes: " . $link->getUpvotes() . "\n");	
	// echo nl2br("Downvotes: " . $link->getDownvotes() . "\n");	
	// echo nl2br("ID: " . $link->getId() . "\n");
	// echo nl2br("# Comments: " . $link->countComments() . "\n");
	// echo nl2br("Self Text: " . $link->getSelfText() . "\n");
	// echo nl2br("Permalink: " . $link->getPermaLink() . "\n");
	// echo nl2br("Comments: " . $link->getComments() . "\n\n");
}
