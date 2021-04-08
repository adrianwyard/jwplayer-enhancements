(() => {

	var player = jwplayer("myElement").setup({
	    playlist: "./testrss.json",
	   	allowfullscreen: "true",
		// repeat: "list",
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

