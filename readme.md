# TO-DO Application Project Documentation

## Project Overview
This project is a simple Node.js application to provide a simple API for managing to-do items. It also includes infrastructure as code (IaC) using Terraform to deploy resources such as API Gateway, IAM roles, Lambda functions, S3 buckets, and SSM parameters.

## Setup Instructions

### Prerequisites
- Node.js (v18.x or later)
- npm (v6.x or later)
- Terraform (v0.12.x or later)

### Installation
1. Clone the repository using:
   ```sh
   git clone https://github.com/toxxxx.git/
   cd project-directory

2.	Install Node.js dependencies:

    ```sh
    npm install

3.	Initialize Terraform:

    ```sh
    terraform init

### Usage
1.	Running the Application:

    ```sh
    npm build

<!-- ### Deploying Infrastructure
1.	Apply the Terraform configuration:

   ```sh
    terraform apply -->


## Directory and File Descriptions

1.	**project-directory/dist/**: The npm build command will compile the TypeScript code and create the dist/ directory along with the compiled JavaScript code.
    -	**dist/controllers/todoController.js**: This is a controller file which contains multiple controller functions.
    -	**dist/dto/todoModel.js**: This directory contains the preferred model structure for the to-do application.
    -	**dist/service/service.js**: This is the service layer directory which includes the business logic for the data exchanged.
    -	**dist/utils/utils.js**: Contains utility functions (if any).
2.	**project-directory/src/**: This directory contains the TypeScript source code.
3.	**project-directory/modules/**: This directory includes all the deployment and IaC codes.
4.	**modules/api_gateway/**: Terraform configuration for API Gateway.
	- **main.tf**: Defines the infrastructure resources for API Gateway.
	- **outputs.tf**: Outputs for API Gateway resources.
	- **variables.tf**: Variables for API Gateway resources.
	**modules/iam/**: Terraform configuration for IAM roles.
	- **main.tf**: Defines the infrastructure resources for IAM roles.
	- **outputs.tf**: Outputs for IAM resources.
	- **variables.tf**: Variables for IAM resources.
	**modules/lambda/**: Terraform configuration for Lambda functions.
	- **main.tf** Defines the infrastructure resources for Lambda functions.
	- **outputs.tf**: Outputs for Lambda resources.
	- **variables.tf**: Variables for Lambda resources.
5.	**modules/s3/**: Terraform configuration for S3 buckets.
	- **main.tf**: Defines the infrastructure resources for S3 buckets.
	- **outputs.tf**: Outputs for S3 resources.
	- **variables.tf**: Variables for S3 resources.
6.	**modules/ssm_parameters/**: Terraform configuration for SSM parameters.
	-   **main.tf**: Defines the infrastructure resources for SSM parameters.
	-   **outputs.tf**: Outputs for SSM resources.
	-   **variables.tf**: Variables for SSM resources.
7.	**Root Directory Files**:
	-   **main.tf**: Main Terraform configuration file for defining infrastructure resources.
	-   **outputs.tf**: Terraform outputs file for outputting values after infrastructure       deployment.
	-   **package.json**: Contains metadata about the Node.js project and its dependencies.
	-   **parameters. json**: JSON file containing project parameters.
	-   **tsconfig. json**: TypeScript configuration file.
	-   **variables.tf**: Terraform variables file for defining input variables.


### Configuring Deployment
1.	**Module – lambda**

    This Terraform module prepares, packages, and deploys an AWS Lambda function. It consists of three main components:
    -	Preparing the Lambda function: Running build commands and installing dependencies.
    -	Creating a ZIP file: Packaging the Lambda function and its dependencies into a .zip file.
    -	Deploying the Lambda function: Uploading the .zip file to AWS Lambda.

- a.	Input Variables
        function_name: - Name of the Lambda function
        lambda_role_arn: - ARN of the IAM role for Lambda
        handler: - Handler for the Lambda function
        runtime: - Runtime for the Lambda function
        environment_variables: - Environment variables for the Lambda function

- b.	Output Variables
        lambda_function_name: - Name of the Lambda function
        lambda_invoke_arn: - Invocation ARN of the Lambda function

- c.	Using lambda module in project-directory/main.tf
    ```
            module "lambda" {
            source = "./modules/lambda"
            function_name         = "my_lambda_function"
            lambda_role_arn       = // specify the arn
            handler               = "index.handler"
            runtime               = "nodejs14.x"
            environment_variables = {
                "KEY1" = "value1"
                "KEY2" = "value2"
            }
        }


