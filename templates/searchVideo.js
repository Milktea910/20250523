export default () => ({
  type: 'bubble',
  hero: {
    type: 'image',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
    url: 'https://i.ytimg.com/vi/7Jcgj5BXy4U/hqdefault.jpg',
  },
  body: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'text',
        text: 'Video Title',
        wrap: true,
        weight: 'bold',
        size: 'xxl',
        maxLines: 1,
      },
      {
        type: 'text',
        text: 'channelTitle',
        size: '20px',
      },
      {
        type: 'text',
        text: 'description',
        size: '15px',
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'button',
        style: 'primary',
        action: {
          type: 'uri',
          label: '前往觀看',
          uri: 'https://line.me/',
        },
      },
      {
        type: 'button',
        action: {
          type: 'uri',
          label: '前往頻道',
          uri: 'https://line.me/',
        },
        style: 'secondary',
      },
    ],
  },
})
