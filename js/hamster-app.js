	
$(document).on('ready', function(){

	var X, Y, Xi, Yi;
	var image, image2;
	var line = false, circle = false;
	var paint;
	var color = '#000000';
	var size = $('#thickness').val();
	var elementcanvas = document.getElementById("paint");
	var context = elementcanvas.getContext("2d");

	function drawLine(x, y){
		context.strokeStyle = color;//Color de Linea
		context.lineJoin = 'round';//Forma
		context.lineWidth = size;//Grosor

		if(paint){
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(X, Y);
			context.closePath();
			context.stroke();
			X = x;
			Y = y;
		}
	}

	function drawCanvas(x, y){
		if(line){
			context.clearRect(0, 0, elementcanvas.width, elementcanvas.height);
			context.drawImage(image ,0 ,0 , elementcanvas.width, elementcanvas.height);
			drawLineRect(x, y);			
		}

		if(circle){
			context.clearRect(0, 0, elementcanvas.width, elementcanvas.height);
			context.drawImage(image ,0 ,0 , elementcanvas.width, elementcanvas.height);
			drawCircle(x, y);
		}

		if(paint){
			drawLine(x, y);
		}
	}

	function newCanvas(){
		context.clearRect(0, 0, elementcanvas.width, elementcanvas.height);
	}

	function saveCanvas(){
		image = new Image();
		image.src = elementcanvas.toDataURL();
		image.onload = function(){
			context.drawImage(image ,0 ,0 , elementcanvas.width, elementcanvas.height);
		}
	}

	function saveCanvas2(){
		image2 = new Image();
		image2.src = elementcanvas.toDataURL();
		return image2;
	}

	function drawLineRect(x, y){
		context.beginPath();
  		context.moveTo(Xi, Yi);
  		context.lineTo(x, y);
  		context.closePath();
  		context.stroke();
	}

	function drawCircle(x, y){
		context.beginPath();
		var x_ = Xi - x;
		var y_ = Yi - y;

		if (x_ < 0) {
			x_ = 0;
		}

		if (y_ < 0) {
			y_ = 0;
		}

        context.arc(x, y, x_, y_, 2 * Math.PI, true);
        context.fill();
        context.stroke();
	}

	function saveImage(canvas){
		if(elementcanvas.getContext){
			//Defecto png, "image/jpg"
			var datacanvas = canvas.toDataURL();
			document.getElementById('imgdownload').src = datacanvas;
		}
	}

	$('#paint').mousedown(function(evt){
		X = evt.pageX - this.offsetLeft;
		Y = evt.pageY - this.offsetTop;
		paint = true;
		$('#coorX').val(X);
		$('#coorY').val(Y);
		
		Xi = X;
		Yi = Y;

	});

	$('#paint').mousemove(function(evt){
		if(paint){
			var x = evt.pageX - this.offsetLeft;
			var y = evt.pageY - this.offsetTop;
			$('#coorX').val(X);
			$('#coorY').val(Y);
			drawCanvas(x, y);
		}
	});

	$('#paint').mouseup(function(evt){
		paint = false;
	});

	$('#paint').mouseleave(function(evt){
		paint = false;
	});

	$('#pencil').click(function(){
		color = $('#color').val();
		size = $('thickness').val();
		line = false;
		circle = false;
	});

	$('#eraser').click(function(){
		color = "#FFFFFF";
		size = $('thickness').val();
		line = false;
		circle = false;
	});

	$('#thickness').change(function(){
		size = $(this).val();
	});

	$('#color').change(function(){
		color = $(this).val();
	});

	$('#clear').click(function(){
		newCanvas();
	});

	$('#saveas').click( function(){
		saveImage(elementcanvas);
	});
	
	$('#line').click( function(){
		color = $('#color').val();
		if(line){
			line = false;
		}else{
			line = true;
			paint = false;
			circle = false;
			saveCanvas();
		}
	});

	$('#circle').click( function(){
		color = $('#color').val();
		context.fillStyle = "#FFFFFF";
		if(circle){
			circle = false;
		}else{
			circle = true;
			paint = false;
			line = false;
			saveCanvas();
		}
	});
});
