class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //escribe aquí el código para ocultar los elementos de la pregunta
    question.hide();

    //escribe aquí el código para cambiar el color de fondo 
    background("Yellow");

    //escribe el código para mostrar un encabezado que indique el resultado del Cuestionario
    textSize(30);
    text("Resultado del Cuestionario", 350, 50);

    //llama aquí a getContestantInfo( )
    Contestant.getPlayerInfo();


    //escribe la condición para comprobar si contestantInfor no está indefinido 
    if(allContestants !== undefined) {
      debugger;
      var display_Answers = 230;
      fill("blue");
      textSize(20);
      text("*NOTA: El concursante que respondió correctamente está resaltado en verde.", 130, 230);

      for(var plr in allContestants) {
        debugger;
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer) {
          fill("green");
        } else {
          fill("red");
        }
        
        display_Answers += 30;
        textSize(20);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 250, display_Answers);
      }
    }
  }
}
