let balance = 1000;

function getRandomSymbol() {
    const symbols = ['🍒', '🍋', '🔔', '⭐', '7'];
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function calculateWinnings(slot1, slot2, slot3, bet) {
    // Minden szimbólum más értéket ér
    const symbolValues = {
        '🍒': 2,
        '🍋': 3,
        '🔔': 5,
        '⭐': 10,
        '7': 20
    };

    if (slot1 === slot2 && slot2 === slot3) {
        // Ha mindhárom szimbólum ugyanaz, akkor az érték a tét szorzatát adja vissza
        return bet * symbolValues[slot1];
    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
        // Ha két szimbólum egyezik, kisebb nyeremény
        return bet * 2;
    }
    return 0;  // Ha nincs találat, nincs nyeremény
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

    // Pörgetés előtt a tét levonása
    balance -= betAmount;

    const slot1 = getRandomSymbol();
    const slot2 = getRandomSymbol();
    const slot3 = getRandomSymbol();

    document.getElementById('slot1').textContent = slot1;
    document.getElementById('slot2').textContent = slot2;
    document.getElementById('slot3').textContent = slot3;

    const winnings = calculateWinnings(slot1, slot2, slot3, betAmount);
    balance += winnings;

    let message = '';
    if (winnings > 0) {
        message = `Jackpot! You won ${winnings} coins!`;
    } else {
        message = 'Try again!';
    }

    document.getElementById('balance').textContent = `Balance: ${balance} Kaszinó Coin`;
    document.getElementById('message').textContent = message;
}
