## Clone this project

```
git clone https://github.com/youvandra/Authwork.git
```

Open project folder

```
cd Authwork/
```

## Set your network on metamask with Fantom Testnet

Network name : Fantom testnet

RPC : https://rpc.testnet.fantom.network/

Chain ID : 4002

Symbol : FTM

Block Explorer : https://testnet.ftmscan.com/



## Set .env file

DATABASE_URL='mysql://3yq7t7xaxrxzcyyqxdb4:pscale_pw_k9BHte0shpxOH48EqxjklZNC5Lyi46Ijx6fQb2ngbrY@aws-eu-west-2.connect.psdb.cloud/artbeat?sslaccept=strict'
NEXTAUTH_SECRET=0EYcoz3wZI2f1MvYWjE7jBeg4pQ9qGj2
NEXTAUTH_URL=http://localhost:3000

## How to run locally: 

After setting up the .env file:

run command : 

```
npm install 
npx prisma generate
npm run dev
```

## Go to localhost:3000 in your browser
