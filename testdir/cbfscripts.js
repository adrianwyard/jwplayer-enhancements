function mediaWindowHtml(ctf) {

	document.write('<center><div id="myElement">Loading the player...</div></center>');

	var ctfarr = ctf.split("/");

	new CBPlayer({
		ctf: 'https://counterbalance.net/converter/index.php?playlist=' + ctfarr[1] + "/" + ctfarr[2] + CBPlayer.PLAYLIST_RSS_EXTENSION,
		el: 'myElement',
		autostart: 'false',
		repeat: false,
		height: 330,
		width: 440
	})

}

function mediaWindowHtml2(ctf) {

	document.write('<center><div id="myElement2">Loading the player...</div></center>');

	var ctfarr = ctf.split("/");

	new CBPlayer({
		ctf: 'https://counterbalance.net/converter/index.php?playlist=' + ctfarr[1] + "/" + ctfarr[2] + CBPlayer.PLAYLIST_RSS_EXTENSION,
		el: 'myElement2',
		autostart: 'false',
		repeat: false,
		height: 330,
		width: 440
	})

}

function mediaWindowHtml3(ctf) {

	document.write('<center><div id="myElement3">Loading the player...</div></center>');

	var ctfarr = ctf.split("/");

	new CBPlayer({
		ctf: 'https://counterbalance.net/converter/index.php?playlist=' + ctfarr[1] + "/" + ctfarr[2] + CBPlayer.PLAYLIST_RSS_EXTENSION,
		el: 'myElement3',
		autostart: 'false',
		repeat: false,
		height: 340,
		width: 720
	})

}

function mediaWindowHtmlmin(ctf) {

	document.write('<center><div id="myElementmin">Loading the player...</div></center>');

	var ctfarr = ctf.split("/");

	new CBPlayer({
		ctf: 'https://counterbalance.net/converter/index.php?playlist=' + ctfarr[1] + "/" + ctfarr[2] + CBPlayer.PLAYLIST_RSS_EXTENSION,
		el: 'myElementmin',
		autostart: 'false',
		repeat: false,
		height: 330,
		width: 440
	})

}

function audioWindowHtml(ctf) {

	document.write('<center><div id="myElement">Loading the player...</div></center>');

	var ctfarr = ctf.split("/");

	new CBPlayer({
		ctf: 'https://counterbalance.net/converter/index.php?playlist=' + ctfarr[1] + "/" + ctfarr[2] + ".xml",
		el: 'myElement',
		autostart: 'false',
		repeat: false,
		height: 100,
		width: 440
	})

}

