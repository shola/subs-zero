<?php

require '../reddit.php';

class RedditTest extends PHPUnit_Framework_TestCase
{

	public function testImgJson(){
		$this->assertEquals(imgJson(new redpost("1p4fu8", "Picking your nose in public...harmless right? (from /r/whatcouldgowrong)", "http://i.imgur.com/k06LEV6.gif")), json_encode(array("id" => "1p4fu8", "title" => "Picking your nose in public...harmless right? (from /r/whatcouldgowrong)", "url" => "http://i.imgur.com/k06LEV6.gif")));
	}

	public function testFixImgurURL()
	{
		// cases to test:
		// 1) missing "i." after "//"
		// 2) present "i." after "//"
		// 3) missing file extension (jpg, gif, png)
		// 4) present file extension (jpg, gif, png)
		// 5) non-imgur link

		$this->assertEquals(fixImgurURL("http://i.imgur.com/qfT0wUg.png"), 
												"http://i.imgur.com/qfT0wUg.png");
		$this->assertEquals(fixImgurURL("http://imgur.com/qfT0wUg.png"), 
												"http://i.imgur.com/qfT0wUg.png");
		$this->assertEquals(fixImgurURL("http://i.imgur.com/qfT0wUg"), 
												"http://i.imgur.com/qfT0wUg.jpg");
		$this->assertEquals(fixImgurURL("http://imgur.com/qfT0wUg"), 
												"http://i.imgur.com/qfT0wUg.jpg");

		$this->assertEquals(fixImgurURL("http://i.imgur.com/s598E4Z.jpg"), 
												"http://i.imgur.com/s598E4Z.jpg");
		$this->assertEquals(fixImgurURL("http://imgur.com/s598E4Z.jpg"), 
												"http://i.imgur.com/s598E4Z.jpg");
		$this->assertEquals(fixImgurURL("http://i.imgur.com/s598E4Z"), 
												"http://i.imgur.com/s598E4Z.jpg");
		$this->assertEquals(fixImgurURL("http://imgur.com/s598E4Z"), 
												"http://i.imgur.com/s598E4Z.jpg");

		$this->assertEquals(fixImgurURL("http://i.imgur.com/Itn0JuB.gif"), 
												"http://i.imgur.com/Itn0JuB.gif");
		$this->assertEquals(fixImgurURL("http://imgur.com/Itn0JuB.gif"), 
												"http://i.imgur.com/Itn0JuB.gif");
		$this->assertEquals(fixImgurURL("http://i.imgur.com/Itn0JuB"), 
												"http://i.imgur.com/Itn0JuB.jpg");
		$this->assertEquals(fixImgurURL("http://imgur.com/Itn0JuB"), 
												"http://i.imgur.com/Itn0JuB.jpg");

		$this->assertEquals(fixImgurURL("http://31.media.tumblr.com/137f92927437c1c83cbfefe6787f8552/tumblr_mv2az1qoqy1rqd0kpo1_400.gif"), 
												false);

		$this->assertEquals(fixImgurURL("http://imgur.com/a/LhZMQ"), 
												false);
	}

	// NOT NEEDED
	// public function testDoesURLExist(){
	// 	$this->assertFalse(doesURLExist("madeUpURL"));
	// 	$this->assertTrue(doesURLExist("http://www.google.com"));

	// 	$this->assertTrue(doesURLExist("http://imgur.com/a/LhZMQ"));
	// 	$this->assertFalse(doesURLExist("http://i.imgur.com/a/LhZMQ"));
	// 	$this->assertFalse(doesURLExist("http://imgur.com/a/LhZMQ.jpg"));
	// 	$this->assertFalse(doesURLExist("http://i.imgur.com/a/LhZMQ.jpg"));

	// 	$this->assertTrue(doesURLExist("http://i.imgur.com/qfT0wUg.png"));
	// 	$this->assertTrue(doesURLExist("http://i.imgur.com/qfT0wUg.jpg")); // imgur overloads links with all image extensions?
	// }
}