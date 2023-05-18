import express from "express";
import cors from "cors";
import Chance from "chance";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const chance = new Chance();

const animals = [...Array(500).keys()].map((id) => ({
        id,
        name: chance.name(),
        age: chance.age(),
        type: chance.animal()
}));


app.get("/", (req, res) => {

    const q =  req.query.q?.toLowerCase() || "";
    const results = animals.filter(animal => animal.type.toLowerCase().includes(q));

    res.send(results);
}); 

app.listen(8080, () => {
    console.log("listening on port http://localhost:8080");
})

