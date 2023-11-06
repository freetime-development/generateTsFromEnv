## Simple script to generate TS file from .env config

### Install
    npm install generate-ts-from-env

    yarn add generate-ts-from-env

    pnpm intall generate-ts-from-env

    
### Usage

    generate-ts-from-env -i ./inputFile -o ./outputFile


as a result you get and outputfile with an object including all your env variables with a corresponding type

    export type Env = {
        [key]: string // key from the env file
	}
    
    export const env: Env = process.env