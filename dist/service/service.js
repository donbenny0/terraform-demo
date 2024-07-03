"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const stream_to_string_1 = __importDefault(require("stream-to-string"));
class TodoService {
    constructor() {
        this.s3Client = new client_s3_1.S3Client({});
        this.bucketName = process.env.S3_BUCKET_NAME || '';
        this.fileName = process.env.S3_JSON_FILE_NAME || '';
        if (!this.bucketName || !this.fileName) {
            console.error('Bucket name or file name is not set');
        }
    }
    // Helper method to get the current list of Todos
    getTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Getting todos from bucket: ${this.bucketName}, file: ${this.fileName}`);
                const command = new client_s3_1.GetObjectCommand({ Bucket: this.bucketName, Key: this.fileName });
                const { Body } = yield this.s3Client.send(command);
                const todosString = yield (0, stream_to_string_1.default)(Body);
                console.log('Todos retrieved:', todosString);
                return JSON.parse(todosString);
            }
            catch (error) {
                console.error('Error getting todos:', error);
                return [];
            }
        });
    }
    // Helper method to save the current list of Todos
    saveTodos(todos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Saving todos to bucket: ${this.bucketName}, file: ${this.fileName}`);
                const putCommand = new client_s3_1.PutObjectCommand({
                    Bucket: this.bucketName,
                    Key: this.fileName,
                    Body: JSON.stringify(todos),
                    ContentType: 'application/json',
                });
                yield this.s3Client.send(putCommand);
                console.log('Todos saved successfully');
            }
            catch (error) {
                console.error('Error saving todos:', error);
            }
        });
    }
    // Create a new Todo
    createTodo(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield this.getTodos();
            todos.push(todo);
            yield this.saveTodos(todos);
        });
    }
    // Read all Todos
    readTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getTodos();
        });
    }
    // Update an existing Todo
    updateTodo(updatedTodo) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield this.getTodos();
            const index = todos.findIndex(todo => todo.id === updatedTodo.id);
            if (index === -1) {
                throw new Error('Todo not found');
            }
            todos[index] = updatedTodo;
            yield this.saveTodos(todos);
        });
    }
    // Delete a Todo
    deleteTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield this.getTodos();
            const updatedTodos = todos.filter(todo => todo.id !== id);
            if (todos.length === updatedTodos.length) {
                throw new Error('Todo not found');
            }
            yield this.saveTodos(updatedTodos);
        });
    }
}
exports.TodoService = TodoService;
