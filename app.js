document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector('.grid');
    const width=8;
    const squares=[]
    const scoreDisplay=document.querySelector('#score');
    const candyColor=[
        'url(Images/blue-candy.png)'
        ,'url(Images/green-candy.png)'
        ,'url(Images/orange-candy.png)'
        ,'url(Images/purple-candy.png)'
        ,'url(Images/red-candy.png)'
        ,'url(Images/yellow-candy.png)'
    ]
    //create board
    function createBoard(){
        for(let i=0; i<width*width; i++){
            const square=document.createElement('div');
            square.setAttribute('draggable',true);
            square.setAttribute('id',i);
            let randomColor=Math.floor(Math.random()*candyColor.length);
            square.style.backgroundImage=candyColor[randomColor];
            grid.appendChild(square);
            squares.push(square)
        }
    }
    createBoard();

    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced
    let score=0
    //drag the candies
    squares.forEach(square=>square.addEventListener('dragstart',dragstart))
    squares.forEach(square=>square.addEventListener('dragend',dragend))
    squares.forEach(square=>square.addEventListener('dragover',dragover))
    squares.forEach(square=>square.addEventListener('dragenter',dragenter))
    squares.forEach(square=>square.addEventListener('dragleave',dragleave))
    squares.forEach(square=>square.addEventListener('drop',dragdrop))

    function dragstart(){
        colorBeingDragged=this.style.backgroundImage
        console.log("drahstart:",this.id)
    }
    function dragend(e){

        let validMoves=[
            squareIdBeingDragged-1,
            squareIdBeingDragged -width,
            squareIdBeingDragged +1,
            squareIdBeingDragged +width,
        ]
        let validMove=validMoves.includes(squareIdBeingReplaced)
        if(squareIdBeingReplaced && validMove){
            squareIdBeingReplaced=null
        }else if(squareIdBeingReplaced && !validMove){
            squares[squareIdBeingReplaced].style.backgroundImage=colorBeingReplaced
            squares[squareIdBeingReplaced].style.backgroundImage=colorBeingDragged
        }else{
            squares[squareIdBeingDragged].style.backgroundImage=colorBeingDragged
        }
    }

    //move down
    function moveDown(){
        for(let i=0; i<55; i++){
            if(squares[i+width].style.backgroundImage===''){
                squares[i+width].style.backgroundImage=squares[i].style.backgroundImage
                squares[i].style.backgroundImage=''
                const fistRow=[1,2,3,4,5,6,7];
                const isFistRow=fistRow.includes(i);
                if(isFistRow && squares[i].style.backgroundImage===''){
                    let randomColor=Math.floor(Math.random()*candyColor.length)
                    squares[i].style.backgroundImage=candyColor[randomColor]
                }
            }

        }
    }
    //checking for match
    //check for row of three
    function checkForRowThree(){
        for(let i=0; i<61; i++){
            let rowOfThree=[i,i+1,i+2];
            let decidedColor=squares[i].style.backgroundImage
            const isBlank=squares[i].style.backgroundImage ===''
            const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55]
            if(notValid.includes(i)) continue
            if(rowOfThree.every(index=> squares[index].style.backgroundImage===decidedColor && !isBlank))
                rowOfThree.forEach(index=>{
                    score+=3
                    scoreDisplay.innerHTML=score

                    squares[index].style.backgroundImage=''
                })
        }
    }
    checkForRowThree()
    //check for row of four
    function checkForRowFour(){
        for(let i=0; i<60; i++){
            let rowOfFour=[i,i+1,i+2,i+4];
            let decidedColor=squares[i].style.backgroundImage
            const isBlank=squares[i].style.backgroundImage ===''
            const notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
            if(notValid.includes(i)) continue
            if(rowOfFour.every(index=> squares[index].style.backgroundImage===decidedColor && !isBlank))
                rowOfFour.forEach(index=>{
                    score+=4
                    scoreDisplay.innerHTML=score

                    squares[index].style.backgroundImage=''
                })
        }
    }
    checkForRowFour()
// check for column of three
    function checkColumnThree(){
        for(let i=0; i<47; i++){
            let columnOfThree=[i,i+width,i+width*2];
            let decidedColor=squares[i].style.backgroundImage
            const isBlank=squares[i].style.backgroundImage ===''
            if(columnOfThree.every(index=> squares[index].style.backgroundImage===decidedColor && !isBlank))
                columnOfThree.forEach(index=>{
                    score+=3
                    scoreDisplay.innerHTML=score

                    squares[index].style.backgroundImage=''
                })
        }
    }
    checkColumnThree()
    function checkColumnFour(){
        for(let i=0; i<47; i++){
            let columnOfFour=[i,i+width,i+width*2,i+width*3];
            let decidedColor=squares[i].style.backgroundImage
            const isBlank=squares[i].style.backgroundImage ===''
            if(columnOfFour.every(index=> squares[index].style.backgroundImage===decidedColor && !isBlank))
                columnOfFour.forEach(index=>{
                    score+=4
                    scoreDisplay.innerHTML=score
                    squares[index].style.backgroundImage=''
                })
        }
    }
    checkColumnFour()

    window.setInterval(function (){
        checkForRowThree()
        checkColumnThree()
        checkForRowFour()
        moveDown()
        checkColumnFour(),100
    })
    function dragover(e){
        e.preventDefault();
        console.log("dragover:",this.id)

    }
    function dragenter(){
        console.log("dragenter:",this.id)

    }
    function dragleave(){
        console.log("dragleave:",this.id)

    }
    function dragdrop(){
        console.log("dragdrop:",this.id)
        colorBeingReplaced=this.style.backgroundImage
        squareIdBeingReplaced=parseInt(this.id)
        this.style.backgroundImage=colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage=colorBeingReplaced
    }
})