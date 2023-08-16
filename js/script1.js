window.onload = function(){

    const startButton = document.querySelector("#start-button");
    const button1 = document.querySelector("#button1");
    const listButtons = document.querySelectorAll(".style-card");
    const container = document.querySelector("#score");
    
    //Exibir as carta da Pokebola em todos os botões
    function showCardsBack(){
        for(let i = 0; i < 20; i++){
            listButtons[i].innerHTML = "";
            const sonImg = document.createElement("img");
            sonImg.setAttribute("src", "images/pokebola.png");
            sonImg.setAttribute("width", "139");
            sonImg.setAttribute("height", "108");
            sonImg.setAttribute("alt", "Aqui tem um Pokemon!");
            listButtons[i].appendChild(sonImg);
        }
    }
    
    showCardsBack();
    
    //Sortear as posições dos Pokemons
    let x = 0;
    let cardNumber = [];
    let index = 0;
    
    function drawCards(){
        console.log("Draw");
        while(x < 20){
            let num = Math.floor((Math.random() * 20));
            repeatedNumber = cardNumber.find(element => element == num);
                    
            if(repeatedNumber == undefined){
                cardNumber[index] = num;
                x = x + 1; 
                index = index + 1;
            }
        }
        
    }
    
    
    
    //Exibir os Pokemons por cinco segundos
    
    let pokemons = ["arbok-1", "arbok-2", "beedrill-3","beedrill-4", "bulbasaur-5", "bulbasaur-6", "charmander-7", "charmander-8",
                     "clefable-9", "clefable-10", "mewtwo-11", "mewtwo-12", "pidgeot-13", "pidgeot-14", "pikachu-15", "pikachu-16",
                     "squirtle-17", "squirtle-18", "vulpix-19", "vulpix-20"];
    
    let positionCards = [];
    
    function getPositionCards(){
        for(let i = 0; i < 20; i++){
            positionCards[i] = pokemons[cardNumber[i]] + ".png"; 
        }
    }
    
    
    const showTimeCards = function (){ 
        showCardsBack();        
    }
    
    
    startButton.addEventListener("click", function(){
        cardNumber = [];
        index = 0;
        x = 0;
        hitCounter = 0;
        hitCounter1 = 0;
        hitCounter2 = 0;
        totalHit = 0;
        container.innerHTML = "";
        console.log(cardNumber);
        drawCards();
        console.log(cardNumber);
        positionCards = [];
        getPositionCards();
        //console.log(positionCards);
        for(let i = 0; i < 20; i++){
            listButtons[i].innerHTML = "";
            const sonImg = document.createElement("img");
            sonImg.setAttribute("src", "images/" + positionCards[i] + "");
            sonImg.setAttribute("width", "139");
            sonImg.setAttribute("height", "108");
            sonImg.setAttribute("alt", "Aqui tem um Pokemon!");
            listButtons[i].appendChild(sonImg);
            gameTimeout = setTimeout(showTimeCards, 3000);
            
            }
            listButtons.forEach((btn) => {
            btn.addEventListener("click", checkCards, false);
            });
        });
    
    
    let countEvent = 0;    
    let positionsSelected = [];
    let cardIds =[];
    
    const showCardsPlay = function (){
        listButtons[cardIds[0]].innerHTML = '<img src="images/pokebola.png" width="139" height="108" alt="Aqui tem um Pokemon!">'; 
        listButtons[cardIds[1]].innerHTML = '<img src="images/pokebola.png" width="139" height="108" alt="Aqui tem um Pokemon!">'; 
              
    }
    
    let hitCounter = 0;
    let hitCounter1 = 0;
    let hitCounter2 = 0;
    let totalHit = 0;
    
    function scoreGame(totalHit){
        if(totalHit <= 15){
            console.log("Entrou");
            container.innerHTML = "<h4>Parabéns, voce acertou em " + totalHit + " jogadas.</h4>";
        }else if(totalHit > 15 && totalHit <= 20){
            console.log("Entrou1");
            container.innerHTML = "<h4>Bom, voce acertou em " + totalHit + " jogadas.</h4>";
        }else{
            console.log("Entrou2");
            container.innerHTML = "<h4>Precisa melhorar, voce acertou em " + totalHit + " jogadas.</h4>";
        }
    }
    
    
    
    function checkNumbersClick(value){
        //console.log(value);
        cardIds[countEvent] = value;
        countEvent++;
        //console.log(cardIds);
        if(countEvent == 2){
            //console.log(cardIds);
            if(positionsSelected[0] != positionsSelected[1]){
                hitCounter1++;
                gameTimeout = setTimeout(showCardsPlay, 1000);
                //console.log("Errou");
            }else if(cardIds[0] == cardIds[1]){
                hitCounter2++;
                listButtons[cardIds[0]].innerHTML = '<img src="images/pokebola.png" width="139" height="108" alt="Aqui tem um Pokemon!">'; 
            }else{
                hitCounter++;
                listButtons[cardIds[0]].removeEventListener("click", checkCards, false);
                listButtons[cardIds[1]].removeEventListener("click", checkCards, false);
                //console.log("Acertou");
                //console.log(hitCounter);
                if(hitCounter == 10){
                    scoreGame(totalHit);
                }
        }
        countEvent = 0;
        totalHit = hitCounter + hitCounter1 + hitCounter2;
        //console.log(typeof(totalHit));
        }
    
    }
    
    
    var checkCards = function(btn){
        //console.log(btn);
        let value = btn.path[1].id;
        //console.log(value);
        let valueId = value.split("-")[1];
        listButtons[valueId].innerHTML = '<img src="images/' + positionCards[valueId] + ' " width="139" height="108" alt="Aqui tem um Pokemon!">';
        positionsSelected[countEvent] = positionCards[valueId].split("-")[0];
        checkNumbersClick(valueId);  
    }
    
    }
    