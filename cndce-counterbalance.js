(() => {

	var player = jwplayer("myElement").setup({
	    playlist: "./playlist-dvj.xml",
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

	var isSeeking = false;

	// Initialize DOM elements
	player.on('ready', function(){
		playerContainer = document.getElementById('myElement');
		sliderContainer = playerContainer.querySelector('.jw-slider-container');

		// Add additional rail elements
		domPreviousRail = document.createElement('div');
		domPreviousRail.classList.add('cndce-prev-rail');
		domPreviousRail.classList.add('cndce-rail');

		domNextRail = document.createElement('div');
		domNextRail.classList.add('cndce-next-rail');
		domNextRail.classList.add('cndce-rail');

		sliderContainer.prepend(domNextRail);
		sliderContainer.prepend(domPreviousRail)
	})

	player.on('meta', function(meta){

		if(meta.metadataType == 'media'){
			var currPlaylist = player.getPlaylistItem();

			// Rails
			domPreviousRail.style.width = (currPlaylist.sources[0].starttime /  meta.seekRange.end) * 100 + '%';


			domNextRail.style.width = (1 - (currPlaylist.end / meta.seekRange.end)) * 100 + '%';


		}
	})

	player.on('playlist', function(_playlist){
		// Update global playlist reference when playlist changes
		playlist = _playlist.playlist;
		
	})

	player.on('seek', function({offset}){
		player.trigger('time', {position: offset});
		isSeeking = true;
	})




	player.on('time', function({position, offset}){


		if(isSeeking)
			return;

		var currPlaylist = player.getPlaylistItem();
		var iPlaylist = player.getPlaylistIndex();

		const _pos = offset ? offset : position;

		if(_pos > currPlaylist.end){


			if(iPlaylist == playlist.length - 1){
				player.seek(currPlaylist.sources[0].starttime);
				player.stop();
			}else{
				player.next();
			}
		}else if(_pos < currPlaylist.sources[0].starttime - 2){
			
			if(iPlaylist == 0){
				player.seek(currPlaylist.sources[0].starttime);
			}else{
				player.playlistItem(iPlaylist - 1);
			}
		}
	})

	player.on('seeked', function(){


		const currPos = player.getPosition();
		const startTime = player.getPlaylistItem().sources[0].starttime;
		const endTime = player.getPlaylistItem().end;

		if(currPos < startTime - 1 || currPos > endTime + 1){
			player.seek(player.getPlaylistItem().sources[0].starttime);
		}else{
			isSeeking = false;
		}
	})


})();

