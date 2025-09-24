document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search").addEventListener("submit", (event) => {
        event.preventDefault();

        const search = document.getElementById("poke").value;
        mostrarPokemon(search);
    })
})


async function mostrarPokemon(nome) {
    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`);

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado!");
        }

        const data = await resposta.json();
        const statsHtml = formatarStats(data.stats);


        document.getElementById("infos").innerHTML = `
            Nome: ${formatarNome(data.name)}<br>
            Altura: ${data.height}<br>
            Peso: ${data.weight}<br>
            Stats: <br> ${statsHtml}`;

        document.getElementById("sprite-front").src = data.sprites.front_default;
        document.getElementById("sprite-front-shiny").src = data.sprites.front_shiny;
    } catch (erro) {
        document.getElementById("infos").innerHTML = `<span style="color:red">${erro.message}</span>`;
        document.getElementById("sprite-front").src = "";
        document.getElementById("sprite-front-shiny").src = "";
    }
}

function formatarNome(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function formatarStats(stats) {
    return stats
        .map(s => `${formatarNomeStats(s.stat.name)}: ${s.base_stat}`)
        .join("<br>");
}

function formatarNomeStats(nome) {
    return nome
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}