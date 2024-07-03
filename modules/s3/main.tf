resource "aws_s3_bucket" "json_bucket" {
  bucket = var.bucket_name
}

resource "aws_s3_object" "file_upload" {
  bucket = aws_s3_bucket.json_bucket.id
  key    = var.file_key
  source = var.file_source
}