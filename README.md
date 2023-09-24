# Welcome To my Discord Server Admin Bot Series! #

This is just one of my discord bots that are used to manage ec2 instances remotely through the use of a discord bot!

For this specific code, the bot is managing an ec2 instance running an SecTech: Ages modded minecraft server



# Setup #

For the setup up you will need node.js and npm installed
Simply follow the commands below to get set up

1. mkdir /opt/sevtech && cd /opt/sevtech

2. git clone https://github.com/coreypell1102/discord-sevtech-server-bot.git
   
3. mv discord-sevtech-server-bot/* ./ && rm -rf discord-sevtech-server-bot
   
4. run 'npm install' to install dependencies
   
5. mv server/sevtech.service /ect/systemd/system
   
6. systemctl deamon-reload
   
7. systemctl enable minecraft
   
8. systemctl start minecraft



# Bot Commands #

1. !start-sevtech - Starts the SevTech Minecraft Server

2. !stop-sevtech - Stops the SevTech Minecraft Server

3. !restart-sevtech - Restarts the SevTech Minecraft Server

4. !status-sevtech - Returns the state of the SevTech Minecraft Server

5. !help-sevtech - Lists available commands

