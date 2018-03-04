# Telegram Math Drawing Bot
The Telegram bot [@math2img_bot](https://telegram.me/math2img_bot) converts mathematical expressions into the corresponding images. For example, the bot would respond to the message
```tex
{ \partial^2 u \over \partial t^2 } = c^2 \nabla^2 u
```
with this image:

![bot-response](https://timodenk.com/api/tex2img/%7B%20%5Cpartial%5E2%20u%20%5Cover%20%5Cpartial%20t%5E2%20%7D%20%3D%20c%5E2%20%5Cnabla%5E2%20u%20?format=jpg)

## Run
Clones the repository and runs the server in the background. Replace `<token>` with a valid Telegram bot token.
```bash
git clone https://github.com/Simsso/Telegram-Math2Image-Bot telegram-math2image-bot
cd telegram-math2image-bot
npm install
BOT_TOKEN=<token> nohup node main.js > log.txt &
```