const express = require('express');
const app = express();

app.use(express.json());

let restaurants = [
    {
        id: 1,
        name: "Pizzeria"
    },
    {
        id: 2,
        name: "Sushi restaurant"
    }
]

app.get('/', (req,resp) => {
    resp.send("Hello world!");
});

app.get('/restaurants', (req, resp) => {
    resp.send(restaurants);
})

app.get('/restaurants/:id', (req, resp) => {
    const id = parseInt(req.params.id);
    const restaurant = restaurants.find(r => r.id === id);
    if(!restaurant) resp.status(400).send('This restaurant doesn\'t exist');
    resp.send(restaurant);
})

app.post('/restaurants', (req,resp) => {
    if(!req.body.name || req.body.name.length < 3){
        resp.status(400).send('The name is required and it should be at least 3 characters long!');
        return;
    }
    const restaurant = {
        id: restaurants.length + 1,
        name: req.body.name
    }
    restaurants.push(restaurant);
    resp.send(restaurant);
});

app.delete('/restaurants/:id', (req, resp) => {
    const id = parseInt(req.params.id);
    const restaurant = restaurants.find(r => r.id === id);
    if(!restaurant) resp.status(400).send('This restaurant doesn\'t exist');

    const index = restaurants.indexOf(restaurant);
    restaurants.splice(index, 1);

    resp.send(restaurant);
});

app.put('/restaurants/:id', (req, resp) => {
    if(!req.body.name || req.body.name.length < 3){
        resp.status(400).send('The name is required and it should be at least 3 characters long!');
        return;
    }
    const id = parseInt(req.params.id);
    const restaurant = restaurants.find(r => r.id === id);
    if(!restaurant) resp.status(400).send('This restaurant doesn\'t exist');

    const index = restaurants.indexOf(restaurant);
    restaurants[index].name = req.body.name;
    resp.send(restaurant);
});

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}...`));