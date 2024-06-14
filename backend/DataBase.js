const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// again this is not the right way to connect but now for a quick start we're using it
mongoose.connect("mongodb+srv://shailesh:d2Ps0UQEnEcmUUkM@cluster0.b5xkmr9.mongodb.net/todoApp");

const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const todo = mongoose.model("todo", todoSchema);

module.exports = { todo };