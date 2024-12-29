const {events} = require('../models/Event');

exports.createEvent = (req,res)=>{
    const {date,time,description} = req.body;
    const newEvent = {
        id: events.length+1,
        date,
        time,
        description,
        participants:[]
    };
    events.push(newEvent);
    res.status(201).json(newEvent);
};

exports.getEvents =(req,res) => res.json(events);


exports.updateEvent = (req,res) =>{
    const {id} = req.params;
    const event = events.find((e)=> e.id === parseInt(id));
    if(!event) return res.status(404).json({message: 'Event not found'});
    Object.assign(event,req.body);
    res.json(event);
};

exports.deleteEvent = (req,res) =>{
    const {id} = req.body;
    const index = events.findIndex((e)=> e.id === parseInt(id));
    if(index === -1) return res.status(404).json({message: 'Event not Found'});
    events.splice(index,1);
    res.status(204).send();
};

exports.registerForEvent = (req,res) =>{
    const {id} = req.params;
    const event = events.find((e)=>{
        e.id === parseInt(id)
    });
    if(!event) return res.status(404).json({message: 'Event not found'});

    event.participants.push(req.user.id);
    res.json({message: 'Registered Successfully',event})
};