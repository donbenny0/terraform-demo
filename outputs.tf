output "api_url" {
  description = "Base URL for API Gateway stage"
  value       = module.api_gateway.invoke_url
}

output "created_parameters" {
  value = module.ssm_parameters.parameter_names
}