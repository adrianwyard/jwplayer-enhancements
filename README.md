# HLS Streaming from counterbalance [![View Demo](https://img.shields.io/static/v1?label=View%20Demo&message=Github%20Pages&color=181717&style=for-the-badge&logo=github)](https://adrianwyard.github.io/jwplayer-enhancements/)

[![Original Document](https://img.shields.io/static/v1?label=Docs&message=Google%20Docs&color=4285F4&style=for-the-badge&logo=google-drive)](https://docs.google.com/document/d/1YO6puHSoAF2n6FtaE-Ag4ZSsveWnDMWE8YDE7dgYlmE/edit?usp=sharing) [![JW Player](https://img.shields.io/static/v1?label=Uses&message=JWPlayer&color=ff0046&style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA0CAYAAADIZmusAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGuGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMDhUMTc6MTM6MzIrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTA4VDE3OjE4OjAxKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTA4VDE3OjE4OjAxKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY1ZWRiYmY4LWM0MGItNDJlMy1iY2Y2LTVkNGUzMDdjZWRmYiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpmMTQ5NmRhOC0wZWM1LTRiNDQtOTRiNy00MmI2Y2NiYWFhN2YiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmMTQ5NmRhOC0wZWM1LTRiNDQtOTRiNy00MmI2Y2NiYWFhN2YiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmYxNDk2ZGE4LTBlYzUtNGI0NC05NGI3LTQyYjZjY2JhYWE3ZiIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0wOFQxNzoxMzozMiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjY3YjY2MjIyLWY0NzgtNDM5Mi1iYTY0LWJkOTM1ODk3OGJmMSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0wOFQxNzoxNToxMiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjY1ZWRiYmY4LWM0MGItNDJlMy1iY2Y2LTVkNGUzMDdjZWRmYiIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0wOFQxNzoxODowMSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YpQiGwAAA9JJREFUaN7VmltIFkEUxz+zsovZRaKitAJLjIqiC1ER9eJDUUEglA9hL2VCktBDEJFBQT0EohhqVlhZQhBSIXSTLtJVgoQwC83is8hKzSS7WDYDszAMc2bO2d1v/b6Hvw+z53/O/HZ3ZmfmMzQYygzFsM4zhZkKYxkik2nQUSyDNEog32MVYrb8NJheDEUH+CuxmWkZU5zLPCUKSFFQAJOZapTiXK1MG4i5RmryLAkCYipTl6a4rBxCvmzF+5m3BwHyygLhKBmZr03x3Q0CZDcSgqsCkW+hxlcQaZBhTP0EkFZEzsuK5x/TFDcgqUzzmIYjYtcSILg+WfJO0HjanOsUiGJxB3iCdqZ1lvg6IggftKMM+Qo0notUkLNA8VQgfiIRwnkiCYY+dGs86ykgSw3F6wDPNp9B1mji+5jiKSCPDMX7gK/zc59B7mniG+UYG8QMRAcWKZ5pLiBMINOB+CMUkDxEB3Yonl0+gxwH4udQQFoQHTikeN74CMKn4wFN7Ae1ryaIFGQHTkqemS4hIJAtQOw1CkgOsgPVkmevzyDNQGw2BeSJYv4hHqnp7rz3ESQDiPvFNFoHwtcq25nSlf2D7s4f0LTXE2Y4CkgVENeku/HygO6RvgmbNAlWMuVq2h8alhBUEGeJkmiIK4JA5KAscaFWae8X7Uc1iW8D+wRVb5n+Ip9IriFuMQTyTQq6JC78Vsw3RHsZ8MolWyAeM22UFp0QiNOxTiCmExrT6rEKf01WaRJkCkOl5hpvy7eA8DG4wBLzRdRIM8TcNIEUS4E9YjDJ5m7JUA58nHotnQyJJ2KK6RBx1YaYnSaQLEuBc5LhgotBfAv5jbkvDiqg63+YxptAbI88w7DVxMgZnIWWuKdMpwzXm03LKf4nyTCbtCuGGiLEa8l7wuP0XG4D4XoAmAsVw3Vi8a2St9QjyAoMyB7ArO6h7xAKdyne0x4gvto2gPLpiGouQ6y/TDqoeKs9gNRjQbj2M/20zNfPkIUHNFvgKx5A8iggzjntXIMBC1Lhw/GQIz4RTaKC2FSPLJ6k8Ta4BGnB9I0Kgpl+zyD3N1gVRwIkH1F4DOBtcgmSHgkQ2558n8H70gVEB7Zvbk7ZK4GiVw2eOLEfoYJURRLE+Sb0AgtLSO9cgCyPNIhzUM33LrMQsfHih33q6XwoCBCKEoHTdOwxU9SAjEX8IIramw81yDjELlJWmFojKJAE4qtVEq0g6iGHTSnRDHIMCdHgJn+QIKuRIBnRDjKC6aMFotRt/qD/O2i+ONbRQdR6yT0U/2uVJn6KCIsDQb7fOOw173/RAS4CTst4AQAAAABJRU5ErkJggg==)](https://developer.jwplayer.com/jwplayer/docs/jw8-javascript-api-reference) 

### Goal <img src="https://media.giphy.com/media/M8p2cBCPueRxIaiQdb/giphy.gif" width="100" align="right">

Upgrade counterbalance.org video so it uses `HLS` streaming on varying connection speeds. Ideally few site changes will be needed to support this upgrade.

> [Here’s an example page with video](https://counterbalance.org/cqinterv/index-frame.html)

### Background
The [counterbalance](https://counterbalance.org) web site currently plays video using an old version of the JW Player JavaScript web client driven by numerous `RSS` playlists that typically specify start and duration times for each clip. The site currently uses progressive download playback from _Amazon S3/CloudFront_. 

Historically the site used _RealServer_, which was upgraded to _Flash_/`H.264` video streaming over `RTMP`, which is now deprecated leaving only _download_/`HTML5`.

>  [Here’s a stripped down web page with the version 5 player working correctly](https://www.counterbalance.org/test/testjw5.html)

The current JW Player version 8 supports HLS but no longer reads the numerous start and duration parameters that work in version 5.

> [Here’s a stripped down web page with the new player](https://www.counterbalance.org/test/testjw8.html) _(video is black until 2:07)_


## Implementation
RSS support with start and duration times will need to be added using the [_JW Player 8 API_](https://developer.jwplayer.com/jwplayer/docs/jw8-javascript-api-reference).
 
I plan to switch video hosting to jwplayer.com from _AWS_ as the conversion to `HLS` is easier.

I suggest we use `testrss-jw.xml` for a test playlist as this has urls that point to HLS sources at cdn.jwplayer.com. 

> [Here’s a test page that uses this playlist](https://www.counterbalance.org/test/testjw8-hosted.html)

---
**My licensed JW Player 8 can be loaded with this url:**
`https://cdn.jwplayer.com/libraries/NMuIi6sP.js`



## Deployment

> _**Notes from Adrian:** We can ignore this for now, but once we have this working there will be an additional step for deployment which shouldn’t present any problems (I hope to do this myself)._

[Counterbalance](http://www.counterbalance.org) is a site that is largely constructed programmatically assembling page content read from [www.counterbalance.net](http://www.counterbalance.net).

  

The video player is added to each page when needed using a JavaScript function called `mediaWindowHtml()`. This function is called with a `<ctf>` _(Current Topic Filename)_ parameter  that is used to tell the player which playlist to load; _i.e. a file called `<ctf>-dvh.xml`._

  

Once we have a player working we should confirm it works using the `mediaWindowHtml()` function.


> _**Notes from Adrian:** Here's an initial deployment test (not yet working) https://adrianwyard.github.io/jwplayer-enhancements/testdir/deploytest.html
> I’ve already created a simple version of the new mediaWindowHtml function that is loaded from [https://counterbalance.net/scripts/cbfscripts2.js](https://counterbalance.net/scripts/cbfscripts2.js), and a test page that uses it: [https://www.counterbalance.org/test/playertest1.html](https://www.counterbalance.org/test/playertest1.html)._

---
HLS Streaming from counterbalance.org (updated 6Apr21)
https://docs.google.com/document/d/1YO6puHSoAF2n6FtaE-Ag4ZSsveWnDMWE8YDE7dgYlmE/edit?usp=sharing
Test version: https://counterbalance.org/hlspoc/index.html

Synchronize Media Playback for Multiple Viewers (updated 6Apr21)
https://docs.google.com/document/d/1Ben-TDqjZigTlpjIygDd0neTZeFB6g36SCovqR9dTnI/edit?usp=sharing

