const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const statuspark = [
    { id: 1, statusparkplate: 'Available', slot:'Slot A1', status: 0 },
    { id: 2, statusparkplate: 'Available', slot:'Slot A2', status: 0 },
    { id: 3, statusparkplate: 'Available', slot:'Slot C1', status: 0 },
    { id: 4, statusparkplate: 'Car1', slot:'Slot C2', status: 1 },
    { id: 5, statusparkplate: 'Car2', slot:'Slot D1', status: 1 }
];

app.get('/', (req, res) => {
    res.send('Hello World for Telkom test!!!');
});

app.get('/api/statuspark', (req, res) => {
  res.send(statuspark);
});


app.get('/api/statuspark/:id', (req, res) => {
   const car = statuspark.find((c => c.id === parseInt(req.params.id)), (o => o.statusparkplate === 'Available' ) );
    if (!car) return res.status(404).send('The car with the given ID was not found.');
    res.send(car);
});

app.post('/api/statuspark', (req, res) =>{
    const { error } = validatecar(req.body);
   
    if (error) return res.status(400).send(error.details[0].message);
    
    const car = {
        id: statuspark.length + 1,
        name: req.body.name
    };
    statuspark.push(car);
    res.send(car);
});

app.put('/api/statuspark/:id', (req, res) => {
    const car = statuspark.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send('The car with the given ID was not found.');
    
    const { error } = validatecar(req.body);
   
    if (error) return res.status(400).send(error.details[0].message);
  

    car.slot = req.body.slot;
    car.statusparkplate = req.body.statusparkplate;
    res.send(car);
    
});

function validatecar(car){
    const schema ={
   
        statusparkplate: Joi.string().min(3).required(),
        slot: Joi.string().min(3).required()
        
    };

    return Joi.validate(car, schema);
}

app.delete('/api/statuspark/:id', (req, res) => {
    const car = statuspark.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send('The car with the given ID was not found.');

    const index = statuspark.indexOf(car);
    statuspark.splice(index, 1);

    res.send(car);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ',port,'...'));
