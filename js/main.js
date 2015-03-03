
function toggleFullScreen() {
	if (!document.webkitFullscreenElement) {  
		document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	} else {
		document.webkitCancelFullScreen();
	}
}

function restoreDirectory(id) {
	chrome.fileSystem.restoreEntry(id,function(entry)
		{
			var error = chrome.runtime.lastError;
				if (error) {
					console.log('Wystąpił błąd: ',error.message);
					openDirectory();
					return 0;
				}
			console.log('Przywróciłem katalog:',entry);
			rootDir = entry;
		}
	);
}

function openDirectory() {
	chrome.fileSystem.chooseEntry({"type":"openDirectory"},function(entry)
		{
			var error = chrome.runtime.lastError;
				if (error) {
					console.log('Wystąpił błąd: ',error.message);
					return 0;
				}
			var entryID = chrome.fileSystem.retainEntry(entry);
			console.log('Wybrany katalog:',entry,'ID = ',entryID);
			chrome.storage.local.set({'storageID':entryID});
			rootDir = entry;
		}
	
	);
}

$(document).ready(function() {
	chrome.storage.local.get('storageID',function(row)
		{
			
			if (row.storageID) {
				restoreDirectory(row.storageID);
			} else {
				openDirectory();
			}
		}
	);



	$( "#fullscreen" ).bind( "click", function() {
  		//toggleFullScreen();
		chrome.fileSystem.restoreEntry("1AFBFEB368F5DA2EBA462632ED292F59:a",function(x){console.log("restored",x)});
	});
	$( "#dir1" ).bind( "click", function() {
  		toggleFullScreen();
	});
	$( "#dir" ).bind( "click", function() {

		var xhr = new XMLHttpRequest();
		xhr.responseType = 'blob';
		xhr.onreadystatechange = function () {
			if (this.readyState!=3)
				console.log('onreadystatechange',this.readyState);
			}
		/*xhr.onprogress = function (e) {
				console.log('onprogress',e);
			}*/
		xhr.onload = function (e) {
				console.log('onload',e);
			}
		xhr.onerror = function (e) {
				console.log('onerror',e);
			}
		xhr.open("GET", 'http://cdimage.debian.org/debian-cd/7.8.0/armel/iso-dvd/debian-7.8.0-armel-DVD-1.iso', true);
		xhr.send();
	});
	
	
	


})







