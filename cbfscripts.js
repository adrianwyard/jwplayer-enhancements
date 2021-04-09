	// This is just a placeholder that probably has many errors!

	function mediaWindowHtml(ctf) {
		var timeout=0;
		document.write('<center><div id="myElement">Loading the player...</div></center>');
		if(window.innerWidth<=600){ // This timeout on small screens was a hack to stop a load sequencing error. May not need this anymore.
			timeout=3000;
		}
		setTimeout(function () {
			var ctfarr = ctf.split("/");



			// Pasted from cndce-counterbalance.js. 

			(() => { 

				var player = jwplayer("myElement").setup({
				    playlist: "/" + ctfarr[1] + "/" + ctfarr[2] + "-dvj.xml", // The final version will prefix urls with "https://www.counterbalance.net/"
				   	allowfullscreen: "true",
					// repeat: "list",
					height: 264,
					width: 352,
					preload: "auto",
					modes: [{ type: 'html5' }]
				});

				var playlist;

				var playerContainer;
				var sliderContainer;

				var domPreviousRail;
				var domNextRail;


				// Initialize DOM elements
				player.on('ready', function(){
					playerContainer = document.getElementById('myElement');
					sliderContainer = playerContainer.querySelector('.jw-slider-container');

					// Add additional rail elements
					domPreviousRail = document.createElement('div');
					domPreviousRail.classList.add('cndce-prev-rail');

					domNextRail = document.createElement('div');
					domNextRail.classList.add('cndce-next-rail');

					sliderContainer.prepend(domNextRail);
					sliderContainer.prepend(domPreviousRail)
				})

				player.on('meta', function(meta){
					var currPlaylist = player.getPlaylistItem();

					
					domPreviousRail.style.width = (currPlaylist.sources[0].starttime /  meta.seekRange.end) * 100 + '%';


					
					domNextRail.style.width = (1 - (currPlaylist.end / meta.seekRange.end)) * 100 + '%';


				})

				player.on('playlist', function(_playlist){
					// Update global playlist reference when playlist changes
					playlist = _playlist.playlist;
					
				})



				player.on('time seek', function({position, offset}){
					var currPlaylist = player.getPlaylistItem();
					var iPlaylist = player.getPlaylistIndex();

					// Used when seek is triggered
					if(offset)
						position = offset;


					if(position > currPlaylist.end){
						if(iPlaylist == playlist.length - 1){
							player.seek(currPlaylist.sources[0].starttime);
							player.stop();
						}else{
							player.next();
						}
						
					}else if(position < currPlaylist.sources[0].starttime - 2){
						if(iPlaylist == 0){
							player.seek(currPlaylist.sources[0].starttime);
						}else{
							player.playlistItem(iPlaylist - 1);
						}
					}
				})

				player.on('playlistItem', function({index, item}){
					// Ensure playlist always follows starttime
					player.seek(item.sources[0].starttime);

				})

			})();






		}, timeout);
	}

	/* Also need the following near duplicate functions that are called from existing pages:

	function mediaWindowHtml2(ctf) with <div id="container2"> to allow for multiple videos on a single page.

	function mediaWindowHtml3(ctf) with <div id="container3">

	function mediaWindowHtmlmin(ctf) with <div id="containermin">

	function audioWindowHtml(ctf) with just height for seek bar.

	*/
