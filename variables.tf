variable "region" {
  description = "AWS region"
  default     = "ap-south-1"
}

variable "bucket_name" {
  description = "Name of the S3 bucket"
  default     = "my-json-bucket-for-terraform"
}

variable "file_key" {
  description = "Key of the file in S3 bucket"
  default     = "todo.json"
}

variable "file_source" {
  description = "Source path of the file to upload"
  default     = "./src/data/todo.json"
}

variable "parameters_file_path" {
  description = "This specifies from where do we need to fetch the json."
  type        = string
  default     = "./parameters.json"
}


