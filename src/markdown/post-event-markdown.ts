import type {HydratedFeedItemPreHtml} from '../types'

export default ({event, permalink}: HydratedFeedItemPreHtml) => `
# [Slides: ${event.data.title}](${permalink})

${event.data.banner && `<img src="${event.data.banner}" style="width:500px"/>`}
<br>
Special thanks to our presenters:
<br><br>

${event.presentations.map(p => `* ${p.speaker.data.name} - ${p.data.title} - [slides](${p.data.slides})`).join('\n')}
`
