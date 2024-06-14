const zod = require("zod");

// zod schema

const createTodo = zod.object({
    task: zod.string(),
    description: zod.string(),
});
const updateTodo = zod.object({
    id: zod.string(),
})

module.exports = { 
    createTodo, 
    updateTodo 
};