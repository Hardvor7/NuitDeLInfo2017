var haut = 0;
var gauche = 0;
var rotation = 0;
var nx = 1;
var ny = 1;
var x = document.getElementById("404");
var s = document.getElementById("shoot");

var compteur_shoot = 0;


setInterval(moveX,20);
setInterval(moveY,20);

function fct_shoot(){
	if( compteur_shoot >= 5){
		var link = "http://145.239.154.192/easter_egg.html";
		open(link);
	}
	else{
		compteur_shoot += 1;
		document.getElementById("shoot").style.display = "initial";
		document.getElementById("shoot").innerHTML = "SHOOT: " + compteur_shoot + " /5";
	}
}

function moveX(){
	if( gauche > innerWidth - 700){
		nx = 2;
	}
	if( gauche < -150){	
		nx = 1;	
	}
	if( nx == 1){
		gauche += 5;
	}
	if( nx == 2){
		gauche -= 5;
	}
	rotation += 1;
	x.style.transform = "rotate(" + rotation + "deg)";
	x.style.left = gauche + "px";

}
function moveY(){
	if( haut > innerHeight - 350 ){
		ny = 2;
	}
	if( haut < 50){	
		ny = 1;	
	}
	if( ny == 1){
		haut += 15;	
	}
	if( ny == 2){
		haut -= 15;
	}
	rotation += 1;
	x.style.transform = "rotate(" + rotation + "deg)";	
	x.style.top = haut + "px";

}




