let balance = 1000;

function getRandomSymbol() {
    const symbols = ['🍒', '🍋', '🔔', '⭐', '7'];
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function play() {
    if (balance <= 0) {
        document.getElementById('message').textContent = 'Out of coins! Reload the page to play again.';
        return;
    }

    const slot1 = getRandomSymbol();
    const slot2 = getRandomSymbol();
    const slot3 = getRandomSymbol();

    document.getElementById('slot1').textContent = slot1;
    document.getElementById('slot2').textContent = slot2;
    document.getElementById('slot3').textContent = slot3;

    balance -= 10;  // Minden játék 10 Kaszinó Coin-ba kerül
    let message = '';

    if (slot1 === slot2 && slot2 === slot3) {
        balance += 50;  // Nyeremény: 50 Kaszinó Coin
        message = 'Jackpot! You won 50 coins!';
    } else {
        message = 'Try again!';
    }

    document.getElementById('balance').textContent = `Balance: ${balance} Kaszinó Coin`;
    document.getElementById('message').textContent = message;
}
