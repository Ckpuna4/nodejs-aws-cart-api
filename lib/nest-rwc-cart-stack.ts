import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';

require('dotenv').config();

const DB_ENDPOINT = process.env.DB_ENDPOINT!;
const DB_USER = process.env.DB_USER!;
const DB_PASSWORD = process.env.DB_PASSWORD!;

export class NestRwcCartStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nestAppLambda = new NodejsFunction(this, 'nestApp', {
      functionName: 'nestAppLambda',
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, '../src/main.js'),
      handler: 'handler',
      environment: {
          DB_ENDPOINT,
          DB_USER,
          DB_PASSWORD
      },
      bundling: {
        externalModules: [
            '@nestjs/websockets/socket-module',
            '@nestjs/microservices/microservices-module',
            '@nestjs/microservices',
            'class-transformer',
            'class-validator',
        ]
      }
    });

    const api = new apiGateway.LambdaRestApi(this, 'NestApiGateway', {
      handler: nestAppLambda,
    });
  }
}
