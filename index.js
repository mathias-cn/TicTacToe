const popUp = document.querySelector('.startPopUp')
const startBtn = document.querySelector('.startBtn')
let player1
let player2
let currentPlayerInput = document.querySelector('#currentPlayer')
let turnTime

startBtn.addEventListener('click', () => {
    player1 = document.querySelector('#player1').value
    player2 = document.querySelector('#player2').value

    let errorTxt = document.querySelector('.errorTxt')
    if (player1 == '' || player2 == '') {
        errorTxt.innerText = 'Fill both names'
    } else if (player1 == player2) {
        errorTxt.innerText = 'Both names are the same'
    } else {
        if (Math.random() <= 0.5) {
            currentPlayerInput.value = `Turn: ${player1}`
            currentPlayerInput.dataset.current = 'player1'
            turnTime = 1
        } else {
            currentPlayerInput.value = `Turn: ${player2}`
            currentPlayerInput.dataset.current = 'player2'
            turnTime = 2
        }
        popUp.style.display = 'none'
    }
})

document.querySelectorAll('.ticTacSingleBtn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let button = e.currentTarget
        if (turnTime == 1) {
            button.innerText = 'X'
            button.dataset.picked = '1'
            currentPlayerInput.value = `Turn: ${player2}`
            turnTime = 2
            checkWin('1')
            checkDraw()
        } else {
            button.innerText = 'O'
            button.dataset.picked = '2'
            currentPlayerInput.value = `Turn: ${player1}`
            turnTime = 1
            checkWin('2')
            checkDraw()
        }
    })
})



function checkWin(player) {
    let winPositions = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1', '5', '9'],
        ['3', '5', '7']
    ]
    let picked = Array.from(document.querySelectorAll(`.ticTacSingleBtn[data-picked="${player}"]`))
    let pickedId = []

    picked.forEach((item) => {
        pickedId.push(item.dataset.index)
    })
    winPositions.forEach((position) => {
        let name
        if (position.every((pos) => pickedId.includes(pos))) {
            if (player == '1') {
                name = player1
            } else {
                name = player2
            }
            position.forEach((winPos) => {
                let btn = document.querySelector(`.ticTacSingleBtn[data-index="${winPos}"]`)
                btn.classList.add('winnerTicTac')
            })
            currentPlayerInput.value = `Winner: ${name}`
            setTimeout(() => {
                let playAgainPopUp = document.querySelector('.playAgainPopUp')
                let winnerPopUpName = document.querySelector('.winnerName')
                winnerPopUpName.innerText = `Winner: ${name}`
                playAgainPopUp.style.display = 'flex'
                playAgainPopUp.classList.add('scaleInAnim')

                let playAgainBtn = document.querySelector('.playAgainBtn')
                playAgainBtn.addEventListener('click', reset)
            }, 2000)
            return
        }
    })
}
function checkDraw() {
    if (Array.from(document.querySelectorAll(`[data-picked="none"]`)).length == 0) {
        if (document.querySelectorAll('.winnerTicTac').length == 0) {
            document.querySelectorAll('.ticTacSingleBtn').forEach((btn) => {
                btn.classList.add('drawTicTac')
            })
            currentPlayerInput.value = `It's a draw!`
            setTimeout(() => {
                let playAgainPopUp = document.querySelector('.playAgainPopUp')
                let winnerPopUpName = document.querySelector('.winnerName')
                winnerPopUpName.innerText = `It's a draw!`
                playAgainPopUp.style.display = 'flex'
                playAgainPopUp.classList.add('scaleInAnim')
    
                let playAgainBtn = document.querySelector('.playAgainBtn')
                playAgainBtn.addEventListener('click', reset)
            }, 2000)
        }
    }
}

function reset() {
    document.querySelector('.currentPlayer').value = ''
    document.querySelector('#player1').value = ''
    document.querySelector('#player2').value = ''
    document.querySelector('.errorTxt').innerText = ''
    let ticTacBtns = Array.from(document.querySelectorAll('[data-picked]'))
    ticTacBtns.forEach((btn) => {
        btn.dataset.picked = 'none'
        btn.innerText = ''
        if (btn.classList.contains('winnerTicTac')) {
            btn.classList.remove('winnerTicTac')
            btn.classList.remove('drawTicTac')
        } else if (btn.classList.contains('drawTicTac')) {
            btn.classList.remove('drawTicTac')
        }
    })
    document.querySelector('.playAgainPopUp').classList.remove('.scaleInAnim')
    document.querySelector('.playAgainPopUp').style.display = 'none'
    popUp.style.display = 'flex'
}