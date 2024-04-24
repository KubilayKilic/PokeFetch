//Enter tuşuna basıldığında fetchData fonksiyonunu çalıştıran kod;

document
  .getElementById("pokemonName")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      fetchData();
    }
  });

//fetchData fonksiyonu

async function fetchData() {
  try {
    //Input'a yazılan pokemon adının değerini küçük harfe dönüştürür.
    const pokemonName = document
      .getElementById("pokemonName")
      .value.toLowerCase();

    //işin tamamlanmasını bekler ve sadece tamamlandığındasonuç döndürür. AWAIT
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    //response içerisinde  ok: true, status: 200 gibi değerler de döndüğü için
    if (!response.ok) {
      throw new Error("Fetch işlemi başarısız oldu.");
    }

    // response'I Json'a dönüştürür ve bunun içerisinde abilities vs pokemonla ilgili bilgiler mevcuttur.
    const data = await response.json();

    //types'ın bulunduğu arrayi bir sabite atar
    const typesArray = data.types;

    //Sprite'ın github linkini döndürür.
    const pokemonSprite = data.sprites.front_default;

    const imageElement = document.getElementById("pokemonSprite");

    //Img elementine bu linki source olarak atar ve display niteliğinin görünür kılar.
    imageElement.src = pokemonSprite;
    imageElement.style.display = "block";

    //fetch edilen pokemon adını, ilgili figcaption'a büyük harflerle yazar.
    const fetchedPokemonName = document.getElementById("fetchedPokemonName");
    fetchedPokemonName.innerHTML = `${pokemonName}`.toUpperCase();

    //Pokemonların typelarını ekrana yazdıran kod;
    if (typesArray && typesArray.length > 0) {
      //div elementinin içini resetler.
      document.getElementById("pokemonType").innerHTML = "";
      //$('#pokemonType').text('') gibi

      typesArray.forEach((typeObj) => {
        //console.log(typeObj.type.name) type'ın gelip gelmediğini konsolda kontrol etmek için.

        //Type veya typeları p elementi olarak div'e eklemek.
        const addP = document.createElement("p");
        addP.textContent = typeObj.type.name;
        addP.id = typeObj.type.name.toLowerCase().replace(" ", "-"); //boşluk varsa onu tire - ile değiştirir.

        const typesContainer = document.getElementById("pokemonType");
        typesContainer.appendChild(addP);
      });
    } else {
      console.log("Bu pokemonun herhangi bir type bilgisi yoktur.");
    }
  } catch (error) {
    console.error(error);
  }
}
