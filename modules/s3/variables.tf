variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
}

variable "file_key" {
  description = "Key of the file in S3 bucket"
  type        = string
}

variable "file_source" {
  description = "Source path of the file to upload"
  type        = string
}