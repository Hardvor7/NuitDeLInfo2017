<!DOCTYPE html>
<html>
 <head>
    <link href="css/stylesheet.css" rel="stylesheet">
    
</style>
  <title>Jeu Sam</title>
 </head>
 <body>

 		<h1>
 			<center>
     			Chaque joueur doit allez sur cette page internet et appuyez sur jouer ! <br>
                <br> Celui qui gagne au shifumi sera le Sam <br>
     			<br> Bonne chance !!!<br>
     			<br><input type="button" value="JOUER" onclick="fonction()" ></br>
                <p id="test"></p>
				<script type="text/javascript" >
                    function fonction(){
                    res = Math.round(Math.random()*2);
                    if(res==0){
                        document.getElementById("test").innerHTML = "vous avez tiré pierre";
                    }
                    else if(res==1){
                        document.getElementById("test").innerHTML = "vous avez tiré feuille";
                    }
                    else{
                        document.getElementById("test").innerHTML = "vous avez tiré ciseaux";
                    }
                }
                    </script>
    		</center>
    	</h1>

    	<script>
</script>
<form>
	
</form>
 	</body>
</html>