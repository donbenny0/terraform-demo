import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Todo } from '../dto/todoModel';
import { Readable } from "stream";
import streamToString from 'stream-to-string';

export class TodoService {
    private s3Client: S3Client;
    private bucketName: string;
    private fileName: string;

    constructor() {
        this.s3Client = new S3Client({});
        this.bucketName = process.env.S3_BUCKET_NAME || '';
        this.fileName = process.env.S3_JSON_FILE_NAME || '';

        if (!this.bucketName || !this.fileName) {
            console.error('Bucket name or file name is not set');
        }
    }

    // Helper method to get the current list of Todos
    private async getTodos(): Promise<Todo[]> {
        try {
            console.log(`Getting todos from bucket: ${this.bucketName}, file: ${this.fileName}`);
            const command = new GetObjectCommand({ Bucket: this.bucketName, Key: this.fileName });
            const { Body } = await this.s3Client.send(command);
            
            const todosString = await streamToString(Body as Readable);
            console.log('Todos retrieved:', todosString);
            return JSON.parse(todosString) as Todo[];
        } catch (error) {
            console.error('Error getting todos:', error);
            return [];
        }
    }

    // Helper method to save the current list of Todos
    private async saveTodos(todos: Todo[]): Promise<void> {
        try {
            console.log(`Saving todos to bucket: ${this.bucketName}, file: ${this.fileName}`);
            const putCommand = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: this.fileName,
                Body: JSON.stringify(todos),
                ContentType: 'application/json',
            });
            await this.s3Client.send(putCommand);
            console.log('Todos saved successfully');
        } catch (error) {
            console.error('Error saving todos:', error);
        }
    }

    // Create a new Todo
    public async createTodo(todo: Todo): Promise<void> {
        const todos = await this.getTodos();
        todos.push(todo);
        await this.saveTodos(todos);
    }

    // Read all Todos
    public async readTodos(): Promise<Todo[]> {
        return await this.getTodos();
    }

    // Update an existing Todo
    public async updateTodo(updatedTodo: Todo): Promise<void> {
        const todos = await this.getTodos();
        const index = todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index === -1) {
            throw new Error('Todo not found');
        }
        todos[index] = updatedTodo;
        await this.saveTodos(todos);
    }

    // Delete a Todo
    public async deleteTodo(id: string): Promise<void> {
        const todos = await this.getTodos();
        const updatedTodos = todos.filter(todo => todo.id !== id);
        if (todos.length === updatedTodos.length) {
            throw new Error('Todo not found');
        }
        await this.saveTodos(updatedTodos);
    }
}
