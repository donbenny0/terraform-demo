output "bucket_id" {
  description = "ID of the created S3 bucket"
  value       = aws_s3_bucket.json_bucket.id
}

output "bucket_arn" {
  description = "ARN of the created S3 bucket"
  value       = aws_s3_bucket.json_bucket.arn
}

output "file_key" {
  description = "Key of the uploaded file"
  value       = aws_s3_object.file_upload.key
}