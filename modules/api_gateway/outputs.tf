output "api_id" {
  description = "ID of the API Gateway REST API"
  value       = aws_api_gateway_rest_api.api.id
}

output "root_resource_id" {
  description = "Resource ID of the API's root"
  value       = aws_api_gateway_rest_api.api.root_resource_id
}

output "execution_arn" {
  description = "Execution ARN part of the API Gateway stage"
  value       = aws_api_gateway_rest_api.api.execution_arn
}

output "invoke_url" {
  description = "URL to invoke the API pointing to the stage"
  value       = aws_api_gateway_deployment.deployment.invoke_url
}