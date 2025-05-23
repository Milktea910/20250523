import 'dotenv/config'
import { google } from 'googleapis'
import fs from 'fs'
import templatesVideo from '../templates/searchVideo.js'
import templatesChannel from '../templates/searchChannel.js'

export default async (message, event) => {
  try {
    const youtubeSearch = google.youtube({
      version: 'v3',
      auth: process.env.key,
    })
    const result = await youtubeSearch.search.list({
      part: 'snippet',
      q: message,
      maxResults: 5,
      type: 'video,channel',
    })
    const bubbles = result.data.items.map((value) => {
      if (value.id.kind === 'youtube#video') {
        const bubble = templatesVideo()
        const urlVideo = `https://www.youtube.com/watch?v=${value.id.videoId}`
        const urlChannel = `https://www.youtube.com/channel/${value.snippet.channelId}`
        bubble.hero.url = value.snippet.thumbnails.high.url
        bubble.body.contents[0].text = value.snippet.title
        bubble.body.contents[1].text = value.snippet.channelTitle
        bubble.body.contents[2].text = value.snippet.description
        bubble.footer.contents[0].action.uri = urlVideo
        bubble.footer.contents[1].action.uri = urlChannel
        return bubble
      } else {
        const bubble = templatesChannel()
        const urlChannel = `https://www.youtube.com/channel/${value.id.channelId}`
        bubble.hero.url = value.snippet.thumbnails.high.url
        bubble.body.contents[0].text = value.snippet.title
        bubble.body.contents[1].text = value.snippet.description
        bubble.footer.contents[0].action.uri = urlChannel
        return bubble
      }
    })
    const reply = await event.reply({
      type: 'flex',
      altText: 'Youtube Search',
      contents: {
        type: 'carousel',
        contents: bubbles,
      },
    })

    if (reply.message && process.env.DEV === 'true') {
      await event.reply('發生錯誤')
      if (process.env.DEV === 'true') {
        fs.writeFileSync('./dump/search.json', JSON.stringify(reply, null, 2))
      }
    }
  } catch (error) {
    console.error(error)
    await event.reply('發生錯誤')
  }
}
