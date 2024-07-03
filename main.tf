provider "aws" {
  region = var.region
}



locals {
  parameters_json = jsondecode(file(var.parameters_file_path))
}

module "ssm_parameters" {
  source = "./modules/ssm_parameters"
  parameters = local.parameters_json.parameters
}


module "s3" {
  source      = "./modules/s3"
  bucket_name = var.bucket_name
  file_key    = var.file_key
  file_source = var.file_source
}

module "iam" {
  source        = "./modules/iam"
  s3_bucket_arn = module.s3.bucket_arn
}

module "lambda_get_todos" {
  source                = "./modules/lambda"
  function_name         = "getTodos"
  lambda_role_arn       = module.iam.lambda_role_arn
  handler               = "./controllers/todoController.getTodos"
  runtime               = "nodejs20.x"
  environment_variables = {
    S3_BUCKET_NAME    = module.s3.bucket_id
    S3_JSON_FILE_NAME = module.s3.file_key
  }
}

module "lambda_add_todo" {
  source                = "./modules/lambda"
  function_name         = "addTodo"
  lambda_role_arn       = module.iam.lambda_role_arn
  handler               = "./controllers/todoController.addTodo"
  runtime               = "nodejs20.x"
  environment_variables = {
    S3_BUCKET_NAME    = module.s3.bucket_id
    S3_JSON_FILE_NAME = module.s3.file_key
  }
}

module "lambda_update_todo" {
  source                = "./modules/lambda"
  function_name         = "updateTodo"
  lambda_role_arn       = module.iam.lambda_role_arn
  handler               = "./controllers/todoController.updateTodo"
  runtime               = "nodejs20.x"
  environment_variables = {
    S3_BUCKET_NAME    = module.s3.bucket_id
    S3_JSON_FILE_NAME = module.s3.file_key
  }
}

module "lambda_delete_todo" {
  source                = "./modules/lambda"
  function_name         = "deleteTodo"
  lambda_role_arn       = module.iam.lambda_role_arn
  handler               = "./controllers/todoController.deleteTodo"
  runtime               = "nodejs20.x"
  environment_variables = {
    S3_BUCKET_NAME    = module.s3.bucket_id
    S3_JSON_FILE_NAME = module.s3.file_key
  }
}

module "api_gateway" {
  source           = "./modules/api_gateway"
  api_name         = "TodoAPI"
  api_description  = "Todo API Gateway"
  get_todos_arn    = module.lambda_get_todos.lambda_invoke_arn
  add_todo_arn     = module.lambda_add_todo.lambda_invoke_arn
  update_todo_arn  = module.lambda_update_todo.lambda_invoke_arn
  delete_todo_arn  = module.lambda_delete_todo.lambda_invoke_arn
}

resource "aws_lambda_permission" "api_gateway_get_todos" {
  statement_id  = "AllowAPIGatewayInvokeGetTodos"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_get_todos.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${module.api_gateway.execution_arn}/*/*"
}

resource "aws_lambda_permission" "api_gateway_add_todo" {
  statement_id  = "AllowAPIGatewayInvokeAddTodo"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_add_todo.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${module.api_gateway.execution_arn}/*/*"
}

resource "aws_lambda_permission" "api_gateway_update_todo" {
  statement_id  = "AllowAPIGatewayInvokeUpdateTodo"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_update_todo.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${module.api_gateway.execution_arn}/*/*"
}

resource "aws_lambda_permission" "api_gateway_delete_todo" {
  statement_id  = "AllowAPIGatewayInvokeDeleteTodo"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_delete_todo.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${module.api_gateway.execution_arn}/*/*"
}