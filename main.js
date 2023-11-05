const bg = document.querySelector(".background")
const wrap = document.querySelector(".wrap")

const settings = {
    'xPath' : './images/X.png',
    'fPath' : './images/F.png',
    'countSquares' : 9,
    'flag' : false,
    'store' : [],
    "winX": [],
    'winF': [],
    'once' : true,
    'winComb' : [
        [1,2,3],
        [1,5,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [3,5,7],
        [4,5,6],
        [7,8,9]
    ]
}

const createElement = (tag,classElem,append) =>{
    const element = document.createElement(tag)
    element.classList.add(classElem)
    append.append(element)
}

const startGame = () => {
    for(let i = 0; i < settings.countSquares; i++){
        createElement('div','square',wrap)
    }

    createElement('span','turn-text',bg)
    createElement('span','win-text',bg)
    createElement('button','restart-button',bg)
}

startGame()

const winner = () =>{
    const winText = document.querySelector(".win-text")
    const x = settings.winX
    const f = settings.winF
    if (settings.countSquares === 0){
        winText.innerHTML = "It's a draw..."
    }
    
    for(let i = 0; i < settings.winComb.length; i++){
        let win = settings.winComb[i]

        if(x.includes(win[0]) && x.includes(win[1]) && x.includes(win[2])){
            winText.innerHTML = 'Twitter`s winning the game!'
        } else if (f.includes(win[0]) && f.includes(win[1]) && f.includes(win[2])){
            winText.innerHTML = 'Filet-O-Fish`s Winning the game!!'
        }
    }

}

const playerTurn = (player,flagP,img) => {
    img.setAttribute('src',player)
    settings.flag = flagP
}

const square = document.querySelectorAll(".square")

square.forEach((elem,index) => {
    elem.addEventListener('click', function (e)  {
        const check = elem.classList.contains(".square")
    const img = document.createElement('img')
    
    if(!check){
        settings.store[index] = settings.flag

        if(!settings.flag){
            playerTurn(settings.xPath,true,img)
            settings.winX.push(index + 1)
        } else {
            playerTurn(settings.fPath,false,img)
            settings.winF.push(index + 1)
        }
        
        elem.append(img)
        settings.countSquares -= 1
        winner()
    }
    }, { 'once': settings.once })
})


const restart = document.querySelector('.restart-button')
restart.innerHTML = 'Restart'
restart.addEventListener('click', (e) => {
    window.location.reload()
})
