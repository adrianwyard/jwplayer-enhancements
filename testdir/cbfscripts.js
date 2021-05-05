	function mediaWindowHtml(ctf) {
		var timeout=0;

		document.write('<center><div id="myElement">Loading the player...</div></center>');


		// This timeout on small screens was a hack to stop a load sequencing error. May not need this anymore.
		if(window.innerWidth<=600){ 
			timeout=3000;
		}



		setTimeout(function () {
			var ctfarr = ctf.split("/");

			new CBPlayer({
				ctf: CBPlayer.PLAYLIST_BASE_URL + ctfarr[1] + "/" + ctfarr[2] + CBPlayer.PLAYLIST_RSS_EXTENSION,
				el: 'myElement',
				allowscriptaccess: "always",
				// autostart: "true",
				allowfullscreen: "true",
				// repeat: "list",
				height: 264,
				width: 352,
			})


		}, timeout);
	}
	

	/* Also need the following near duplicate functions that are called from existing pages:

	function mediaWindowHtml2(ctf) with <div id="container2"> to allow for multiple videos on a single page.

	function mediaWindowHtml3(ctf) with <div id="container3">

	function mediaWindowHtmlmin(ctf) with <div id="containermin">

	function audioWindowHtml(ctf) with just height for seek bar.

	*/
