<h1>eValert.js</h1><h1>eVents alert - jQuery plugin</h1>
<h2>About:</h2>
<p>Provides a window alarms and alarm events.<br>
The alerts will appear before minutes, hours, days or weeks according to your choice.<br>
Additionally You can choose also when the event occurs.</p>

<h2>Features:</h2>
<div class="content">
	<ul>
		<li>Customize event alert window.</li>
		<li>Notifications minutes, hours, days or weeks according to your choice before event occurs.</li>
		<li>Supports ajax</li>
		<li>Supports json file</li>
		<li>compatible with meshesha/jCal calendar.</li>
	</ul>
</div>

<h2>Installation:</h2>
<div class="content">Add in the header of your html page:<br>
	<ul>
		<li>jquery.js</li>
		<li>evalert.js</li>
		<li>evalert.css</li>
	</ul>
</div>

<h2>Usage:</h2>
<div class="content">
add in the BODY <code>&lt;div id="my_events_example"&gt;&lt;/div&gt;</code><br>
and then add javascript code:
<pre>
&lt;script type="text/javascript"&gt;
	$('#my_events_example').evalert({
		//here eValert options
	});
&lt;/script&gt;
</pre>
Example:
<pre>
&lt;script type="text/javascript"&gt;
$('#my_events_example').evalert({
	eventParams:{
		'Event-1':[
			'2017-01-02',
			'14:45',
			'TYPE=ALERT;BFOR=MIN;VAL=1',
			'http://localhost/my_tiny_todo/',
			'#4CAF50',
			'white',
		],
		'Event-2':[
			'2017-01-02',
			'14:47',
			'TYPE=ALERT;BFOR=MIN;VAL=1',
			'',
			'#2196F3',
			'black',		
		]
	},
	alertWinWidth: '300px',
	alertWinHeight: '80px',
	alertWinPos: 'fbl',
	title: 'Alerts',
	titleBgColor: 'red',
	titleTextColor: 'white'
});
&lt;/script&gt;
</pre>
Result:<br>
<img src="https://cloud.githubusercontent.com/assets/18533793/21593102/6a35f648-d11c-11e6-887e-8bba25e30b4a.JPG">
</div>
<h2>eValert options:</h2>
<div class="content">
<table id="evalert-options">
	<tr>
		<th><b>Name</b></th>
		<th><b>Description</b></th>
		<th><b>Options</b></th>
		<th><b>Default</b></th>
	</tr>
	<tr>
		<td>eventSource</td>
		<td>Type of data file.</td>
		<td>'' - Do not use external data. must use <b>eventParams</b>,for details, see below. <br>
		'json' - use json file<br>
		'php' - use php source<br>
		</td>
		<td>''</td>
	</tr>
	<tr>
		<td>eventUrl</td>
		<td>Path to events/alerts file.</td>
		<td>'path/to/myevents.json'<br>'path/to/myevents.php'<br></td>
		<td></td>
	</tr>
	<tr>
		<td>eventParams</td>
		<td>Object that contains the event data and alarm parametrs.</td>
		<td>
			format:<br>
			<pre>
{
	'Event name -1':[
		'event date',
		'event time',
		'alarm parametrs',
		'url',
		'background color',
		'text color',
	],
	'Event name -2':[
		'2017-01-30',
		'14:50',
		'TYPE=ALERT;BFOR=MIN;VAL=1',
		'http://your/link/of/this/event.html',
		'#2196F3',
		'black',		
	]
}
			</pre>
Where:<br>
<ul>
<li><b><i>'event date'</i></b>: the event date in format YYYY-MM-DD ,where YYYY-year, MM-month, DD-day , e.g:'2017-01-30'.(must)</li>  
<li><b><i>'event time'</i></b>: the event time in 24 hours format hh:mm ,where hh-hour, mm-minutes , e.g:'14:50'.<br>
	(optional - but if this empty(''), the default time will be '00:00').</li>
<li><b><i>'alarm parametrs</i></b>': format: <b>'TYPE=alert;BFOR=bb;VAL=value'</b>,<br>Where: 
	<ul>
		<li>alert: ALERT (Uppercase)</li>
		<li>bb: WEEK , DAY , HOUR , MIN (Uppercase)</li>
		<li>value: intiger number.</li>
	</ul>
	Example:<br>
	<i>'TYPE=ALERT;BFOR=WEEK;VAL=2'</i> - Alert 2 weeks befor the event occur.<br> 
	<i>'TYPE=ALERT;BFOR=DAY;VAL=3'</i> - Alert 3 days befor the event occur.<br> 
	<i>'TYPE=ALERT;BFOR=HOUR;VAL=4'</i> - Alert 4 hours befor the event occur.<br> 
	<i>'TYPE=ALERT;BFOR=MIN;VAL=45'</i> - Alert 45 minutes befor the event occur.<br> 
	</li>
<li><b><i>'url'</i></b>: link for this event.(optional)</li>
<li><b><i>'background color'</i></b>: background color of this event. (optional - but if this empty(''), the default will be 'red')</li>
<li><b><i>'text color'</i></b>: text color of this event. (optional - but if this empty(''), the default will be 'white')</li>
</ul>
			
		</td>
		<td></td>
	</tr>
	<tr>
		<td>eventOntimeAlert</td>
		<td>Do alert when the event occurs?</td>
		<td><i>true</i>-show alert when the event occur.<br><i>false</i>-don't show alert when the event occur.<br></td>
		<td><i>true</i></td>
	</tr>
	<tr>
		<td>alertWinPos</td>
		<td>The position of the DIV (Alerts window) relative to its parent alemnt.<br>
		<span style="color:red;"><i>note:</i> If it has no parent, then will be  relative to &lt;BODY&gt</span></td>
		<td>
		Options:<br>
		<table style="border: 1px solid #33adff">
			<tr>
				<th>Name</th><th>the location</th>
			</tr>
			<tr>
				<td><i>false</i></td><td>your css style</td>
			</tr>
			<tr>
				<td><i>'tl'</i></td><td>top left of the page</td>
			</tr>
			<tr>
				<td><i>'tr'</i></td><td>top right of the page</td>
			</tr>
			<tr>
				<td><i>'bl'</i></td><td>bottom left of the page</td>
			</tr>
			<tr>
				<td><i>'br'</i></td><td>bottom right of the page</td>
			</tr>
			<tr>
				<td><i>'ftl'</i></td><td>fixed top left of the page</td>
			</tr>
			<tr>
				<td><i>'ftr'</i></td><td>fixed top right of the page</td>
			</tr>
			<tr>
				<td><i>'fbl'</i></td><td>fixed bottom left of the page</td>
			</tr>
			<tr>
				<td><i>'fbr'</i></td><td>fixed bottom right of the page</td>
			</tr>
			<tr>
				<td><i>'draggable'</i></td><td>draggable window</td>
			</tr>			
		</table>
		</td>
		<td><i>false</i></td>
	</tr>
	<tr>
		<td>alertWinWidth</td>
		<td>The width of the Alerts window.</td>
		<td><i>false</i>auto (100%).<br>width in px.</td>
		<td><i>false</i></td>
	</tr>
	<tr>
		<td>alertWinHeight</td>
		<td>The height of the Alerts window.</td>
		<td><i>false</i>-80px.<br>height in px.</td>
		<td><i>false</i></td>
	</tr>
	<tr>
		<td>title</td>
		<td>The title of Alerts window.</td>
		<td><i>text</i></td>
		<td>'Events Box'</td>
	</tr>
	<tr>
		<td>newAlertFirst</td>
		<td>Order of appearance of alerts.</td>
		<td><i>true</i>-new alert first.<br><i>false</i>-new alert last.</td>
		<td><i>true</i></td>
	</tr>
	<tr>
		<td>bodyBorderColor</td>
		<td>Border Color of Alerts window.</td>
		<td><i>color value</i></td>
		<td>white</td>
	</tr>
	<tr>
		<td>titleBgColor</td>
		<td>background color of the title of the Alerts window.</td>
		<td><i>color value</i></td>
		<td>#03a9f4</td>
	</tr>
	<tr>
		<td>titleTextColor</td>
		<td>Text color of the title of the Alerts window.</td>
		<td><i>color value</i></td>
		<td>white</td>
	</tr>
	<tr>
		<td>titleFontSize</td>
		<td>The font size of the title of the Alerts window.</td>
		<td><i>font size value</i></td>
		<td>15px</td>
	</tr>
	<tr>
		<td>contentBgColor</td>
		<td>background color of the content area of the Alerts window.</td>
		<td><i>color value</i></td>
		<td>white</td>
	</tr>
	<tr>
		<td>contentFontSize</td>
		<td>The font size of the content area of the Alerts window.</td>
		<td><i>font size value</i></td>
		<td>10px</td>
	</tr>
</table>
</div>
<h2>Alerts Window</h2>
<div>
<img src="https://cloud.githubusercontent.com/assets/18533793/21593120/852c2ba2-d11c-11e6-84e0-63cafd776f35.png">
</div>
<h2>Using json file and Ajax php</h2>
<div>
<a href="https://github.com/meshesha/evalert/wiki/eValert-file-format"> click here</a>
</div>
<h2>Licensing</h2>
<p>GPLv3</p>
