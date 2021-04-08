function mediaWindowHtml(ctf) {
	var timeout=0;
	document.write('<center><div id="container">Loading the player...</div></center>');
	if(window.innerWidth<=600){
		timeout=3000;
	}
	setTimeout(function () {
		var ctfarr = ctf.split("/");
		jwplayer("container").setup({
			allowscriptaccess: "always",
			allowfullscreen: "true",
			repeat: "list",
			height: 216,
			width: 288,
			preload: "auto",
			modes: [
				{
					type: "html5",
					config: {
						file: "https://www.counterbalance.net/" + ctfarr[1] + "/" + ctfarr[2] + "-dvh.xml"
					}
				},
				{
					type: "flash",
					src: "https://www.counterbalance.net/scripts/player5.swf",
					config: {
						file: "https://www.counterbalance.net/" + ctfarr[1] + "/" + ctfarr[2] + "-dvr.xml"
					}
				}
			]
		});
	}, timeout)
}

function mediaWindowHtml2(ctf) {
	var timeout=0;
	document.write('<center><div id="container">Loading the player...</div></center>');
	if(window.innerWidth<=600){
		timeout=3000;
	}
	document.write('<center><div id="container2">Loading the player...</div></center>');
	var ctfarr = ctf.split("/");
	jwplayer("container2").setup({
		allowfullscreen: "true",
		repeat: "list",
		height: 216,
		width: 288,
		preload: "auto",
		modes: [
			{
				type: "html5",
				config: {
					file: "https://www.counterbalance.net/" + ctfarr[1] + "/" + ctfarr[2] + "-dvh.xml"
				}
			},
			{
				type: "flash",
				allowscriptaccess: "always",
				src: "https://www.counterbalance.net/scripts/player5.swf",
				config: {
					file: "https://www.counterbalance.net/" + ctfarr[1] + "/" + ctfarr[2] + "-dvr.xml"
				}
			}
		]
	});
}

function mediaWindowHtml3(ctf) {
	var timeout=0;
	document.write('<center><div id="container">Loading the player...</div></center>');
	if(window.innerWidth<=600){
		timeout=3000;
	}
	document.write('<center><div id="container2">Loading the player...</div></center>');
	var ctfarr = ctf.split("/");
	jwplayer("container2").setup({
		allowfullscreen: "true",
		repeat: "list",
		height: 340,
		width: 720,
		preload: "auto",
		modes: [
			{
				type: "html5",
				config: {
					file: "https://www.counterbalance.net/" + ctfarr[1] + "/" + ctfarr[2] + "-dvh.xml"
				}
			}
		]
	});
}


function mediaWindowHtmlmin(ctf) {
	var timeout=0;
	document.write('<center><div id="container">Loading the player...</div></center>');
	if(window.innerWidth<=600){
		timeout=3000;
	}
	document.write('<center><div id="container">Loading the player...</div></center>');
	var ctfarr = ctf.split("/");
	jwplayer("container").setup({
		allowscriptaccess: "always",
		allowfullscreen: "true",
		repeat: "list",
		height: 216,
		width: 288,
		preload: "auto",
		modes: [
			{
				type: "html5",
				config: {
					file: "https://www.counterbalance.net/" + ctfarr[1] + "/" + ctfarr[2] + "-dvh.xml"
				}
			},
			{
				type: "flash",
				src: "https://www.counterbalance.net/scripts/player5.swf",
				config: {
					file: "https://www.counterbalance.net/" + ctfarr[1] + "/" + ctfarr[2] + "-dvr.xml"
				}
			}
		]
	});
}

function audioWindowHtml(ctf) {
	var timeout=0;
	document.write('<center><div id="container">Loading the player...</div></center>');
	if(window.innerWidth<=600){
		timeout=3000;
	}
	document.write('<center><div id="container">Loading the player...</div></center>');
	var ctfarr = ctf.split("/");
	jwplayer("container").setup({
		allowscriptaccess: "always",
		allowfullscreen: "false",
		repeat: "list",
		height: 60,
		width: 288,
		preload: "auto",
		modes: [
			{
				type: "html5",
				config: {
					file: "https://www.counterbalance.net/" + ctfarr[1] + "/" + ctfarr[2] + ".xml"
				}
			},
			{
				type: "flash",
				src: "https://www.counterbalance.net/scripts/player5.swf",
				config: {
					file: "https://www.counterbalance.net/" + ctfarr[1] + "/" + ctfarr[2] + ".xml"
				}
			}

		]
	});
}  
