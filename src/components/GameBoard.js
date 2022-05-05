// Gameboard component probable where most of the work is going to happen
import React, {useState} from "react";



function GameBoard()
{ 

    // the ugliest and easiest way to check for wins check against all winning combos only 69 of them

    const winningArrays = [
        [0, 1, 2, 3],
        [41, 40, 39, 38],
        [7, 8, 9, 10],
        [34, 33, 32, 31],
        [14, 15, 16, 17],
        [27, 26, 25, 24],
        [21, 22, 23, 24],
        [20, 19, 18, 17],
        [28, 29, 30, 31],
        [13, 12, 11, 10],
        [35, 36, 37, 38],
        [6, 5, 4, 3],
        [0, 7, 14, 21],
        [41, 34, 27, 20],
        [1, 8, 15, 22],
        [40, 33, 26, 19],
        [2, 9, 16, 23],
        [39, 32, 25, 18],
        [3, 10, 17, 24],
        [38, 31, 24, 17],
        [4, 11, 18, 25],
        [37, 30, 23, 16],
        [5, 12, 19, 26],
        [36, 29, 22, 15],
        [6, 13, 20, 27],
        [35, 28, 21, 14],
        [0, 8, 16, 24],
        [41, 33, 25, 17],
        [7, 15, 23, 31],
        [34, 26, 18, 10],
        [14, 22, 30, 38],
        [27, 19, 11, 3],
        [35, 29, 23, 17],
        [6, 12, 18, 24],
        [28, 22, 16, 10],
        [13, 19, 25, 31],
        [21, 15, 9, 3],
        [20, 26, 32, 38],
        [36, 30, 24, 18],
        [5, 11, 17, 23],
        [37, 31, 25, 19],
        [4, 10, 16, 22],
        [2, 10, 18, 26],
        [39, 31, 23, 15],
        [1, 9, 17, 25],
        [40, 32, 24, 16],
        [9, 17, 25, 33],
        [8, 16, 24, 32],
        [11, 17, 23, 29],
        [12, 18, 24, 30],
        [1, 2, 3, 4],
        [5, 4, 3, 2],
        [8, 9, 10, 11],
        [12, 11, 10, 9],
        [15, 16, 17, 18],
        [19, 18, 17, 16],
        [22, 23, 24, 25],
        [26, 25, 24, 23],
        [29, 30, 31, 32],
        [33, 32, 31, 30],
        [36, 37, 38, 39],
        [40, 39, 38, 37],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 16, 23, 30],
        [10, 17, 24, 31],
        [11, 18, 25, 32],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
    ]
    // Might allow name changing
    // hooks for displaying and changing
    const [fill, setFill] = useState("fill1")
    const [player, setPlayer] = useState("Yellow");
    // EVENT DRIVEN GAME LOOP, works for this project
    const columnClick = (cName, num) => {
        const columnNum = document.getElementsByClassName(cName);
        console.log(cName + " and the numeric is " + num);
        // Call drop function with columnNum
        dropPiece(columnNum, fill);
        // Toggle the player
        toggleFill();
        //Check for win function called
        checkBoard();
    }

    const dropPiece = (columns, fill) => {
        for(let  i= 0;i < columns.length;i++) {
            
            let column = columns[i];
            if (column.classList.contains("blocked") || (column.classList.contains("fill1") || column.classList.contains("fill2")))
            {
                fillSpace(column.previousElementSibling.classList, fill);
                removeDrop();
                return;
            } else {
                // where I can put animation code
            }

        }
    }
    
    function checkBoard() {
        const squares = document.querySelectorAll(".first, .second, .third, .fourth, .fifth, .sixth, .seventh");
        for (let y = 0; y < winningArrays.length; y++) {
          const square1 = squares[winningArrays[y][0]]
          const square2 = squares[winningArrays[y][1]]
          const square3 = squares[winningArrays[y][2]]
          const square4 = squares[winningArrays[y][3]]
    
          //check those squares to see if they all have the class of player-one
          if (
            square1.classList.contains('fill1') &&
            square2.classList.contains('fill1') &&
            square3.classList.contains('fill1') &&
            square4.classList.contains('fill1')
          )
          {
            console.log("Yellow WON!");
            // Need an announce winner Modal
            clearBoard();
            // result.innerHTML = 'Player One Wins!'
          }
          //check those squares to see if they all have the class of player-two
          if (
            square1.classList.contains('fill2') &&
            square2.classList.contains('fill2') &&
            square3.classList.contains('fill2') &&
            square4.classList.contains('fill2')
          )
          {
              console.log("Red WON!");
              // Need an announce winner Modal
              clearBoard();
            // result.innerHTML = 'Player Two Wins!'
          }
        }
      }
    
    const highlightDrop = (c) => {
        const topColumns = document.getElementsByClassName("top-columns");
        topColumns[c].classList.add(fill);
    }

    const removeDrop = () => {
        const topColumns = document.getElementsByClassName("top-columns");
        Array.from(topColumns).forEach(function(col){
            col.classList.remove("fill2");
            col.classList.remove("fill1");
            
        });
    } 
    const clearBoard = () => {
        const allColumns = document.querySelectorAll(".first, .second, .third, .fourth, .fifth, .sixth, .seventh");
        
        Array.from(allColumns).forEach(function(col){
            col.classList.remove("fill2");
            col.classList.remove("fill1");
            col.classList.remove("blocked");
        });
    }
    const fillSpace = (columnClassList, className) => {
        columnClassList.add(className);
        columnClassList.add("blocked");
    }
    const toggleFill = () => {
        if (fill === "fill1") {
            setFill("fill2");
            setPlayer("Red");
        } else {
            setFill("fill1");
            setPlayer("Yellow");
        }
        console.log(fill)
    }
    return (
        <div className="board">
                <div className="top-row">
                    <div onMouseOver={() => highlightDrop(0)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('one', 1)} className="top-columns "></div>
                    <div onMouseOver={() => highlightDrop(1)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('two', 2)} className="top-columns "></div>
                    <div onMouseOver={() => highlightDrop(2)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('three', 3)} className="top-columns"></div>
                    <div onMouseOver={() => highlightDrop(3)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('four', 4)} className="top-columns"></div>
                    <div onMouseOver={() => highlightDrop(4)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('five', 5)} className="top-columns"></div>
                    <div onMouseOver={() => highlightDrop(5)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('six', 6)} className="top-columns"></div>
                    <div onMouseOver={() => highlightDrop(6)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('seven', 7)} className="top-columns"></div>
                </div>
            <div className="mainBoard">
                <div onMouseOver={() => highlightDrop(0)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('one', 1)} className={`row`}>
                    <div className="column one first"></div>
                    <div className="column one second"></div>
                    <div className="column one third"></div>
                    <div className="column one fourth"></div>
                    <div className="column one fifth"></div>
                    <div className="column one sixth"></div>
                    <div className="column one bottom blocked">1</div>
                </div>
                <div onMouseOver={() => highlightDrop(1)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('two', 2)}className="row">
                    
                    <div className="column two first"></div>
                    <div className="column two second"></div>
                    <div className="column two third"></div>
                    <div className="column two fourth"></div>
                    <div className="column two fifth"></div>
                    <div className="column two sixth"></div>
                    <div className="column two bottom blocked">2</div>
                </div>
                <div onMouseOver={() => highlightDrop(2)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('three', 3)} className="row">
                    
                    <div className="column three first"></div>
                    <div className="column three second"></div>
                    <div className="column three third"></div>
                    <div className="column three fourth"></div>
                    <div className="column three fifth"></div>
                    <div className="column three sixth"></div>
                    <div className="column three bottom blocked">3</div>
                </div>
                <div onMouseOver={() => highlightDrop(3)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('four', 4)} className="row">
                    
                    <div className="column four first"></div>
                    <div className="column four second"></div>
                    <div className="column four third"></div>
                    <div className="column four fourth"></div>
                    <div className="column four fifth"></div>
                    <div className="column four sixth"></div>
                    <div className="column four bottom blocked">4</div>
                </div>
                <div onMouseOver={() => highlightDrop(4)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('five', 5)} className="row">
                    
                    <div className="column five first"></div>
                    <div className="column five second"></div>
                    <div className="column five third"></div>
                    <div className="column five fourth"></div>
                    <div className="column five fifth"></div>
                    <div className="column five sixth"></div>
                    <div className="column five bottom blocked">5</div>
                </div>
                <div onMouseOver={() => highlightDrop(5)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('six', 6)} className="row">
                    
                    <div className="column six first"></div>
                    <div className="column six second"></div>
                    <div className="column six third"></div>
                    <div className="column six fourth"></div>
                    <div className="column six fifth"></div>
                    <div className="column six sixth"></div>
                    <div className="column six bottom blocked">6</div>
                </div>
                <div onMouseOver={() => highlightDrop(6)} onMouseLeave={() => removeDrop()} onClick={() => columnClick('seven', 7)} className="row">
                    <div className="column seven first"></div>
                    <div className="column seven second"></div>
                    <div className="column seven third"></div>
                    <div className="column seven fourth"></div>
                    <div className="column seven fifth"></div>
                    <div className="column seven sixth"></div>
                    <div className="column seven bottom blocked">7</div>
                </div>
                
            </div>
            <h1 className={player === "Yellow" ? "yellow" : "red"}>{player} it's your turn!</h1>

        </div>
    )
 };

 export default GameBoard;
