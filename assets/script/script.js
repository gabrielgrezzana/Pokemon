let page = 0;
async function getPokemons(){
    const resp = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=${pages}&limit=350");
    const data = await resp.json();
    // console.log(data)
    
    data.results.forEach(async function(item){
        const respPoke = await fetch(item.url);
        const dataPoke = await respPoke.json();
        // console.log(dataPoke);

    const discrição = await fetch(dataPoke.species.url);
    const discriçãoAcessando = await discrição.json();
        // console.log(discrição)

        let text = "";

        for(let n =0; n <= 200;n++){
            if(discriçãoAcessando.flavor_text_entries[n].language.name === "en"){
                text = discriçãoAcessando.flavor_text_entries[n].flavor_text.replace(
                    "",
                    ""
                );
                break;
            }
        }

        const types1 = dataPoke.types[0].type.name;
        let types2 = "";
        try{
            types2 = dataPoke.types[1].type.name;
        } catch (a) {
            types2 = "";
        }

        document.querySelector('#tabela').insertAdjacentHTML('beforeend',
`
    <div class="cards">
        <div>
         <img class="image-pokemon" src="${dataPoke.sprites.other["official-artwork"].front_default} ">
         </div>
    
        <div id="separando">

        <h2 class="name-pokemon">${dataPoke.name} </h2>
        <h4 class="number-pokemon">N°: ${dataPoke.id} </h4>
        <div id=""type-style">
        <h4 class="type-pokemon">${types1}</h4>
        <h4 class="type-pokemon">${types2}</h4>
        </div>
        <h4 class="descricao-pokemon">Descrição</h4>
        <p class="text">${text} </p>
        </div>
    </div>
`
    );

    });
}

getPokemons(); 