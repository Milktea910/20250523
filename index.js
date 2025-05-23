import 'dotenv/config'
import linebot from 'linebot'
import Search from './commadns/searchVideo.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})
bot.on('message', (event) => {
  if (event.message.type === 'text') {
    Search(event.message.text, event)
    if (event.message.text === 'すいちゃんは') {
      event.reply('今日もかわいい')
    }
  }
})
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器啟動')
})
