/*
@eValert - events alert - jQuery plugin 
@author: Tadele Meshesha
@creationDate: 01/01/2017
@version: 1.0.0
@authorEmail: meshesha1@gmail.com
@license: GPL3
*/ 
(function($) {
    $.fn.evalert = function( options ) {
		var timerData = []; //to save alerts
        var settings = $.extend({
			eventSource: '',/*'','json','php'*/
			eventUrl:'',/*URL to json file or php file*/
			eventParams:'',/*{event-1:[event-1],event-2:[event-2],...,event-n:[event-n]}-object contin the events parametrs include event time , event alert time and more */
			eventOntimeAlert:true,/*true - show alert on time, false-dont show*/
			alertWinPos: false, /*false-as is,'tl','tr','bl','br','ftl','ftr','fbl','fbr' */
			alertWinWidth: false, /*false-as is,width in px */
			alertWinHeight: false, /*false-as is,Height in px */
			title: 'Events Box', /*The title of alert window*/
            newAlertFirst: true, /*true - show new alert first, false-show new alert last*/
            bodyBorderColor: false,
			titleBgColor: false,
			titleTextColor: 'white',
			titleFontSize: '15px',
			contentBgColor: 'white',
			contentFontSize: '10px'
        }, options );
		/////////event object////////
		if(settings.eventParams != ''){
			if(typeof settings.eventParams == 'object'){
				$.each(settings.eventParams,function(evntName,evntsParam){
					var eventParamArry = [];
					eventParamArry.push(evntName);
					var eventParam = eventParamArry.concat(evntsParam);
					var eventName = eventParam[0];
					var evenDate = eventParam[1];
					var evenTime = eventParam[2];
						if(evenTime=='' || evenTime==undefined){
							evenTime = '0:0';
						}					
					var alertTime = eventParam[3];
					var eventInfoUrl = eventParam[4];
					var eventBgColor = eventParam[5];
					var eventTxtColor = eventParam[6];					
					eventParamsHandler(eventName,evenDate,evenTime,alertTime,eventInfoUrl,eventBgColor,eventTxtColor);
				});
			}
		}
		if(settings.eventSource != ''){
			var evUrl = settings.eventUrl;
			if (evUrl==''){
				console.error('you need to provide eventUrl');
			}
			if(settings.eventSource == 'json'){
				$.get(''+evUrl+'', {now: $.now()}, function(d){
					$.each(d.jcal, function(index, event) {
						ajaxDataHandler(event);
					});
				}, settings.eventSource).fail(function() {
					console.error('evalert.js failed to import '+evUrl+'. Please check for the correct path & '+settings.eventSource+' syntax.');
				});				
			}else if(settings.eventSource == 'php'){
				$.ajax({
					type   	: 'POST',
					url		: evUrl, 
					data   	:{data:'evalert_ajax'},
					success	: function (d) {
						var obj = $.parseJSON(d);//convert json strint to json object 
						$.each(obj.jcal, function(index, event) {
							ajaxDataHandler(event);
						});
						
					}
				});
			}
			function ajaxDataHandler(event){
				var evName = event.name;
				var evDate = event.startdate;
				var evTime = event.starttime;
					if(evTime=='' || evTime==undefined){
						evTime = '0:0';
					}					
				var evMoreInfoUrl = event.url; 
				var evBgColor = event.bgcolor; 
				var evTxtColor = event.color; 
				var alrtTime = event.eventalert;
				eventParamsHandler(evName,evDate,evTime,alrtTime,evMoreInfoUrl,evBgColor,evTxtColor);				
			}
		} 
		////params func. handler
		function eventParamsHandler(eventName,evenDate,evenTime,alertTime,evInfoUrl,evBgColor,evTxtColor) {
			var msgText = 'Name: '+eventName+'.Date: '+evenDate+'.Time: '+ evenTime;
			if (evInfoUrl != ''){
				msgText += '<a href="'+evInfoUrl+'" target="_blank"> Link. </a>'; 
			}
			//alerAt > TYPE=ALERT;BFOR=MIN;VAL=1
			var alrt = alertTime.split(';');
			var alrtTyp = alrt[0].split('=')[1];
			var alrtBefoTyp = alrt[1].split('=')[1];
			var alrtVal = Number(alrt[2].split('=')[1]);
			var parmArray ;
			var alertBefor;
			if(settings.eventOntimeAlert){
				var complitText = msgText
				complitText += ''; //.'Alert 0 minutes before the event occur.'
				parmArray = [eventName,evenDate,evenTime,0,complitText,evBgColor,evTxtColor];
				eventsAlert(parmArray);
			}
			if(alrtTyp=='ALERT'){
				switch(alrtBefoTyp){
					case 'WEEK':
						var complitText = msgText
						complitText += '.The event will occur in '+ alrtVal+ ' weeks.';
						alertBefor = alrtVal * 604800; //1 week = 604800 seconds
						parmArray = [eventName,evenDate,evenTime,alertBefor,complitText,evBgColor,evTxtColor];
						eventsAlert(parmArray);								
						break;
					case 'DAY':
						var complitText = msgText
						complitText += '.The event will occur in '+ alrtVal+ ' days.';
						alertBefor = alrtVal * 86400; //1 day = 86400 seconds
						parmArray = [eventName,evenDate,evenTime,alertBefor,complitText,evBgColor,evTxtColor];
						eventsAlert(parmArray);
						break;
					case 'HOUR':
						var complitText = msgText
						complitText += '.The event will occur in '+ alrtVal+ ' hours.';
						alertBefor = alrtVal * 3600; //1 hore = 3600 seconds
						parmArray = [eventName,evenDate,evenTime,alertBefor,complitText,evBgColor,evTxtColor];
						eventsAlert(parmArray);
						break;
					case 'MIN':
						var complitText = msgText
						complitText += '.The event will occur in '+ alrtVal+ ' minutes.';
						alertBefor = alrtVal * 60; //1 minute = 60 seconds
						parmArray = [eventName,evenDate,evenTime,alertBefor,complitText,evBgColor,evTxtColor];
						eventsAlert(parmArray);
						break;
				}						
			}					
		}
		//parametr func.
		function eventsAlert(paramArry) { 
			var eventName = paramArry[0],
				evenDate = paramArry[1],
				evenTime = paramArry[2],
				alerbfor = paramArry[3],
				msg = paramArry[4],
				bg_color = paramArry[5],
				txt_color = paramArry[6];
			//Event Date
			var destDate = evenDate.split('-');
			var destYear = Number(destDate[0]);
			var destMonth = Number(destDate[1])-1;
			var destDay = Number(destDate[2]);
			//Event Time
			var destTime = evenTime.split(':');
			var destHour = Number(destTime[0]);
			var destMin = Number(destTime[1]);

			var dd = new Date(destYear,destMonth,destDay,destHour,destMin,0,0);
			var ddd = dd.getTime();
			var dddInSecs = Math.round(ddd/1000) - alerbfor; 
			
			var dt = new Date();
			var tymInMilisecs = dt.getTime();
			var tymInSecs = Math.round(tymInMilisecs/1000);
			
			var indx;
			var timerData_len = timerData.length;
			if (timerData_len==0){
				indx = 1;
			}else{
				indx = timerData[timerData_len-1].timerIndex + 1;
			}
			timerData[indx] = {
				remaining: tymInSecs,
				stop: dddInSecs,
				timerId: setInterval(function () { alertSecondPassed(indx); },1000),
				timerMsg: msg,
				timerIndex: indx,
				bColor: bg_color,
				tColor: txt_color
			};
		}		
        // main cheke time func.
		function alertSecondPassed(indx) {
			var seconds = timerData[indx].remaining;
			var stopSec = timerData[indx].stop;
			if (seconds == stopSec) { 
				clearInterval(timerData[indx].timerId); 
				var txtToAlert = timerData[indx].timerMsg;
				var bcolor = timerData[indx].bColor;
				var tcolor = timerData[indx].tColor;
				alertDialog(txtToAlert,bcolor,tcolor);
			}else if(seconds > stopSec){
				clearInterval(timerData[indx].timerId);
			} else {
				seconds++;
			}
			timerData[indx].remaining = seconds;
		}
		//Aler Window Parametrs and Handlers 
		var UID;
		var this_tag_name = $(this).prop('tagName');
		if (this_tag_name=='BODY' || this_tag_name=='body'){
			$(document.body).append('<div id="timer_alert_msg"></div>');
			UID = 'timer_alert_msg';
		}else{
			if($(this).attr('id') != undefined){
				UID = $(this).attr('id');
			}else{
				UID = 'timer_alert_msg';
				$(this).attr('id',UID);
			}
		}
		if(!$('#'+UID).hasClass('evalert-body')){
			$('#'+UID).addClass('evalert-body')
		}
		$('#'+UID).append('<div class="evalert-toolbar"></div><div class="evalert-content"></div>');
		$('#'+UID+' .evalert-toolbar').append('<span class="evalert-toolbar-title"></span><span class="evalert-toolbar-title-evnt-counter-open"> - (</span><span class="evalert-toolbar-title-evnt-counter">0</span><span class="evalert-toolbar-title-evnt-counter-close">)</span><div class="evalert-buutons"><span class="evalert-minimze-maximize evalert-icon-min"></span><span class="evalert-close">X</span></div>');
		$('#'+UID+' .evalert-toolbar-title').html(settings.title);
		////////////cheke direction RTL/LTR //////////////////
		function getDirection(elem) {
			var dir;
			if (window.getComputedStyle) { // all browsers
				dir = window.getComputedStyle(elem, null).getPropertyValue('direction');
			} else {
				dir = elem.currentStyle.direction; // IE5-8
			}
			return dir;
		}
		var inputDir = getDirection($(this)[0]);
		//alert(inputDir)
		if (inputDir=="rtl"){
			$('#'+UID).attr("dir","ltr");
		} 		
		// Aler Window Width
		if (settings.alertWinWidth != false){
			$('#'+UID).css('width', settings.alertWinWidth);
		}
		// Aler Window Border color
		if (settings.bodyBorderColor != false){
			$('#'+UID).css('background', settings.bodyBorderColor);
		}
		// Aler Title background color
		if (settings.titleBgColor != false){
			$('#'+UID+' .evalert-toolbar').css('background', settings.titleBgColor);
		}
		// Aler Title Text color
		if (settings.titleTextColor != false){
			$('#'+UID+' .evalert-toolbar').css('color', settings.titleTextColor);
		}
		// Aler Title font size
		if (settings.titleFontSize != false){
			$('#'+UID+' .evalert-toolbar').css('font-size', settings.titleFontSize);
		}		
		// Aler Window Height
		if (settings.alertWinHeight != false){
			$('#'+UID+' .evalert-content').css('height', settings.alertWinHeight);
		}
		// Aler content background color
		if (settings.contentBgColor != false){
			$('#'+UID+' .evalert-content').css('background', settings.contentBgColor);
		}
		// Aler content font size
		if (settings.contentFontSize != false){
			$('#'+UID+' .evalert-content').css('font-size', settings.contentFontSize);
		}		
		// Aler Window Position //'tl','tr','bl','br','ftl','ftr','fbl','fbr'
		if (settings.alertWinPos != false){
			switch(settings.alertWinPos){
				case 'tl':
					$('#'+UID).css({
						'position':'absolute',
						'top':'0',
						'left':'0'
					});
					break;
				case 'tr':
					$('#'+UID).css({
						'position':'absolute',
						'top':'0',
						'right':'0'
					});				
					break;
				case 'bl':
					$('#'+UID).css({
						'position':'absolute',
						'bottom':'0',
						'left':'0'
					});				
					break;	
				case 'br':
					$('#'+UID).css({
						'position':'absolute',
						'bottom':'0',
						'right':'0'
					});					
					break;	
				case 'ftl':
					$('#'+UID).css({
						'position':'fixed',
						'top':'0',
						'left':'0'
					});				
					break;	
				case 'ftr':
					$('#'+UID).css({
						'position':'fixed',
						'top':'0',
						'right':'0'
					});					
					break;	
				case 'fbl':
					$('#'+UID).css({
						'position':'fixed',
						'bottom':'0',
						'left':'0'
					});					
					break;	
				case 'fbr':
					$('#'+UID).css({
						'position':'fixed',
						'bottom':'0',
						'right':'0'
					});					
					break;
				case 'draggable':
					$('#'+UID).css({
						'position':'absolute',
						'top':'0',
						'right':'0',
						/*
						'resize':'both',
						'overflow':'auto',
						*/
						'cursor':'move'
					});							
					$('#'+UID).attr('draggable','true');
					$('#'+UID).on('dragstart', function(event){
						var pos = $(this).position();
						event.originalEvent.dataTransfer.setData("text",(pos.left - event.clientX) + ',' + (pos.top - event.clientY));						
					})
					$(document.body).on('dragover', function(event){
						event.preventDefault(); 
						return false; 
					});
					$(document.body).on('drop', function(event){
						event.preventDefault();
						var offset = event.originalEvent.dataTransfer.getData("text").split(',');
						$('#'+UID).css('left',(event.clientX + parseInt(offset[0],10)) + 'px');
						$('#'+UID).css('top',(event.clientY + parseInt(offset[1],10)) + 'px');
						
						return false;						
					});
					break;					
			}
		} 		
		///////buton events /////
		$('#'+UID+' .evalert-minimze-maximize').click(function(){
			if($(this).hasClass('evalert-icon-max')){
				$(this).addClass('evalert-icon-min').removeClass('evalert-icon-max');
			}
			else{
				$(this).addClass('evalert-icon-max').removeClass('evalert-icon-min');
			}
			$('#'+UID+' .evalert-content').slideToggle();
		});		
		$('#'+UID+' .evalert-close').click(function(){
			$('#'+UID).hide();
		});		
		// Alert Window
		function alertDialog(msgTxt,bgColor,txtColor){
			//bgColor
			var bgcStyle='';
			var tcStyle='';
			if (bgColor !=''){
				bgcStyle = 'background:'+bgColor+';';
			}
			//txtColor
			if (txtColor !=''){
				 tcStyle = 'color:'+txtColor+';';
			}			
			var events_num_old = $('#'+UID+' .evalert-toolbar-title-evnt-counter').html();
			var events_num_new = Number(events_num_old)+1;
			$('#'+UID+' .evalert-toolbar-title-evnt-counter').html(events_num_new);
			if(settings.newAlertFirst){
				$('#'+UID+' .evalert-content').prepend('<div class="evalert-alert" style="'+bgcStyle+tcStyle+'"><span class="evalert-close-button" id="evalert-close-button-'+events_num_new+'">&times;</span><span>'+msgTxt+'</span></div>');					
			}else{
				$('#'+UID+' .evalert-content').append('<div class="evalert-alert" style="'+bgcStyle+tcStyle+'"><span class="evalert-close-button" id="evalert-close-button-'+events_num_new+'">&times;</span><span>'+msgTxt+'</span></div>');					
			}
			
			$('#'+UID+' .evalert-close-button').on('click', function(){
				$(this).parent().remove();
				var cont_evnts = $('#'+UID+' .evalert-alert').length;
				var events_num_old = $('#'+UID+' .evalert-toolbar-title-evnt-counter').html(cont_evnts);
			});
		}
    };
}( jQuery ));