function mediaWindowHtml(ctf) {

	document.write('<center><div id="myElement"></div></center>');

	var ctfarr = ctf.split("/");

	new CBPlayer({
		ctf: CBPlayer.PLAYLIST_BASE_URL + ctfarr[1] + "/" + ctfarr[2] + CBPlayer.PLAYLIST_RSS_EXTENSION,
		el: 'myElement',
		autostart: 'false',
		repeat: false,
		height: 330,
		width: 440
	})

}

function mediaWindowHtml2(ctf) {

	document.write('<center><div id="myElement2"></div></center>');

	var ctfarr = ctf.split("/");

	new CBPlayer({
		ctf: CBPlayer.PLAYLIST_BASE_URL + ctfarr[1] + "/" + ctfarr[2] + CBPlayer.PLAYLIST_RSS_EXTENSION,
		el: 'myElement2',
		autostart: 'false',
		repeat: false,
		height: 330,
		width: 440
	})

}

function mediaWindowHtml3(ctf) {

	document.write('<center><div id="myElement3"></div></center>');

	var ctfarr = ctf.split("/");

	new CBPlayer({
		ctf: CBPlayer.PLAYLIST_BASE_URL + ctfarr[1] + "/" + ctfarr[2] + CBPlayer.PLAYLIST_RSS_EXTENSION,
		el: 'myElement3',
		autostart: 'false',
		repeat: false,
		height: 324,
		width: 720
	})

}

function mediaWindowHtmlShelf(ctf) {

	document.write('<center><div id="myElement1"></div></center>');

	var ctfarr = ctf.split("/");

	new CBPlayer({
		ctf: CBPlayer.PLAYLIST_BASE_URL + ctfarr[1] + "/" + ctfarr[2] + CBPlayer.PLAYLIST_RSS_EXTENSION,
		el: 'myElement1',
		autostart: 'false',
		related: {
			displayMode: "shelfWidget"
		},
		repeat: false,
		height: 405,
		width: 720
	})

}

function mediaWindowHtmlmin(ctf) {

	document.write('<center><div id="myElementmin"></div></center>');

	var ctfarr = ctf.split("/");

	new CBPlayer({
		ctf: CBPlayer.PLAYLIST_BASE_URL + ctfarr[1] + "/" + ctfarr[2] + CBPlayer.PLAYLIST_RSS_EXTENSION,
		el: 'myElementmin',
		autostart: 'false',
		repeat: false,
		height: 330,
		width: 440
	})

}

function audioWindowHtml(ctf) {

	document.write('<center><div id="myElement"></div></center>');

	var ctfarr = ctf.split("/");

	new CBPlayer({
		ctf: CBPlayer.PLAYLIST_BASE_URL + ctfarr[1] + "/" + ctfarr[2] + ".xml",
		el: 'myElement',
		autostart: 'false',
		repeat: false,
		height: 100,
		width: 440
	})

}

