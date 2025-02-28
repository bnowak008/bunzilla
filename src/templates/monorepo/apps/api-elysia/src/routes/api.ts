import { Elysia, t } from 'elysia';
import { User, ApiResponse } from '@${projectName}/shared';

// Define a schema for User
const userSchema = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
});

// Sample data
const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

export const apiRoutes = new Elysia({ prefix: '/api' })
  // Get all users
  .get('/users', 
    (): ApiResponse<User[]> => ({ 
      data: users 
    }),
    {
      detail: {
        summary: 'Get all users',
        tags: ['API'],
        responses: {
          200: {
            description: 'List of users',
            content: {
              'application/json': {
                schema: t.Object({
                  data: t.Array(userSchema)
                })
              }
            }
          }
        }
      }
    }
  )
  
  // Get a user by ID
  .get('/users/:id', 
    ({ params }): ApiResponse<User | null> => {
      const user = users.find(u => u.id === params.id);
      if (!user) {
        throw new Error('User not found');
      }
      return { data: user };
    },
    {
      params: t.Object({
        id: t.String()
      }),
      detail: {
        summary: 'Get a user by ID',
        tags: ['API'],
        responses: {
          200: {
            description: 'User details',
            content: {
              'application/json': {
                schema: t.Object({
                  data: userSchema
                })
              }
            }
          },
          404: {
            description: 'User not found'
          }
        }
      }
    }
  ); 