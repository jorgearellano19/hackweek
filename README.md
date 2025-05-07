# Fault Finder Bot

This is a proof-of-concept (PoC) for the **Fault Finder Bot**, which uses [Retrieval-Augmented Generation (RAG)](https://aws.amazon.com/what-is/retrieval-augmented-generation/) powered by **AWS Bedrock**.

## Running Locally

1. **Set up AWS credentials**

   Configure an AWS CLI profile named `hackweek`:

   `aws configure --profile hackweek`

2. **Set up environment variables**

    Setup the enviroment variables by following the `.env.example` files:

    *frontend/.env.example → frontend/.env*

    *backend/.env.example → backend/.env*

3. **Start the project**

    From the root directory, run:
    
    `npm run local`

    this will start both an Apollo Server (API) and a Vite server (Frontend)