variable "parameters" {
  description = "List of SSM parameters to create"
  type = list(object({
    name        = string
    description = string
    type        = string
    value       = string
  }))
}

