const { Client, IntentsBitField } = require('discord.js');
const AWS = require('aws-sdk');
const dotenv = require('dotenv'); // Import dotenv library to load environment variables

// Load environment variables from .env file
dotenv.config();

// Create a new Discord client
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent
    ],
});

// Configure AWS using environment variables
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

// Create an EC2 service object
const ec2 = new AWS.EC2();

// Bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Set the bot's activity
    client.user.setActivity('Minecraft', { type: 'PLAYING' });
});

// Start the EC2 instance when the bot receives a message starting with '!start'
client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!start-sevtech')) {
        console.log('Starting EC2 instance...');
        // Start the EC2 instance
        try {
            const instanceId = process.env.INSTANCE_ID; // Use the EC2 instance ID from environment variables
            const params = {
                InstanceIds: [instanceId],
            };

            await ec2.startInstances(params).promise();
            message.reply(`Started the SevTech Minecraft server`);
        } catch (error) {
            console.error('Error starting EC2 instance:', error);
            message.reply('An error occurred while starting the server.');
        }
        // Stop the EC2 instance when the bot receives a message starting with '!stop'    
    } else if (message.content.startsWith('!stop-sevtech')) {
        // Stop the EC2 instance
        try {
            const instanceId = process.env.INSTANCE_ID; // Use the EC2 instance ID from environment variables
            const params = {
                InstanceIds: [instanceId],
            };

            await ec2.stopInstances(params).promise();
            message.reply(`Stopping the SevTech Minecraft server`);
        } catch (error) {
            console.error('Error stopping EC2 instance:', error);
            message.reply('An error occurred while stopping the server.');
        }
        // Restart the EC2 instance when the bot receives a message starting with '!restart'    
    } else if (message.content.startsWith('!restart-sevtech')) {
        // Restart the EC2 instance
        try {
            const instanceId = process.env.INSTANCE_ID; // Use the EC2 instance ID from environment variables
            const params = {
                InstanceIds: [instanceId],
            };

            await ec2.rebootInstances(params).promise();
            message.reply(`Restarting the SevTech Minecraft server`);
        } catch (error) {
            console.error('Error restarting EC2 instance:', error);
            message.reply('An error occured while restarting the server.')
        }
    } else if (message.content.startsWith('!help-sevtech')) {
        const availableCommands = [
            '!start-sevtech - Start the SevTech Minecraft server',
            '!stop-sevtech - Stop the SevTech Minecraft server',
            '!restart-sevtech - Restart the SevTech Minecraft server',
            '!help-sevtech - List available commands',
        ];
        const commandList = availableCommands.join('\n');
        message.reply(`Here are the availabe commands:\n${commandList}`);

    }
});

client.login(process.env.DISCORD_BOT_TOKEN); // Use the Discord Bot Token from environment variables