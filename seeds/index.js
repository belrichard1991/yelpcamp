const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open",() => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    try {
        await Campground.deleteMany({});
        for (let i =0; i <= 300; i++){
            const random1000 = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 50) + 10;
            const camp = new Campground({
                author: '65ce1737aa2a0112cf4ce562',
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)}, ${sample(places)}`,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat praesentium obcaecati possimus cum. Vel nobis possimus incidunt ducimus! Provident inventore voluptates repudiandae ullam voluptatibus quaerat alias enim vitae sit! Temporibus.',
                price: price,
                geometry: { 
                    type: 'Point',
                    coordinates: [ 
                        cities[random1000].longitude,
                        cities[random1000].latitude
                      ] 
                  },
                images: [
                    {
                      url: 'https://res.cloudinary.com/dmfs71j9j/image/upload/v1708531018/YelpCamp/qwxmhkvlxqcks5lgps4k.jpg',
                      filename: 'YelpCamp/qwxmhkvlxqcks5lgps4k', 
                    },
                    {
                      url: 'https://res.cloudinary.com/dmfs71j9j/image/upload/v1708531018/YelpCamp/aj20lakheo7q7aikjzqz.jpg',
                      filename: 'YelpCamp/aj20lakheo7q7aikjzqz',
                    },
                    {
                      url: 'https://res.cloudinary.com/dmfs71j9j/image/upload/v1708531018/YelpCamp/pl1qeoaxsicaangmxu0i.jpg',
                      filename: 'YelpCamp/pl1qeoaxsicaangmxu0i',
                    }
                  ]
            })
            await camp.save();
        }
    } catch(e){
        console.log(e)
    }
}

seedDB().then(() => {
mongoose.connection.close();
});