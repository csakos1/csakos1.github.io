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
    slotInner.style.transition = 'none';
    slotInner.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        slotInner.style.transition = 'transform 0.5s ease-out';
        slotInner.style.transform = 'translateY(0)';
        setTimeout(() => {
            slotInner.textContent = newSymbol;
        }, 500);
    }, 50);
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
    jackpot += betAmount;

    const slot1Result = getRandomSymbol();
    const slot2Result = getRandomSymbol();
    const slot3Result = getRandomSymbol();

    spinAnimation('slot1', slot1Result);
    spinAnimation('slot2', slot2Result);
    spinAnimation('slot3', slot3Result);

    setTimeout(() => {
        const winnings = calculateWinnings(slot1Result, slot2Result, slot3Result, betAmount);
        balance += winnings;

        document.getElementById('balance').textContent = `Balance: ${balance} Kurva Coin`;
        document.getElementById('jackpot').textContent = `Jackpot: ${jackpot} Kurva Coin`;

        if (winnings > 0) {
            document.getElementById('message').textContent = `You won ${winnings} Kurva Coin!`;
        } else {
            document.getElementById('message').textContent = 'No win this time. Try again!';
        }
    }, 600);  // Várunk, amíg az animáció befejeződik
}

