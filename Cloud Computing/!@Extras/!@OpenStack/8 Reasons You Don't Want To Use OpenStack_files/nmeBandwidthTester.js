
var data = {
	numberOfBytes: 0,
	startTime: 0,
	endTime: 0,
	degrees: 0,
	results: {}
}

var mapStepToCycle = {
	// init
	 0: '00',
	// dld
	 1: '01',	 2: '01',	 3: '01',
	 4: '02',	 5: '02',	 6: '02',
	 7: '03',	 8: '03',	 9: '03',
	10: '04',	11: '04',	12: '04',
	13: '05',	14: '05',	15: '05',
	// upl
	16: '06',	17: '06',	18: '06',
	19: '07',	20: '07',	21: '07',
	22: '08',	23: '08',	24: '08',
	25: '09',	26: '09',	27: '09',
	28: '10',	29: '10',	30: '10',
	// computing, output
	31: '11'
}

var nmeBandwidthTesterInit = function() {
	data.degrees = -127;
	data.results = {};
	data.results.downloadText = 0;
	data.results.downloadValues = [];
	data.results.uploadText = 0;
	data.results.uploadValues = [];
	
}

var cron = function(step, data) {
	var degrees = 0;

	console.log("step: " + step + "/" + mapStepToCycle[step]);
		
	switch(step) {
		case 0: // initialize
			clearMessages();
			sendMessage("start testing ...\r\n[" + (mapStepToCycle[step]) + "] initialize ...");
			
			data.degrees = -127;
			data.results = {};
			data.results.downloadText = 0;
			data.results.downloadValues = [];
			data.results.uploadText = 0;
			data.results.uploadValues = [];

			showResult("#downloadResultValue", "red", 0);
			showResult("#uploadResultValue", "red", 0);

            jQuery("#bwtFrame").addClass("bwtCursorProgress");
            jQuery("#btwStartButton").hover(
				function() {
                    jQuery(this).css("cursor", "progress");
				},

				function() {
                    jQuery(this).css("cursor", "auto");
				}
			);
			
			rotateIndicator(step, data);
			break;

		case  1: // download #01.1
		case  4: // download #02.1
		case  7: // download #03.1
		case 10: // download #04.1
		case 13: // download #05.1
			console.log("downloading ...");
			sendMessage("[" + (mapStepToCycle[step]) + "] downloading ...");
			// data.numberOfBytes = 1024 * 1024 * 2; // 2 MB
			data.numberOfBytes = 1024 * 512; // 0.5 MB
			downloadBytes(step, data); // calls cron()
			break;

		case  2: // download #01.2
		case  5: // download #02.2
		case  8: // download #03.2
		case 11: // download #04.2
		case 14: // download #05.2
			//result = (data.numberOfBytes * 8 / 1024 / 1024) / ((data.endTime - data.startTime) / 1000);
			result = (data.numberOfBytes * 8 / 1000 / 1000) / ((data.endTime - data.startTime) / 1000);

			console.log("(" + data.numberOfBytes + " * 8 / 1000 / 1000) Mbit / ((" + data.endTime + " - " + data.startTime + ") / 1000) sec = " + result + " Mbit / sec");
			console.log("(" + data.numberOfBytes + " * 8 / 1000 / 1000) Mbit / (" + (data.endTime - data.startTime) + " / 1000) sec = " + result + " Mbit / sec");
			console.log("(" + (data.numberOfBytes * 8 / 1000 / 1000) + ") Mbit / (" + ((data.endTime - data.startTime) / 1000) + ") sec = " + result + " Mbit / sec");

			data.results.downloadValues.push(result);
			data.results.downloadText = result
			
			degrees = 25.4 * result - 127;

			if(degrees > 130) {
				degrees = 130 + Math.floor(Math.random() * 15);
			}

			if(degrees == data.degrees) {
				degrees = degrees + 1;
			}
				
			data.degrees = degrees;

			rotateIndicator(step, data); // calls cron()
			break;

		case  3: // download #01.3
		case  6: // download #02.3
		case  9: // download #03.3
		case 12: // download #04.3
		case 15: // download #05.3
			showResult("#downloadResultValue", "red", data.results.downloadText);
			cron(step + 1, data);
			break;


			
		case 16: // upload #01.1
		case 19: // upload #02.1
		case 22: // upload #03.1
		case 25: // upload #04.1
		case 28: // upload #05.1
			console.log("uploading ...");
			sendMessage("[" + (mapStepToCycle[step]) + "] uploading ...");
			// data.numberOfBytes = 1024 * 1024 * 2; // 2 MB
			data.numberOfBytes = 1024 * 128; // 128 KB
			uploadBytes(step, data);
			break;
			
		case 17: // upload #01.2
		case 20: // upload #02.2
		case 23: // upload #03.2
		case 26: // upload #04.2
		case 29: // upload #05.2
			// result = (data.numberOfBytes * 8 / 1024 / 1024) / ((data.endTime - data.startTime) / 1000); // Mibit/s
			result = (data.numberOfBytes * 8 / 1000 / 1000) / ((data.endTime - data.startTime) / 1000); // Mbit/s

			console.log("(" + data.numberOfBytes + " * 8 / 1000 / 1000) Mbit / ((" + data.endTime + " - " + data.startTime + ") / 1000) sec = " + result + " Mbit / sec");
			console.log("(" + data.numberOfBytes + " * 8 / 1000 / 1000) Mbit / (" + (data.endTime - data.startTime) + " / 1000) sec = " + result + " Mbit / sec");
			console.log("(" + (data.numberOfBytes * 8 / 1000 / 1000) + ") Mbit / (" + ((data.endTime - data.startTime) / 1000) + ") sec = " + result + " Mbit / sec");

			data.results.uploadValues.push(result);
			data.results.uploadText = result;
			degrees = 25.4 * result - 127;

			if(degrees > 130) {
				degrees = 130 + Math.floor(Math.random() * 15);
			}

			if(degrees == data.degrees) {
				degrees = degrees + 1;
			}
				
			data.degrees = degrees;

			rotateIndicator(step, data);
			break;

		case 18: // upload #01.3
		case 21: // upload #02.3
		case 24: // upload #03.3
		case 27: // upload #04.3
		case 30: // upload #05.3
			showResult("#uploadResultValue", "red", data.results.uploadText);
			cron(step + 1, data);
			break;

		case 31:
		default:
			// ending everything
			console.log("... all done!");
			sendMessage("... testing finished!");
			sendMessage("");
			

			// compute truncated mean:
			// ... (1) sort the results
			data.results.downloadValues.sort();
			data.results.uploadValues.sort();

			// ... (2) remove first and last element
			data.results.downloadValues.shift();
			data.results.downloadValues.pop();
			data.results.uploadValues.shift();
			data.results.uploadValues.pop();

			// ... (3) compute mean of remaining values
			var sum;
			var dldString;
			var uplString;
			
			// ... (3.1) download result ...
			sum = 0;
			
			data.results.downloadValues.forEach(function(element, index, array) {
				sum = sum + element;
			});

			result = (sum / data.results.downloadValues.length);
			showResult("#downloadResultValue", "green", result);
			dldString = result.toFixed(4);
 
			// ... (3.2) upload result ...
			sum = 0;
			
			data.results.uploadValues.forEach(function(element, index, array) {
				sum = sum + element;
			});

			result = (sum / data.results.uploadValues.length); 
			showResult("#uploadResultValue", "green", result);
			uplString = result.toFixed(4);


			// create nice output ...
			var filler = "                              ";
			var length = Math.max(dldString.length, uplString.length)

			sendMessage("Download: " + (filler + dldString).substr(length * -1) + " Mbit/s");
			sendMessage("  Upload: " + (filler + uplString).substr(length * -1) + " Mbit/s");

            jQuery("#bwtFrame").removeClass("bwtCursorProgress");
            jQuery("#btwStartButton").hover(
				function() {
                    jQuery(this).css("cursor", "pointer");
				},
				function() {
                    jQuery(this).css("cursor", "auto");
				}
			);


			// ... end of everything!			
			break;
	}
}

var downloadBytes = function(step, data) {
	data.startTime = (new Date).getTime();

    jQuery.ajax({
		url: "/wp-content/plugins/nme-bandwidth-tester/server.php",

		data: {
			download: data.numberOfBytes,
			multiplicator: 1
		},

		type: "POST",
		
		success: function() {
			data.endTime = (new Date).getTime();
			
			cron(step + 1, data);
			
			/*
			cron(step + 1, {
				numberOfBytes: numberOfBytes,
				startTime: startTime,
				endTime: (new Date).getTime()
			})
			*/
		}
	});
}

var uploadBytes = function(step, data) {
	data.startTime = (new Date).getTime();

    jQuery.ajax({
		url: "/wp-content/plugins/nme-bandwidth-tester/server.php",

		data: {
			upload: generateUploadString(data.numberOfBytes) // create a new one each time to avoid caching 
		},

		type: "POST",
		
		success: function(ajaxResult) {
			data.endTime = (new Date).getTime();
			cron(step + 1, data);
		}
	});
}

var rotateIndicator = function(step, data) {
	
	// jQuery("#downloadResultValue").html(result.toFixed(4) + "<br>Mbit/s");
	
	// 0 MBit/s = -127 degrees
	// 5 MBit/s = 0 degrees
	// 10 MBit/s = 127 degrees
	// 
	// > 10 MBit/s = 137 degrees
	// 
	// m = (y2 - y1) / (x2 - x1); y = mx + t
	// m = 25,4
	// t = -127
	// y (degrees) = 25,4 * x (MBit/s) - 127

	duration = 1000;

	if(step == 0) {
		duration = 2000;
	}
	
	if(step == 1) {
		duration = 4000;
	}

    jQuery("#indicator").rotate({
		animateTo: data.degrees,
		duration: duration,
		callback: function() { cron(step + 1, data) }
	});


}

var showResult = function(label, color, value) {
    jQuery(label).html(value.toFixed(4) + "<br>Mbit/s");
    jQuery(label).css('color', color);
}

var generateUploadString = function(numberOfBytes) {
	myChars = "0123456789ABCDEF";
	line = "";
	block = "";

	for(i = 0; i < 1024; i++) {
		line = line + myChars.charAt(Math.floor(Math.random() * (15 - 0 + 1)) + 0);
	}

	for(i = 0; i < Math.floor(numberOfBytes / 1024); i++) {
		block = block + line;
	}

	return block;
}

var sendMessage = function(message) {
	var m = jQuery("#messageCenter");

	if(m.val().length > 0) {
		message = m.val() + "\r\n" + message;
	}
		
	m.val(message);
	m.scrollTop(m[0].scrollHeight - m.height());
}

var clearMessages = function() {
	jQuery("#messageCenter").val("");
}

jQuery("#indicator").rotate({ animateTo: -135, duration: 0 });
