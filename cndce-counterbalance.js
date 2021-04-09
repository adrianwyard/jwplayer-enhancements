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
	var controlBarContainer;
	var sliderContainer;

	var domPreviousRailBlock;
	var domPreviousRail;
	var domNextRailBlock;
	var domNextRail;

	var isSeeking = false;

	// Initialize DOM elements
	player.on('ready', function(){
		playerContainer = document.getElementById('myElement');
		controlBarContainer = playerContainer.querySelector('.jw-controlbar');
		sliderContainer = controlBarContainer.querySelector('.jw-slider-container');

		// Add slider block
		domPreviousRailBlock = document.createElement('div');
		domPreviousRailBlock.classList.add('cndce-rail-block');
		domPreviousRailBlock.classList.add('cndce-rail-block-prev');

		domPreviousRailBlock.onmouseenter = function (){
			playerContainer.classList.add('prev-block-hover');
		}
		domPreviousRailBlock.onmouseleave = function(){
			playerContainer.classList.remove('prev-block-hover');
		}
		domPreviousRailBlock.onclick = function(){
			isSeeking = false;
			player.trigger('seek', {offset: 0})
		}

		domNextRailBlock = document.createElement('div');
		domNextRailBlock.classList.add('cndce-rail-block');
		domNextRailBlock.classList.add('cndce-rail-block-next');

		domNextRailBlock.onmouseenter = function (){
			playerContainer.classList.add('next-block-hover');
		}
		domNextRailBlock.onmouseleave = function(){
			playerContainer.classList.remove('next-block-hover');
		}
		domNextRailBlock.onclick = function(){
			isSeeking = false;
			player.trigger('seek', {offset: player.getDuration()});
		}

		controlBarContainer.prepend(domPreviousRailBlock);
		controlBarContainer.prepend(domNextRailBlock);

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


			// Blocks
			domPreviousRailBlock.style.width = (sliderContainer.offsetLeft + domPreviousRail.clientWidth) + 'px';

			domNextRailBlock.style.left = (sliderContainer.offsetLeft + domNextRail.offsetLeft) + 'px';

			domNextRailBlock.style.width = (controlBarContainer.offsetWidth - domNextRailBlock.offsetLeft) + 'px';

		
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


		if(isSeeking){
			player.trigger('seeked');
			return;
		}

		var currPlaylist = player.getPlaylistItem();
		var iPlaylist = player.getPlaylistIndex();

		const _pos = offset ? offset : position;

		if(_pos > currPlaylist.end){


			if(iPlaylist == playlist.length - 1){
				player.seek(currPlaylist.sources[0].starttime);
				player.stop();
			}else{
				player.next();
				player.trigger('seeked');
			}
		}else if(_pos < currPlaylist.sources[0].starttime - 2){
			
			if(iPlaylist == 0){
				player.seek(currPlaylist.sources[0].starttime);
				player.trigger('seeked');
			}else{
				player.playlistItem(iPlaylist - 1);
				player.trigger('seeked');
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

