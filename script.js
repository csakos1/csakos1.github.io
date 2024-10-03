let balance = 1000;
let jackpot = 1000;

const symbols = ['🍒', '🍋', '🔔', '⭐', '7'];

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function calculateWinnings(slot1, slot2, slot3, bet) {
    const symbolValues = {
        '🍒': 2,
        '🍋': 3,
        '🔔': 5,
        '⭐': 10,
        '7': 20
    };

    if (slot1 === '7' && slot2 === '7' && slot3 === '7') {
        const jackpotWinnings = jackpot;
        jackpot = 1000;
        return jackpotWinnings;
    } else if (slot1 === slot2 && slot2 === slot3) {
        return bet * symbolValues[slot1];
    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
        return bet * 2;
    }
    return 0;
}

function spinAnimation(slot, newSymbol) {
    const slotInner = document.getElementById(slot);
    slotInner.style.transform = 'translateY(100%)';
    setTimeout(() => {
        slotInner.textContent = newSymbol;
        slotInner.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            slotInner.style.transform = 'translateY(0)';
        }, 200);
    }, 300);
}

function play() {
    const betAmount = parseInt(document.getElementById('betAmount').value);

    if (balance <= 0) {
        document.getElementById('message').textContent = 'Out of coins! Reload the page to play again.';
        return;
    }

    if (betAmount > balance) {
        document.getElementById('message').textContent = 'Not enough coins for this bet!';
        return;
    }

    balance -= betAmount;
    jackpot += betAmount * 0.1;
    document.getElementById('jackpot').textContent = `Jackpot: ${Math.floor(jackpot)} Kaszinó Coin`;

    const slot1Symbol = getRandomSymbol();
    const slot2Symbol = getRandomSymbol();
    const slot3Symbol = getRandomSymbol();

    spinAnimation('slot1', slot1Symbol);
    spinAnimation('slot2', slot2Symbol);
    spinAnimation('slot3', slot3Symbol);

    setTimeout(() => {
        const winnings = calculateWinnings(slot1Symbol, slot2Symbol, slot3Symbol, betAmount);
        balance += winnings;

        let message = '';
        if (winnings > 0) {
            message = `Jackpot! You won ${winnings} coins!`;
        } else {
            message = 'Try again!';
        }

        document.getElementById('balance').textContent = `Balance: ${balance} Kaszinó Coin`;
        document.getElementById('message').textContent = message;
    }, 1000); 
}