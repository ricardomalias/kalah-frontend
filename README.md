#Kalah-frontend

### How to run ?

- Make sure the backend is running https://github.com/ricardomalias/kalah
- Have npm or other similar node package manager installed on your local machine

- On this project root folder run `npm install`
- After install is finished run `npm run start`
- Play the game on the browser tab
- Share the link with a friend which will be the second player
- Have fun =)


### Want to run it on internet without a server ?

We can use a application called ngrok to have a trial web

- Download ngrok: https://ngrok.com/download
- Configure ngrok.yml on your user folder to expose both backend and frontend:

```
authtoken: YOUR_TOKEN_HERE
tunnels:
  first:
    addr: 8080
    proto: http    
  second:
    addr: 3000
    proto: http
```

Have double of fun =)