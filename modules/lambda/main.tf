resource "null_resource" "lambda_prepare" {
  triggers = {
    always_run = "${timestamp()}"
  }

  provisioner "local-exec" {
    command     = <<EOT
    npm run build
    Copy-Item package.json -Destination "${path.root}/dist/"
    Set-Location "${path.root}/dist"
    npm install --production
    Write-Output "npm install successful"
    EOT
    interpreter = ["PowerShell", "-Command"]
  }
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.root}/dist"
  output_path = "${path.root}/lambda_function.zip"

  depends_on = [null_resource.lambda_prepare]
}

resource "aws_lambda_function" "lambda" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = var.function_name
  role             = var.lambda_role_arn
  handler          = var.handler
  runtime          = var.runtime
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  depends_on = [null_resource.lambda_prepare]
  
  environment {
    variables = var.environment_variables
  }
}