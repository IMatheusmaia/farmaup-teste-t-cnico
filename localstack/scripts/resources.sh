#!/bin/bash
echo "🔧 Configurando LocalStack..."

echo "criando Schemas do DynamoDB para tabela clientes..."

awslocal dynamodb create-table \
    --region $AWS_REGION \
    --table-name clientes \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST

echo "tabela de clientes criada com sucesso!"

echo "criando política de acesso total ao dynamoDB para tabela clientes..."
awslocal iam create-policy \
  --policy-name AppFullAcessPolicy \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query"
        ],
        "Resource": "arn:aws:dynamodb:$AWS_REGION:$AWS_ACCOUNT_ID:table/clientes"
      }
    ]
  }'

echo "criando role para app"
echo "Criando uma role IAM para app..."
awslocal iam create-role \
  --role-name appRole \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": { "Service": "lambda.amazonaws.com" },
        "Action": "sts:AssumeRole"
      }
    ]
  }'

echo "anexando política de acesso total do DynamoDB para tabela clientes à role appRole..."
awslocal iam attach-role-policy \
  --role-name appRole \
  --policy-arn arn:aws:iam::$AWS_ACCOUNT_ID:policy/AppFullAcessPolicy

echo "Criando Lambda function-url (all cross-origin)..."
awslocal lambda create-function \
    --function-name app \
    --runtime nodejs20.x \
    --zip-file fileb:///lambda/app/app.zip \
    --handler  build/lambda.handler \
    --role arn:aws:iam::$AWS_ACCOUNT_ID:role/appRole \
    --region us-east-1 \
    --timeout 30 \
    --environment 'Variables={AWS_ROLE_ARN=arn:aws:iam::'"$AWS_ACCOUNT_ID"':role/appRole, DYNAMODB_TABLE_NAME=clientes, AWS_REGION='"$AWS_REGION"' }'\
    --tags '{"_custom_id_":"app"}' \

awslocal lambda create-function-url-config \
    --function-name app \
    --auth-type NONE \
    --cors file:///lambda/app/cors-config.json \

