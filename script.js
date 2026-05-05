const wordsList = ["CASAS", "PEDRA", "NORTE", "GRITO", "SAGAZ", "ÂMAGO", "TERMO", "NEGRO", "ÊXITO", "MEXER", "NOBRE", "SENSO", "AFETO", "ÉTICA", "ALGOZ", "PLENA", "FAZER", "ASSIM", "TÊNUE", "MÚTUA", "SOBRE", "AQUÉM", "VIGOR", "SEÇÃO", "PODER", "SUTIL", "PORÉM", "FOSSE", "SANAR", "CERNE", "IDEIA", "AUDAZ", "MORAL", "INATO", "QUIÇÁ", "DESDE", "MUITO", "JUSTO", "SONHO", "HONRA", "TORPE", "RAZÃO", "AMIGO", "ÍCONE", "FÚTIL", "ETNIA", "ÉGIDE", "ANEXO", "TANGE", "DENGO", "HAVER", "LAPSO", "ENTÃO", "EXPOR", "TEMPO", "BOÇAL", "SEARA", "HÁBIL", "MÚTUO", "SABER", "CASAL", "GRAÇA", "ÁVIDO", "ÓBICE", "ARDIL", "XIBIU", "DIZER", "PESAR", "ESTAR", "DEVER", "CAUSA", "SENDO", "TENAZ", "AINDA", "PÁRIA", "COSER", "BRADO", "CRIVO", "GENRO", "TEMOR", "POSSE", "COMUM", "ÁPICE", "PROLE", "ÂNIMO", "ASSAZ", "CEDER", "CORJA", "PAUTA", "DETÉM", "FUGAZ", "CENSO", "ÂNSIA", "CULTO", "DIGNO", "ATROZ", "MUNDO", "FORTE", "VULGO", "MESMO", "GLEBA", "VÍCIO", "SAÚDE", "CRIAR"];


let currentRow = 0;
let currentTile = 0;
let word = "";
let secretWord = "";

const messageElement = document.getElementById("message");

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();

  const rows = document.querySelectorAll(".row");
  const tiles = rows[currentRow].querySelectorAll(".tile");

  if (key.match(/^[A-Z]$/) && currentTile < 5) {
    tiles[currentTile].textContent = key;
    word += key;
    currentTile++;
  } else if (event.key === "Backspace" && currentTile > 0) {
    currentTile--;
    tiles[currentTile].textContent = "";
    word = word.slice(0, -1);
  } else if (event.key === "Enter" && currentTile === 5) {
    checkWord();
  }
});

function setSecretWord() {
  const randomIndex = Math.floor(Math.random() * wordsList.length);
  secretWord = wordsList[randomIndex];
  console.log("Palavra secreta:", secretWord); // debug
}

function checkWord() {
  const rows = document.querySelectorAll(".row");
  const tiles = rows[currentRow].querySelectorAll(".tile");

  const guess = word.toUpperCase();
  const secretLetters = secretWord.split("");
  const guessLetters = guess.split("");

  // Primeiro, marca as letras corretas (verde)
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === secretLetters[i]) {
      tiles[i].style.backgroundColor = "green";
      tiles[i].style.color = "white";
      secretLetters[i] = null;
      guessLetters[i] = null;
    }
  }

  // Depois, marca as letras na palavra mas fora do lugar (amarelo)
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i]) {
      const index = secretLetters.indexOf(guessLetters[i]);
      if (index !== -1) {
        tiles[i].style.backgroundColor = "gold";
        tiles[i].style.color = "white";
        secretLetters[index] = null;
      } else {
        tiles[i].style.backgroundColor = "lightgray";
        tiles[i].style.color = "white";
      }
    }
  }

  if (guess === secretWord) {
    messageElement.textContent = "🎉 Você acertou!";
    messageElement.style.color = "green";
  } else {
    if (currentRow === 5) {
      messageElement.textContent = `A palavra era: ${secretWord}. ❌ Você perdeu!`;
      messageElement.style.color = "red";
    } else {
      messageElement.textContent = "❌ Tente de novo!";
      messageElement.style.color = "red";
      currentRow++;
      currentTile = 0;
      word = "";
    }
  }
}

function restartGame() {
  currentRow = 0;
  currentTile = 0;
  word = "";

  const rows = document.querySelectorAll(".row");
  rows.forEach(row => {
    const tiles = row.querySelectorAll(".tile");
    tiles.forEach(tile => {
      tile.textContent = "";
      tile.style.backgroundColor = "white";
      tile.style.color = "black";
    });
  });

  setSecretWord();
  messageElement.textContent = "";
}

// Inicia o jogo
setSecretWord();
document.getElementById("restartBtn").addEventListener("click", restartGame);
