(function($){
    var mapElem;
    var mapInitial = (function(earthPos,mapElem){
	if(!mapElem){
	    var mapElem = document.getElementById("map");
	}
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
    $(document).ready(function(){
	
	mapElem = mapInitial({'lat':35.0042,'lng':135.7601},
			     document.getElementById('map'));
	// 何もない場所をクリックするとLatitude,Longitudeを取得できる。
	google.maps.event.addListener(mapElem,"click",(function(e){
	    var pos = e.latLng;
	    var result = "";
	    lat = pos.lat();
	    lng = pos.lng();
	    result = "(lat,lng) = "+lat+","+lng;
	    $('#result').text(result);
	}));
    });
})(jQuery);
