					//***thinking with type***//
			  //*scripting & design by chris clark*//
	
	var clicked="no";	
	
	//motion functions		
	
	function moveLeft(opener) {
	//takes a param for how it is used 
	//(in the opener or user click)
		if(opener == 'yes' && clicked == 'no' || opener =='no') {
						$('.slideboard').animate({
							left: "-=1000px"
						}, 250, 'linear', function() {
						});
		}	
	}

	function moveRight(opener) {
						$('.slideboard').animate({
							left: "+=1000px"
						}, 250, 'linear', function() {
						});
	}
	
	function toDelete() {
		$('#banner div.slideboard').first().remove(); 
	}	


	function restart(kind, opener) {
	//takes a 'left' or 'right' param
	
		//determine if this function is being 
		//called from the opener	
		if(opener == 'yes' && clicked == 'no' || opener =='no') {

			//determine if it's left or right
			var nudge = "-=1000px";
			var reset = "1000px";
	
			if(kind == "left") {
				nudge = "+=1000px";
				reset = "-4000px";
			}

			//clone the slideboard
			$('#banner .slideboard:last').clone()
				.appendTo($('#banner'));

			//move the fresh slideboard to the side 
			//of the old one
			$('#banner .slideboard').last().css({
				left : reset
			});

			//animate them both
			$('#banner').children().animate({
				left: nudge
				}, 250, 'linear', function() {		
			});

			//get rid of the old one (must be outside
			//animate callback)		
			setTimeout(toDelete,250);

		}	
	}
	
		//onload action
					
			window.onload = function() {
				
				//fade in the slideboard, so users get the
				//impression it is 'alive'
				$('.slideboard').animate({
					opacity: "1"
				}, 250, 'linear', function() {
				//ie renders alpha text way weird, so 
				//afterwords i null it
				if($.browser.msie){
					$('.slideboard').css({opacity:''});
				}
				});
					
			//dodging eval like maru with a box on his head	
			function move() { moveLeft('yes'); 
			}
			function reset() { restart('right', 'yes'); 
			}
				//move through each slide & restart
				setTimeout(move,7000);
				setTimeout(move,14000);
				setTimeout(move,21000);
				setTimeout(reset,28000);
								
			};
			
		//left-right banner nav
		
			$('#right.bannernav').click(function() {
				clicked = "yes";
				//this checks where the slideboard div is.
				//that means in css file, 'left' MUST be 0px.
				if ($('.slideboard').css('left') == '-3000px') {
					restart('right', 'no');
				}
				else {
								moveLeft('no');
						}
			});
			
			$('#left.bannernav').click(function() {
				clicked = "yes";		
				if ($('#banner .slideboard').css('left') == '0px') {
						restart('left', 'no');
				}
				else {	
								moveRight('no');
					}
			});
				
		//popout search form

			$('#topsearch').click(function() {
				//check if it is hidden
				if ($('#searchinput2').css('display') == 'none') {
					//have to hide through js for ie6
					document.getElementById('searchinput2')
					.style.display = '';
								//move the other stuff (for ie6 & 7)
								$('#move').animate({
									marginRight: "+=150px"
								}, 100, 'linear', function() {
								})	;

								//pop out the input box
								$('#searchinput2').animate({
									width: "150px"
								}, 100, 'linear', function() {
								})	;		
					}
				//if it is already visible, send the form
				else {
						$('#search2').submit();
					}	

			});
			
		//fun hovers for ie6
		
			$('#topsearch').hover(function(){
				    $(this).addClass('topsearchhover');
				        }, function() {
				    $(this).removeClass('topsearchhover');
				        });
				
			$('#left.bannernav').hover(function(){
				    $(this).css({'backgroundPosition' : '-150px 0px'});
				        }, function() {
				    $(this).css({'backgroundPosition' : '-50px 0px'});
				        });
				
			$('#right.bannernav').hover(function(){
					$(this).css({'backgroundPosition' : '0px 0px'});
				        }, function() {
				    $(this).css({'backgroundPosition' : '-100px 0px'});
				        });
				
