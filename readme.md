<div class="container">
<div class="indicador"> CALLBACK - PROMISE - ASYNC-AWAIT </div>

#### Vamos a usar este ejemplo:

```javascript
const posts = [
  {
    userId: 1,
    id: 1,
    title:
      "Titulo 1",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "Titulo 2",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "Titulo 3",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
];
```


## CALLBACK

```Javascript
const findPostById = (id, callback) => {
  const post = posts.find((item) => item.id === id);

  if (post) {
    callback(null, post);
  } else {
    // es la respuesta negativa que se va a NULL
    callback(`el post de id ${id} no existe`);
  }
};

findPostById(0, (error, post) => {
  if (error) {
    console.log(error);
  } else {
    // Desde aquí empieza el **INFIERNO DE LOS CALLBACKS**
    // Para SOLUCIONAR ESTO se crearon las **PROMESAS**
    console.log(post);

    findPostById(3, (error, post) => {
      if (error) console.log(error);
      console.log(post);

      findPostById(6, (error, post) => {
        if (error) console.log(error);
        console.log(post);
      });
    });
  }
}); 
```
<blockquote class="warning">Cabe resaltar que el <b>Infierno del callback</b> se da unicamente cuando se quiere manejar un <i>POSIBLE ERROR</i></blockquote>


## PROMESAS

```javascript
const findPostById = (id) => {
  const post = posts.find((item) => item.id === id);

  return new Promise((respuesta, error) => {
    if (post) {
      respuesta(post);
    } else {
      error("no se ha encontrado el post de id " + id);
    }
  });
};

findPostById(1)
  // .then me devuele la RESPUESTA POSITIVA
  .then((post) => {
    console.log(post);
    return findPostById(2);
  })
  .then((post) => {
    console.log(post);
    return findPostById(3);
  })
  .then((post) => {
    console.log(post);
    return findPostById(4);
  })
  // .catch sirve para MANEJAR ERRORES, devuelve el erro("no se ha...")
  .catch((error) => console.log(error))
  // .finally sirve para
  .finally(console.log("Aquí termina el proceso"));
```
>  TAMBIEN existe el **EL INFIERNO DE LAS PROMESAS* pero esto se genera cuando queremos retornar más de un elemento a la vez.

<blockquote class="sky">LO BUENO DEL **INFIERNO DE LAS PROMESAS**, es que <i>el error se debe colocar una sola vez</i></blockquote>

<blockquote class="warning">EL PROBLEMA CON LAS PROMESAS</blockquote>

Si una orden tarda demsiado en responder a JS no le importa porque seguira ejecutandose con las demás ordenes que les demos, Ejemplo

- orden1 (tarda 1 min en ejecutarse)
- orden2 (tarda 4 min en ejecutarse)
- orden3 (tarda 5 min en ejecutarse)
- orden4 (tarda 3 seg en ejecutarse)

 EL ORDEN EN EL QUE NOS VA A MOSTRAR LOS RESULTADOS ES:

- orden4
- orden1
- orden2
- orden3

> Para SOLUCIONAR ESTO, se creó el ASYNC AWAIT

## ASYNC AWAIT

```javascript
const findPostById = (id) => {
  return new Promise((respuesta, error) => {
    // SIMULADOR DE TIEMPO DE CARGA/ESPERA
    setTimeout(() => {
      const post = posts.find((item) => item.id === id);
      if (post) {
        respuesta(post);
      } else {
        error("no se ha encontrado el post de id " + id);
      }
    }, 3000);
  });
};

// El ASYNC es para crear una funcion ASINCRONA
const search = async (id) => {
  try {
    // AWAIT solo se APLICA A PROMESAS
    const post = await findPostById(id);
    console.log(post);
    console.log("me imprimo despues de la promesa");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("se ejecuta independiente");
  }
};
```
> NOTA: Si queremos poner multiples ESPERAS DE PROMESAS, el tiempo va a contar por cada promesa esperada, es decir, si la promesa tarda 5 segundos y pongo 10 promesas el tiempo que va a tardar en responer seria 5 s * 10 = 50 s


```javascript
const search2 = async () => {
  try {
    const postUno = await findPostByIdSimulation(1);
    const postDos = await findPostByIdSimulation(2);
    console.log(postUno, postDos);
    console.log("me imprimo despues de la promesa 2");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("se ejecuta independiente");
  }
};
search2();

// Para solucionar esto se creó **PROMISE.ALL([array_de_promesas])**,
// si ponemos de ejemplo el caso anterior la promesa tarda 5s y pongo 10
// aquí solo demorara el tiempo de una promesa, perooo
const search3 = async () => {
  try {
    const postss = await Promise.all([
      findPostByIdSimulation(1),
      findPostByIdSimulation(2),
    ]);
    console.log(postss);
    console.log("me imprimo despues de la promesa 3");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("se ejecuta independiente");
  }
};
search3();
```

<blockquote class="warning"> CUIDADO:<br> Si usamos PROMISE.ALL, si una sola de las promesas dentro del array <i>Tiene un ERROR</i>, entonces no se ejecutará NADA, dara un error</blockquote>


</div>   
</div>


<div class="container">
<div class="indicador"> FETCH </div>

## FETCH

Fetch devuelve una funcion asincrona por lo que podemos usar `async await`

Estructura básica para consumir una API-FETCH

```javascript
const url = "https://www.google.com"
fetch(url)
    .then(respuesta => respuesta.json()) //Transformar a JSON
    .then(data => console.log(data));// Usar la data
```

Cuando hacemos una petición con fetch, vamos a obtener siempre una respuesta, incluso si da un error.

Con fetch hacemos peticiones HTTP por lo que tendremos una de estas opciones:

- Respuestas informativas _(100-199)_
- Respuestas satisfactorias _(200-299)_
- Redirecciones _(300-399)_
- Errores de los clientes _(400-499)_
- Errores de los servidores _(500-599)_ // ERRORES GRAVES

</div>   
</div>



```javascript
```
RECURSOS
<blockquote class="warning">NotasImportantes</blockquote>
<blockquote class="sky">NotasImportantes</blockquote>
<h3 class="center subtitulo"> SUBTITUTLO🧠 </h3>
<span class="subtitulo">hola</span>


<div class="container">
<div class="indicador"> UNIT 1: SIMPLE PAST </div>


</div>   
</div>