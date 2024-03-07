// Função principal para jogar pedra, papel e tesoura
function jogarJokenpo() {
  let jogarNovamente;

  do {
    let pontuacao = 0;

    do {
      // Loop para uma única rodada do jogo
      const jogadaUsuario = parseInt(
        prompt("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura")
      );

      // Verifica se a jogada é inválida
      if (jogadaUsuario < 1 || jogadaUsuario > 3 || isNaN(jogadaUsuario)) {
        console.log("Jogada Inválida.\nFim de Jogo!");
        break;
      }

      const jogadaComputador = Math.floor(Math.random() * 3) + 1;

      // Exibe a jogada do computador
      switch (jogadaComputador) {
        case 1:
          console.log("O computador jogou Papel");
          break;
        case 2:
          console.log("O computador jogou Pedra");
          break;
        case 3:
          console.log("O computador jogou Tesoura");
          break;
      }

      // Verifica o resultado da rodada
      if (jogadaUsuario === jogadaComputador) {
        console.log("A rodada empatou!");
      } else if (
        (jogadaUsuario === 1 && jogadaComputador === 2) ||
        (jogadaUsuario === 2 && jogadaComputador === 3) ||
        (jogadaUsuario === 3 && jogadaComputador === 1)
      ) {
        pontuacao++;
        console.log("Você ganhou!");
      } else {
        console.log(`Você perdeu! A sua pontuação foi de ${pontuacao}`);
        break;
      }
    } while (true);

    // Pergunta ao usuário se deseja jogar novamente
    do {
      jogarNovamente = prompt("Deseja jogar de novo? (s/n)").toLowerCase();
      if (jogarNovamente !== "s" && jogarNovamente !== "n") {
        console.log("Por favor, responda 's' para sim e 'n' para não!");
      }
    } while (jogarNovamente !== "s" && jogarNovamente !== "n");
  } while (jogarNovamente === "s");
}

// Chama a função para iniciar o jogo
jogarJokenpo();
