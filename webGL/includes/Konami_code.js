var flag = 1;

document.addEventListener('keydown', function(event) {
	var link = "http://145.239.154.192/gentil_gendarme.php";
	
	switch (event.keyCode) {
		
		case 40: // ArrowDown
			if( flag == 3 || flag == 4 ){
				flag++;
			}
			else{
				flag = 1;
			}
			console.log('Down : ' + flag);
			break;
			
		case 38: // ArrowUp
			if( flag == 1 || flag == 2 ){
				flag++;
				
				
			}
			else{
				flag = 1;
			}
			console.log('Up : ' + flag);
			break;
			
		case 37: // ArrowLeft
			
			if( flag == 5 || flag == 7 ){
				flag++;
				
			}
			else{
				flag = 1;
			}
			console.log('Left : ' + flag);
			break;
			
		case 39: // ArrowRight
			
			if( flag == 6 || flag == 8 ){
				flag++;
				
			}
			else{
				flag = 1;
			}
			console.log('Right : ' + flag);
			break;
			
		case 65: // a
			
			if( flag == 10 ){
				open(link);
				
			}
			else{
				flag = 1;
			}
			console.log('a :' + flag);
			break;
			
		case 66: // b
			
			if( flag == 9){
				flag++;
				
			}
			else{
				flag = 1;
			}
			console.log('b :' + flag);
			break;
			
		default:
			flag = 1;
			return; 
	}
	
    
});