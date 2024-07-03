import { TodoService } from '../service/service';
import { Todo } from '../dto/todoModel';
import { v4 as uuidv4 } from 'uuid';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const todoService = new TodoService();

export const getTodos = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const todos = await todoService.readTodos();
        return {
            statusCode: 200,
            body: JSON.stringify(todos),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving todos', error: error }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};

export const addTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { task } = JSON.parse(event.body || '{}');
        if (!task) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Task is required' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        const newTodo: Todo = { id: uuidv4(), task, completed: false };
        await todoService.createTodo(newTodo);
        return {
            statusCode: 201,
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error adding todo', error: error }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};

export const updateTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters?.id;
        const { task, completed } = JSON.parse(event.body || '{}');
        if (!id || (task === undefined && completed === undefined)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid input' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        const existingTodos = await todoService.readTodos();
        const existingTodo = existingTodos.find(todo => todo.id === id);

        if (!existingTodo) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Todo not found' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }

        const updatedTodo: Todo = { ...existingTodo, task: task ?? existingTodo.task, completed: completed ?? existingTodo.completed };
        await todoService.updateTodo(updatedTodo);
        return {
            statusCode: 200,
            body: JSON.stringify(updatedTodo),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating todo', error: error }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};

export const deleteTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters?.id;
        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Todo ID is required' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        await todoService.deleteTodo(id);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Todo deleted successfully' }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting todo', error: error }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
