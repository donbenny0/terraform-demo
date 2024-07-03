variable "api_name" {
  description = "Name of the API Gateway"
  type        = string
}

variable "api_description" {
  description = "Description of the API Gateway"
  type        = string
}

variable "get_todos_arn" {
  description = "ARN of the Lambda function for getting todos"
  type        = string
}

variable "add_todo_arn" {
  description = "ARN of the Lambda function for adding a todo"
  type        = string
}

variable "update_todo_arn" {
  description = "ARN of the Lambda function for updating a todo"
  type        = string
}

variable "delete_todo_arn" {
  description = "ARN of the Lambda function for deleting a todo"
  type        = string
}