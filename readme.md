
    <h1>TO-DO Application Project Documentation</h1>

    <h2>Project Overview</h2>
    <p>This project is a simple Node.js application to provide a simple API for managing to-do items. It also includes infrastructure as code (IaC) using Terraform to deploy resources such as API Gateway, IAM roles, Lambda functions, S3 buckets, and SSM parameters.</p>

    <h2>Setup Instructions</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js (v18.x or later)</li>
        <li>npm (v6.x or later)</li>
        <li>Terraform (v0.12.x or later)</li>
    </ul>

    <h3>Installation</h3>
    <ol>
        <li>Clone the repository using:
            <pre><code>git clone https://github.com/toxxxx.git/
cd project-directory</code></pre>
        </li>
        <li>Install Node.js dependencies:
            <pre><code>npm install</code></pre>
        </li>
        <li>Initialize Terraform:
            <pre><code>terraform init</code></pre>
        </li>
    </ol>

    <h3>Usage</h3>
    <h4>Running the Application:</h4>
    <pre><code>npm build</code></pre>

    <h4>Deploying Infrastructure</h4>
    <ol>
        <li>Apply the Terraform configuration:
            <pre><code>terraform apply</code></pre>
        </li>
    </ol>

    <h2>Directory and File Descriptions</h2>
    <ol>
        <li>
            <code>project-directory/dist/</code>: The <code>npm build</code> command will compile the TypeScript code and create the <code>dist/</code> directory along with the compiled JavaScript code.
            <ul>
                <li><code>dist/controllers/todoController.js</code>: This is a controller file which contains multiple controller functions.</li>
                <li><code>dist/dto/todoModel.js</code>: This directory contains the preferred model structure for the to-do application.</li>
                <li><code>dist/service/service.js</code>: This is the service layer directory which includes the business logic for the data exchanged.</li>
                <li><code>dist/utils/utils.js</code>: Contains utility functions (if any).</li>
            </ul>
        </li>
        <li><code>project-directory/src/</code>: This directory contains the TypeScript source code.</li>
        <li>
            <code>project-directory/modules/</code>: This directory includes all the deployment and IaC codes.
            <ul>
                <li>
                    <code>modules/api_gateway/</code>: Terraform configuration for API Gateway.
                    <ul>
                        <li><code>main.tf</code>: Defines the infrastructure resources for API Gateway.</li>
                        <li><code>outputs.tf</code>: Outputs for API Gateway resources.</li>
                        <li><code>variables.tf</code>: Variables for API Gateway resources.</li>
                    </ul>
                </li>
                <li>
                    <code>modules/iam/</code>: Terraform configuration for IAM roles.
                    <ul>
                        <li><code>main.tf</code>: Defines the infrastructure resources for IAM roles.</li>
                        <li><code>outputs.tf</code>: Outputs for IAM resources.</li>
                        <li><code>variables.tf</code>: Variables for IAM resources.</li>
                    </ul>
                </li>
                <li>
                    <code>modules/lambda/</code>: Terraform configuration for Lambda functions.
                    <ul>
                        <li><code>main.tf</code>: Defines the infrastructure resources for Lambda functions.</li>
                        <li><code>outputs.tf</code>: Outputs for Lambda resources.</li>
                        <li><code>variables.tf</code>: Variables for Lambda resources.</li>
                    </ul>
                </li>
                <li>
                    <code>modules/s3/</code>: Terraform configuration for S3 buckets.
                    <ul>
                        <li><code>main.tf</code>: Defines the infrastructure resources for S3 buckets.</li>
                        <li><code>outputs.tf</code>: Outputs for S3 resources.</li>
                        <li><code>variables.tf</code>: Variables for S3 resources.</li>
                    </ul>
                </li>
                <li>
                    <code>modules/ssm_parameters/</code>: Terraform configuration for SSM parameters.
                    <ul>
                        <li><code>main.tf</code>: Defines the infrastructure resources for SSM parameters.</li>
                        <li><code>outputs.tf</code>: Outputs for SSM resources.</li>
                        <li><code>variables.tf</code>: Variables for SSM resources.</li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>Root Directory Files:
            <ul>
                <li><code>main.tf</code>: Main Terraform configuration file for defining infrastructure resources.</li>
                <li><code>outputs.tf</code>: Terraform outputs file for outputting values after infrastructure deployment.</li>
                <li><code>package.json</code>: Contains metadata about the Node.js project and its dependencies.</li>
                <li><code>parameters.json</code>: JSON file containing project parameters.</li>
                <li><code>tsconfig.json</code>: TypeScript configuration file.</li>
                <li><code>variables.tf</code>: Terraform variables file for defining input variables.</li>
            </ul>
        </li>
    </ol>

    <h2>Configuring Deployment</h2>
    <h3>Module – lambda</h3>
    <h4>Overview</h4>
    <p>This Terraform module prepares, packages, and deploys an AWS Lambda function. It consists of three main components:</p>
    <ol>
        <li>Preparing the Lambda function: Running build commands and installing dependencies.</li>
        <li>Creating a ZIP file: Packaging the Lambda function and its dependencies into a .zip file.</li>
        <li>Deploying the Lambda function: Uploading the .zip file to AWS Lambda.</li>
    </ol>

    <h4>Input Variables</h4>
    <ul>
        <li><code>function_name</code>: - Name of the Lambda function</li>
        <li><code>lambda_role_arn</code>: - ARN of the IAM role for Lambda</li>
        <li><code>handler</code>: - Handler for the Lambda function</li>
        <li><code>runtime</code>: - Runtime for the Lambda function</li>
        <li><code>environment_variables</code>: - Environment variables for the Lambda function</li>
    </ul>

    <h4>Output Variables</h4>
    <ul>
        <li><code>lambda_function_name</code>: - Name of the Lambda function</li>
        <li><code>lambda_invoke_arn</code>: - Invocation ARN of the Lambda function</li>
    </ul>

    <h4>Using lambda module in <code>project-directory/main.tf</code></h4>
    <pre><code>module "lambda" {
  source = "./modules/lambda"
  function_name         = "my_lambda_function"
  lambda_role_arn       = // specify the arn
  handler               = "index.handler"
  runtime               = "nodejs14.x"
  environment_variables = {
    "KEY1" = "value1"
    "KEY2" = "value2"
  }
}</code></pre>

    <h3>Module – api_gateway</h3>
    <h4>API Overview</h4>
    <h4>Resources</h4>
    <h5>Todos Resource</h5>
    <ul>
        <li>Path: <code>/todos</code></li>
        <li>Methods:
            <ul>
                <li>GET
                    <ul>
                        <li>Integration: AWS Lambda Function (<code>var.get_todos_arn</code>)</li>
                    </ul>
                </li>
                <li>POST
                    <ul>
                        <li>Integration: AWS Lambda Function (<code>var.add_todo_arn</code>)</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
    <h5>Todo Resource</h5>
    <ul>
        <li>Path: <code>/todos/{id}</code></li>
        <li>Methods:
            <ul>
                <li>PUT
                    <ul>
                        <li>Integration: AWS Lambda Function (<code>var.update_todo_arn</code>)</li>
                    </ul>
                </li>
                <li>DELETE
                    <ul>
                        <li>Integration: AWS Lambda Function (<code>var.delete_todo_arn</code>)</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>

    <h4>Input variables</h4>
    <ul>
        <li><code>api_name</code>: Name of the API Gateway</li>
        <li><code>api_description</code>: Description of the API Gateway</li>
        <li><code>get_todos_arn</code>: ARN of the Lambda function for getting to-do</li>
        <li><code>add_todo_arn</code>: ARN of the Lambda function for adding a to-do</li>
        <li><code>update_todo_arn</code>: ARN of the Lambda function for updating a to-do</li>
        <li><code>delete_todo_arn</code>: ARN of the Lambda function for deleting a to-do</li>
    </ul>

    <h4>Output variables</h4>
    <ul>
        <li><code>api_id</code>: ID of the API Gateway REST API</li>
        <li><code>root_resource_id</code>: Resource ID of the API's root</li>
        <li><code>execution_arn</code>: Execution ARN part of the API Gateway stage</li>
        <li><code>invoke_url</code>: URL to invoke the API pointing to the stage</li>
    </ul>

    <h4>Using api_gateway module in <code>project-directory/main.tf</code></h4>
    <pre><code>module "api_gateway" {
  source           = "Path to module"
  api_name         = "Api Name goes here"
  api_description  = "description goes here"
  get_todos_arn    = //specify arn here
  add_todo_arn     = //specify arn here
  update_todo_arn  = //specify arn here
  delete_todo_arn  = //specify arn here
}</code></pre>

    <h3>Module – S3</h3>
    <h4>Overview</h4>
    <p>This module defines the S3 bucket and file upload to the bucket</p>

    <h4>Input variables</h4>
    <ul>
        <li><code>bucket_name</code>: Name of the S3 bucket</li>
        <li><code>file_key</code>: Key of the file in S3 bucket</li>
        <li><code>file_source</code>: Source path of the file to upload</li>
    </ul>

    <h4>Output variables</h4>
    <ul>
        <li><code>bucket_id</code>: ID of the created S3 bucket</li>
        <li><code>bucket_arn</code>: ARN of the created S3 bucket</li>
        <li><code>file_key</code>: Key of the uploaded file</li>
    </ul>

    <h4>Using s3 module in <code>project-directory/main.tf</code></h4>
    <pre><code>module "s3" {
  source      = "path to module"
  bucket_name = // your bucket name
  file_key    = // file name
  file_source = //path to your file
}</code></pre>

    <h3>Module – iam</h3>
    <h4>Input variables</h4>
    <ul>
        <li><code>s3_bucket_arn</code>: ARN of the S3 bucket</li>
    </ul>

    <h4>Output variables</h4>
    <ul>
        <li><code>lambda_role_arn</code>: ARN of the IAM role for Lambda</li>
    </ul>

    <h4>Usage</h4>
    <pre><code>module "iam" {
  source        = "Path to module"
  s3_bucket_arn = //specify arn of bucket
}</code></pre>

    <h2>Configuring Source Code</h2>
    <h3><code>project-destination/src/dto/dto.ts</code></h3>
    <h4>Creating new dto structure</h4>
    <pre><code>export interface New_dto{
    
        // Define the structure
}</code></pre>

    <h3><code>project-destination/src/controller/todoController.ts</code></h3>
    <h4>Creating new controller</h4>
    <pre><code>import { TodoService } from '../service/service';
import { Todo } from '../dto/todoModel';
//Specify other imports here

//Extend the service class
const todoService = new TodoService();

//specify your new controller here
export const deleteTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
//your statements 
          }
catch(expression){
//Your catch statements
}</code></pre>

    <h3><code>project-destination/src/service/service.ts</code></h3>
    <h4>Creating new service</h4>
    <pre><code>import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Todo } from '../dto/todoModel';
// Specify other imports here
export class TodoService {
    // create private variables here
    constructor() {
//Add initialization here
    }
    // Helper method to get the current list of Todos
    private async getTodos(): Promise<Todo[]> {
//Write todo logic here
    }
    // Write more methods
    public async createTodo(todo: Todo): Promise<void> {
//access todo here
    }
}</code></pre>

    <h2>Cleaning Up</h2>
    <p>To remove all deployed resources, navigate to the Terraform directory and run:</p>
    <pre><code>terraform destroy</code></pre>

