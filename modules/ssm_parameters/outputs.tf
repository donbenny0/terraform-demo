output "parameter_names" {
  description = "Names of the created SSM parameters"
  value       = aws_ssm_parameter.parameters[*].name
}