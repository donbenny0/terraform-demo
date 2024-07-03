resource "aws_ssm_parameter" "parameters" {
  count = length(var.parameters)

  name        = var.parameters[count.index].name
  description = var.parameters[count.index].description
  type        = var.parameters[count.index].type
  value       = var.parameters[count.index].value

}