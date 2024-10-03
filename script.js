let balance = 1000;
let jackpot = 1000;  // Kezdő jackpot érték

function getRandomSymbol() {
    const symbols = ['🍒', '🍋', '🔔', '⭐', '7'];
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
        // Jackpot nyeremény három 7-esnél
        const jackpotWinnings = jackpot;
        jackpot = 1000;  // Visszaállítjuk a jackpotot
        return jackpotWinnings;
    } else if (slot1 === slot2 && slot2 === slot3) {
        return bet * symbolValues[slot1];
    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
        return bet * 2;
    }
    return 0;
}

function spinAnimation() {
    document.getElementById('slot1').classList.add('spin');
    document.getElementById('slot2').classList.add('spin');
    document.getElementById('slot3').classList.add('spin');

    setTimeout(() => {
        document.getElementById('slot1').classList.remove('spin');
        document.getElementById('slot2').classList.remove('spin');
        document.getElementById('slot3').classList.remove('spin');
    }, 1000); // Az animáció 1 másodpercig tart
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

    // Pörgetés előtt a tét levonása a megfelelő összeggel
    balance -= betAmount;
    jackpot += betAmount * 0.1;  // A tét 10%-a a jackpotba kerül
    document.getElementById('jackpot').textContent = `Jackpot: ${Math.floor(jackpot)} Kaszinó Coin`;

    spinAnimation();  // Slot mezők animálása

    // 1 másodperc késleltetés, hogy a pörgetés animáció után jelenjenek meg az eredmények
    setTimeout(() => {
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
    }, 1000);  // A pörgetés után 1 másodperccel jelenik meg az eredmény
}