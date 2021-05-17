class CBPlayer{
	static PLAYLIST_BASE_URL = 'https://counterbalance.net/converter/index.php?playlist=';
	static PLAYLIST_RSS_EXTENSION = '-dvh.xml';

	player;
	playlist;

	domPlayer;
	domControlBar;
	domSliderContainer;

	domPreviousRailBlock;
	domPreviousRail;
	domNextRailBlock;
	domNextRail;

	isSeeking = false;
	repeat;
	testMode;

	
	constructor({
		ctf,
		el,
		testMode = false,
		...jwParams
	}){
		const {
			repeat = false
		} = jwParams

		this.testMode = testMode;
		this.repeat = repeat;

		this.__initDOMPlayer(el);
		this.__initPlayer(ctf, jwParams);
	}

	__initDOMPlayer(el){
		
		if(el){
			this.domPlayer = typeof el == "string" ? document.getElementById(el) : el;

		}else{
			this.domPlayer = document.createElement('div');
			this.domPlayer.id = "cb-player";

			document.body.append(this.domPlayer);
		}
	}

	__initPlayer(ctf, params = {}){
		this.player = jwplayer(this.domPlayer).setup({
			playlist: ctf,
			...params
		});

		// Player events
		this.player.on('ready', this.__onPlayerReady.bind(this));
		this.player.on('meta', this.__onPlayerMeta.bind(this))
		this.player.on('playlist', this.__onPlayerPlaylist.bind
		(this));
		this.player.on('seek', this.__onPlayerSeek.bind(this));
		this.player.on('time', this.__onPlayerTime.bind(this));
		this.player.on('seeked', this.__onPlayerSeeked.bind(this));
	}

	/**
	 * Adds an invisible DOM to block mouse/tap events on 
	 * positions outside the current playlist item `starttime` 
	 * and `end`
	 */
	__initSliderBlocks(){
		this.domPreviousRailBlock = document.createElement('div');
		this.domPreviousRailBlock.classList.add('cndce-rail-block');
		this.domPreviousRailBlock.classList.add('cndce-rail-block-prev');

		this.domPreviousRailBlock.onmouseenter = ()=>{
			this.domPlayer.classList.add('prev-block-hover');
		}
		this.domPreviousRailBlock.onmouseleave = ()=>{
			this.domPlayer.classList.remove('prev-block-hover');
		}
		this.domPreviousRailBlock.onclick = ()=>{
			this.isSeeking = false;
			this.player.trigger('seek', {offset: 0})
		}

		this.domNextRailBlock = document.createElement('div');
		this.domNextRailBlock.classList.add('cndce-rail-block');
		this.domNextRailBlock.classList.add('cndce-rail-block-next');

		this.domNextRailBlock.onmouseenter = ()=>{
			this.domPlayer.classList.add('next-block-hover');
		}
		this.domNextRailBlock.onmouseleave = ()=>{
			this.domPlayer.classList.remove('next-block-hover');
		}
		this.domNextRailBlock.onclick = ()=>{
			this.isSeeking = false;
			this.player.trigger('seek', {offset: this.player.getDuration()});
		}

		this.domControlBar.prepend(this.domPreviousRailBlock);
		this.domControlBar.prepend(this.domNextRailBlock);
	}

	/**
	 * Adds additional black rails to the slider for positions
	 * outside the current playlist item `starttime` and `end`
	 */
	__initAddtlRails(){
		this.domPreviousRail = document.createElement('div');
		this.domPreviousRail.classList.add('cndce-prev-rail');
		this.domPreviousRail.classList.add('cndce-rail');

		this.domNextRail = document.createElement('div');
		this.domNextRail.classList.add('cndce-next-rail');
		this.domNextRail.classList.add('cndce-rail');

		this.domSliderContainer.prepend(this.domNextRail);
		this.domSliderContainer.prepend(this.domPreviousRail)
	}

	/**
	 * Initialize custom DOM elements
	 */
	__onPlayerReady(){
		// Reset reference to `this.domPlayer`
		this.domPlayer = document.getElementById(this.domPlayer.id);

		this.domControlBar = this.domPlayer.querySelector('.jw-controlbar');
		this.domSliderContainer = this.domControlBar.querySelector('.jw-slider-container');

		// Add slider block
		this.__initSliderBlocks();
		

		// Add additional rail elements
		this.__initAddtlRails();

	}

	/**
	 * Called when new metadata is loaded in player (ie. on
	 * playlist item update)
	 * 
	 * Updates slider custom elements' positions
	 * 
	 * @param meta 
	 */
	__onPlayerMeta(meta){

		if(meta.metadataType == 'media'){
			var currPlaylist = this.player.getPlaylistItem();

			// Rails
			if(currPlaylist.sources[0].starttime){
				this.domPreviousRail.style.width = (currPlaylist.sources[0].starttime /  meta.seekRange.end) * 100 + '%';
			}else{
				this.domPreviousRail.style.width = 0;
			}

			if(currPlaylist.end){
				this.domNextRail.style.width = (1 - (currPlaylist.end / meta.seekRange.end)) * 100 + '%';
			}else{
				this.domNextRail.style.width = 0;
			}


			// Blocks
			this.domPreviousRailBlock.style.width = (this.domSliderContainer.offsetLeft + this.domPreviousRail.clientWidth) + 'px';

			this.domNextRailBlock.style.left = (this.domSliderContainer.offsetLeft + this.domNextRail.offsetLeft) + 'px';

			this.domNextRailBlock.style.width = (this.domControlBar.offsetWidth - this.domNextRailBlock.offsetLeft) + 'px';

		
		}
	}

	/**
	 * Called everytime a new playlist is loaded in the player
	 * 
	 * Updates class playlist reference
	 * 
	 * @param playlist The new playlist to be loaded
	 */
	__onPlayerPlaylist(playlist){
		this.testMode && console.log('playlist', playlist, this);
		
		this.playlist = playlist.playlist;
	}

	/**
	 * Triggers `time`
	 * Added this to prevent jumps in case the seek triggers
	 * playlist next/previous
	 * 
	 * Added `this.isSeeking` handler to prevent duplicate 
	 * calling of `time`.
	 */
	__onPlayerSeek({offset}){
		this.testMode && console.log('seek', offset);

		this.player.trigger('time', {position: offset});
		this.isSeeking = true;
	}


	/**
	 * Called when player is playing and playback position gets 
	 * updated. May occur as frequently as 10 times per second.
	 * 
	 * Contains the main logic for detecting when current time
	 * goes outside current playlist `starttime` and `end`
	 * 
	 * @param {Object} param
	 * @param param.position
	 * @param param.offset
	 */
	__onPlayerTime({position, offset}){

		// Prevent duplicate call to this function
		// when manually triggered by `seek`
		if(this.isSeeking){
			this.testMode && console.log('time isSeeking', position, offset);

			this.player.trigger('seeked');
			return;
		}

		var currPlaylist = this.player.getPlaylistItem();
		var iPlaylist = this.player.getPlaylistIndex();

		const _pos = offset ? offset : position;

		const {
			starttime = 0
		} = currPlaylist.sources[0];

		if(_pos > currPlaylist.end){

			this.testMode && console.log('time next', _pos, currPlaylist, iPlaylist, this.playlist);

			if(!this.repeat && iPlaylist == this.playlist.length - 1){
				this.player.seek(starttime);
				this.player.stop();
			}else{
				this.player.next();
				this.player.trigger('seeked');
			}
		}else if(_pos < starttime - 2){
			if(this.testMode)
				console.log('time prev', _pos, currPlaylist);

			
			if(iPlaylist == 0){
				this.player.seek(starttime);
				this.player.trigger('seeked');
			}else{
				this.player.playlistItem(iPlaylist - 1);
				this.player.trigger('seeked');
			}
		}else{
			if(this.testMode)
				console.log('time', _pos, currPlaylist);
		}
	}

	__onPlayerSeeked(){
		const currPos = this.player.getPosition();
		const {startTime = 0} = this.player.getPlaylistItem().sources[0];
		const endTime = this.player.getPlaylistItem().end;


		if(currPos < startTime - 1 || currPos > endTime + 1){
			this.testMode && console.log('seeked out', currPos, startTime, endTime);

			this.player.seek(startTime);
		}else{
			this.testMode && console.log('seeked false', currPos, startTime, endTime);

			this.isSeeking = false;
		}
	}
}
