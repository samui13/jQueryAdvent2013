(function($){
    var map;
    var geocoder;
    var preTitle;
    var mapInitial = (function(earthPos){
	var mapElem = document.getElementById("map");
	var latlng = new google.maps.LatLng(earthPos['lat'],
					    earthPos['lng']);
	var mapOptions = {
	    center: latlng,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    zoom: 13,
	    mapTypeControl: false,
	    streetViewControl: false,
	    panControl: false,
	    overviewMapControl: false,
	};
	var myMap = new google.maps.Map(mapElem,mapOptions);
	return myMap;
    });
    codeAddress = (function(mapTitle){
	// 場所の名前からLatLngに切替する関数
	geocoder.geocode( { 'address': mapTitle}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
		var r =  results[0].geometry.location
		
		r = "(lat,long) = "+r.lat()+","+r.lng();
	    }else{
		var r = 'Geocode was not successful for the following reason: ' + status;
	    }
	    $('#lat').text(r);
	});
    });

    $.fn.timeout = (function(time){
	return $.Deferred(function(dfd){
	    setTimeout(dfd.resolve,time);
	}).promise();
    });

    // アイコンが有る場所をクリックして場所を取得する関数
    var registMapEvent = (function(){
	return (function(){
	    $.fn.timeout(1000).then(function(){
		var spotTitle = $('.gm-title').text()
		var spotAddress = $('.gm-basicinfo').text();
		// spotTitleが前の状態と変ってないならなにもしない
		// infowindowを閉じなかった場合の処理
		if(spotTitle!= preTitle && spotTitle)
		    preTitle = spotTitle
		else
		    return;
		// 大体の住所を取得する。
		var tmp = spotAddress.toString().split(',');
		// 出来ないならおわる。
		if(tmp.length<1)
		    return
		// 2番目の情報が適切なもののきがする
		spotAddress = tmp[1];
		var result = "SpotName:"+spotTitle;
		$('#result').text(result);
		// 緯度と経度を表示
		codeAddress(spotTitle);
	    });
	});
    });

    $(document).ready(function(){
	if(typeof google!== Object){
	    // GoogleMapが読み込めているとき
	    geocoder = new google.maps.Geocoder();
	    map = mapInitial({'lat':35.0042,'lng':135.7601});
	    // 何もない場所をクリックするとLatitude,Longitudeを取得できる。
	    google.maps.event.addListener(map,"click",(function(e){
		var pos = e.latLng;
		var result = "";
		lat = pos.lat();
		lng = pos.lng();
		result = "(lat,lng) = "+lat+","+lng;
		$('#result').text(result);
	    }));
	    // マップをクリックしたときに反応する関数。
	    $('#map').mousedown(registMapEvent());
	}
    });
})(jQuery);
