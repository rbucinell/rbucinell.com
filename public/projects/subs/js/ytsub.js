var vlist = document.getElementById('vlist');
var showImg = true;
var videoCount = 0, videoTotal = 0;


//use this to filter the li based on channel
//$(".list-group-item .media-body .label-info:contains('Node')").closest("li").dosomething()

var ISO8601toString = function( duration )
{
	//PT1H8M49S
	// drop the PT since we know its only going to be h/m/s
	duration = duration.substring( 2 );
	var hrs = duration.substring( duration.indexOf('T')+1, duration.indexOf('H'));
	var mns = duration.substring( duration.indexOf('H')+1, duration.indexOf('M'));
	var scs = duration.substring( duration.indexOf('M')+1, duration.indexOf('S'));
	
	if( hrs === "" || hrs === "0" || hrs === "00")
	{
		return mns+":"+scs
	}
	else
	{
		if( mns.length < 2)
		{
			mns = "0" + mns;
		}
		
		if( scs.length < 2 )
		{
			scs = "0" + scs;
		}
		
		return hrs+":"+mns+":"+scs
	}
}

var toggleImages = function()
{
	if( showImg )
	{
		$("img").css("display", "none");
		showImg = false;
	}
	else
	{
		$("img").css("display", "block");
		showImg = true;
		scrollToBottom();
	}
}		

var scrollToTop = function()
{
	$('html, body').animate({scrollTop:$(document)}, 'slow');
}

var scrollToBottom = function()
{
	$('html, body').animate({scrollTop:$(document).height()}, 'slow');
}

var playrandomvideo = function()
{
	var liObjs = document.getElementsByTagName("li");
	var count = liObjs.length;
	
	var li = liObjs[Math.trunc((Math.random() * count))];
	var $li = $("#"+li.id);	
	
	$('html, body').animate({
		scrollTop: $li.offset().top
	}, 1000);	
	$li.find("a")[0].click(function(event)
	{
		event.preventDefault();
		event.stopPropagation();
		window.open(this.href, '_blank');
	});
	
}
				
var closemodalClick = function( processData )
{
	var txtArea = document.getElementById("addvideoinput");
	if( processData )
	{
		var val = txtArea.value.replace(/\n/g,",");
		var valList = val.split(",");
		populateMediaList(valList);
		txtArea.value = "";
	}
	else
	{
		txtArea.value = "";
	}				
}

var populateMediaList = function( idArray )
{
	for( var i = 0; i < idArray.length; i++ )
	{
		var id = idArray[i];
		if( id !== "" &&  ! $("#vlist #" + id ).length )
		{
			getPublishDate( id );
		}
		
	}
}

var createVideoElement = function( jsonitem, videoID )
{
	if( jsonitem === undefined )
		return;
	var data = jsonitem.snippet;
	var duration = ISO8601toString(jsonitem.contentDetails.duration);
	var publishDate = data.publishedAt;
	var channel = data.channelTitle;
	var title = data.title;
	var desc = data.description;
	var imgSrc = "";
	if( !data.thumbnails.hasOwnProperty("standard"))
		imgSrc = data.thumbnails.default.url;
	else
		imgSrc = data.thumbnails.standard.url;
	
	var li = createElement('li', 'media list-group-item');					
	li.id = videoID;
	li.appendChild( createCloseBadge() );
	
	
		var medialeft = createElement( 'div', 'media-left');
			var anchor = document.createElement('a');
			anchor.setAttribute('href', 'https://www.youtube.com/embed/' + videoID + '?vq=hd720&autoplay=1&iv_load_policy=3');
			anchor.setAttribute('target', '_blank');
				var img = createElement('img', 'media-object');
				img.src = imgSrc;
				anchor.appendChild(img);
			medialeft.appendChild(anchor);
			
			var dur = createElement('h5','duration');
			dur.innerText = duration;
			medialeft.appendChild(dur);
			
		li.appendChild(medialeft);
	
		var mediabody = createElement( 'div', 'media-body');
			var h4title = createElement('h4', 'media-heading');
			h4title.innerText = title;
			mediabody.appendChild(h4title);
			
			var descParagraph = document.createElement('p');
			descParagraph.innerText = desc;
			mediabody.appendChild( descParagraph );
			
			var dateTag = createElement( 'span', 'label label-default');
			dateTag.setAttribute("dateTime", publishDate);
			dateTag.innerText = new Date(publishDate).toDateString();
			mediabody.appendChild( dateTag );
		
			var channelTag = createElement( 'span', 'label label-info');
			channelTag.innerText = channel;
			mediabody.appendChild( channelTag );
			
		li.appendChild(mediabody);
	vlist.appendChild( li );
}

var createElement = function( element, className )
{
	var e = document.createElement( element );
	e.setAttribute( 'class', className );
	return e;
}

var createCloseBadge = function()
{
	var closeBadge = createElement( 'span', 'badge badge-error');
	var removeIcon = createElement( 'span', 'glyphicon glyphicon-remove');
	closeBadge.appendChild( removeIcon );
	$(closeBadge).on('mouseup', function(){
		$(this).closest('li').remove();
	});	
	return closeBadge;
}

var getPublishDate = function( videoID )
{
	var APIKey  = "AIzaSyCU6hEwe3LQ5pF3RbkJI-s1pkayzljjajc";
	var baseURL = "https://www.googleapis.com/youtube/v3/videos";
	
	var snippet;
	$.ajax( {
		url: baseURL,
		dataType: 'json',
		async: true,
		data: 
			{
				key: APIKey,
				part: "snippet,contentDetails",
				id: videoID
			},
		success: function(data)
		{
			createVideoElement( data.items[0], videoID );
		}
	});
}

var readFile = function( file )
{
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200) {
			var response = xhr.responseText;
			var arr = response.split(/\n/g);
			populateMediaList( arr );
		}
		
	}
	xhr.open('get', file);
	xhr.send();
}

//New implmentation

var promisedVideos = [];
var promisedVideoRequest = function( videoID )
{
	var APIKey  = "AIzaSyCU6hEwe3LQ5pF3RbkJI-s1pkayzljjajc";
	var baseURL = "https://www.googleapis.com/youtube/v3/videos";
	
	return $.ajax( {
		url: baseURL,
		dataType: 'json',
		async: true,
		cache: false,
		data: 
			{
				key: APIKey,
				part: "snippet,contentDetails",
				id: videoID
			},
		success: function(data)
		{
			promisedVideos.push( data.items[0] );
		}
	});
}

var sort_promise_dsc = function( json1, json2 )
{
	if( json1.items.length === 0 )
		return -1;
	var date1 = new Date( json1.items[0].snippet.publishedAt );
	
	if( json2.items.length === 0 )
		return 1;
	
	var date2 = new Date( json2.items[0].snippet.publishedAt );
	
	if (date1 > date2) return -1;
	if (date1 < date2) return 1;
	return 0;
};

var readFile2 = function( file )
{
	$.when( $.get(file) ).then(function( file )
	{
		var arr = file.split(/\n/g);
		videoTotal = arr.length;
		for( var i = 0; i < arr.length; i++ )
		{
			promisedVideos.push( promisedVideoRequest( arr[i] ) );
		}
		
		$.when.apply($,promisedVideos).done( function() {
			
			var data = [];
			var ids = [];
			
			for( arg in arguments )
			{
				if( arguments[arg][1] === "success")
				{
					var xhrArg = arguments[arg][2];
					if( xhrArg.responseJSON.items.length > 0 )
					{
						var id = xhrArg.responseJSON.items[0].id;
						if( ids.indexOf(id) === -1 )
						{
							ids.push( id );
							data.push( xhrArg.responseJSON );
						}
					}
				}
			}
			data.sort( sort_promise_dsc );
			
			$.each( data, function( index, arg){
				console.log( index, arg );
				createVideoElement( arg.items[0], arg.items[0].id );
			});
		});
		
	});
}

$(function()
{
	readFile2('sublist.txt');
	
	$(".badge-error").on('mouseup', function(){
		$(this).closest('li').remove();
	});				
});