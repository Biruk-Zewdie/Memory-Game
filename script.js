const gameContainer = document.getElementById("game");

//game States 
let revealedCount = 0;                    //we are going to start with zero divs revealed.
let activeDiv = null;                     // the div which the player has clicked on and looking for next div to much.
let awatingEndOfMove = false;             //the state of awaiting time for two unmatched divs to be turned off.

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    newDiv.setAttribute("data-color", color);
    newDiv.setAttribute("data-revealed", false);



    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", function (){
      const revealed = newDiv.getAttribute("data-revealed");
      
      if (awatingEndOfMove || revealed === "true" || newDiv === activeDiv){            // if the div is revealed it won't we active again.
        return;
      }

      newDiv.style.backgroundColor = color;              // to reveal the color on a div.

      if (!activeDiv){
        activeDiv = newDiv;                                   // to get an active div.
        return;                                               // once we get an active div we'll return it. 
      }                                                       //B/c we will compare the color of the 2nd element with this active div.

      const colorToMatch = activeDiv.getAttribute("data-color");           // to get the color of active div from setted attribute earlier. 
      if (colorToMatch === color){

        activeDiv.setAttribute ("data-revealed", "true");               //once the active div and div matched up. Their color will be seted revealed 
        newDiv.setAttribute("data-revealed", true);                     //this is to prevant matched divs from being active again.

        awatingEndOfMove = false;                                         //senarios to be set when active div and div color matches up.
        activeDiv = null;
        revealedCount += 2;

        if (revealedCount === COLORS.length){                            // if the whole divs are matched up, the player win the game.
          alert("YOU WIN!!! REFRESH TO PLAY AGAIN")
        }
        return;
      }

      awatingEndOfMove = true;                           // To prevent any further divs from being clicked on after two divs are clicked.

      setTimeout (function (){                          // time is set to 1 sec to get back to its original inactive state if it isn't matched.
        activeDiv.style.backgroundColor = null;
        newDiv.style.backgroundColor = null;

        awatingEndOfMove = false;                      //  to set back div state and being able to start  clicking again on the divs 
        activeDiv = null;
        
      }, 1000)

    });

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);
