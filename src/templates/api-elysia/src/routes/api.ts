import { Elysia, t } from 'elysia';

// Define a simple schema for a todo item
const todoSchema = t.Object({
  id: t.String(),
  title: t.String(),
  completed: t.Boolean(),
});

// Sample data
const todos = [
  { id: '1', title: 'Learn Elysia', completed: false },
  { id: '2', title: 'Build an API', completed: true },
];

export const apiRoutes = new Elysia({ prefix: '/api' })
  // Get all todos
  .get('/todos', 
    () => todos,
    {
      detail: {
        summary: 'Get all todos',
        tags: ['API'],
        responses: {
          200: {
            description: 'List of todos',
            content: {
              'application/json': {
                schema: t.Array(todoSchema)
              }
            }
          }
        }
      }
    }
  )
  
  // Get a todo by ID
  .get('/todos/:id', 
    ({ params }) => {
      const todo = todos.find(t => t.id === params.id);
      if (!todo) {
        throw new Error('Todo not found');
      }
      return todo;
    },
    {
      params: t.Object({
        id: t.String()
      }),
      detail: {
        summary: 'Get a todo by ID',
        tags: ['API'],
        responses: {
          200: {
            description: 'Todo item',
            content: {
              'application/json': {
                schema: todoSchema
              }
            }
          },
          404: {
            description: 'Todo not found'
          }
        }
      }
    }
  ); 