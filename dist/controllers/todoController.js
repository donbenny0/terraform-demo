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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const service_1 = require("../service/service");
const uuid_1 = require("uuid");
const todoService = new service_1.TodoService();
const getTodos = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoService.readTodos();
        return {
            statusCode: 200,
            body: JSON.stringify(todos),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving todos', error: error }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
});
exports.getTodos = getTodos;
const addTodo = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newTodo = { id: (0, uuid_1.v4)(), task, completed: false };
        yield todoService.createTodo(newTodo);
        return {
            statusCode: 201,
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error adding todo', error: error }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
});
exports.addTodo = addTodo;
const updateTodo = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id;
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
        const existingTodos = yield todoService.readTodos();
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
        const updatedTodo = Object.assign(Object.assign({}, existingTodo), { task: task !== null && task !== void 0 ? task : existingTodo.task, completed: completed !== null && completed !== void 0 ? completed : existingTodo.completed });
        yield todoService.updateTodo(updatedTodo);
        return {
            statusCode: 200,
            body: JSON.stringify(updatedTodo),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating todo', error: error }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = event.pathParameters) === null || _b === void 0 ? void 0 : _b.id;
        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Todo ID is required' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        yield todoService.deleteTodo(id);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Todo deleted successfully' }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting todo', error: error }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
});
exports.deleteTodo = deleteTodo;
