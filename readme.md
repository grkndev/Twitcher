# Setup
### Step 1:
> Get your app information from https://dev.twitch.tv/console
> If you don't have an app, create one

### Step 2:
> Get Copy your application's **CLIENT_ID** and **CLIENT_SECRET** information

## Paste the information you obtained
```js
import Twtitcher from "twitcher"
const client = new Twitcher({
  token:"", client_id:"YOUR CLIENT ID", client_secret:"YOUR CLIENT SECRET"
});
```
## Then run the application to get your Token information
```js
const token = client.getToken()
```

### Send the TOKEN you received to the client
```js
const client = new Twitcher({
  token:"YOUR TOKEN", client_id:"YOUR CLIENT ID", client_secret:"YOUR CLIENT SECRET"
});
```

## And u r Ready!
<hr />

# Functions
## getToken()
> Return your token information

## getClip(clipURL)
> Paramaters
- ClipURL: Twitch Clip URL

> Response
- Clip Data

### Example Usage
```js
import Twitcher from "twitcher"
let client = new Twitcher({
    token:"YOUR TOKEN",
    client_id:"YOUR CLIENT ID",
})
let clip = await client.getClip("https://clips.twitch.tv/NimbleDeadYamBIRB-drT9My-tdEwUBsZq")
console.log(clip)
```

### Example Response
```js
{
  success: true,
  streamer: {
    id: '51950404',
    login: 'wtcn',
    display_name: 'wtcN',
    type: '',
    broadcaster_type: 'partner',
    description: 'for business inquiries : ilaydaparlak@bigbosslayf.com',
    profile_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/28b40271-8bb1-4a27-9ad7-8e9a55e06180-profile_image-300x300.png',
    offline_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/dd103946-4760-46c0-8f4a-838df780baaf-channel_offline_image-1920x1080.jpeg',
    view_count: 0,
    created_at: '2013-11-22T07:16:15Z'
  },
  creator: {
    id: '571983883',
    login: 'gweepcreative',
    display_name: 'GweepCreative',
    type: '',
    broadcaster_type: '',
    description: 'Md. Backend Developer  //   @Discord Employee',
    profile_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/f618ba01-c0cb-45b1-930d-64a01b5568c9-profile_image-300x300.png',
    offline_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/fd7758e3-fdc6-4b28-9883-1da2fe560513-channel_offline_image-1920x1080.png',
    view_count: 0,
    created_at: '2020-08-24T06:51:19Z'
  },
  clip: {
    id: 'NimbleDeadYamBIRB-drT9My-tdEwUBsZq',
    url: 'https://clips.twitch.tv/NimbleDeadYamBIRB-drT9My-tdEwUBsZq',
    video_url: 'https://clips-media-assets2.twitch.tv/Xmupnna0_TMvrXRMFAbGag/40984345048-offset-2692.mp4',
    embed_url: 'https://clips.twitch.tv/embed?clip=NimbleDeadYamBIRB-drT9My-tdEwUBsZq',
    video_id: '',
    game_id: '516575',
    language: 'en',
    title: 'neeğğğğ?? (obbserver feritin aklıyla oynuyor)',
    view_count: 230,
    created_at: '2023-08-12T19:37:17Z',
    thumbnail_url: 'https://clips-media-assets2.twitch.tv/Xmupnna0_TMvrXRMFAbGag/40984345048-offset-2692-preview-480x272.jpg',
    duration: 28,
    vod_offset: null,
    is_featured: false
  }
}
```

## searchChannel(query)
> Paramaters
- query: Twitch channel name
- type: String

> Response
- Channel Data (Array)

### Example Usage
```js
import Twitcher from "twitcher"
let client = new Twitcher({
    token:"YOUR TOKEN",
    client_id:"YOUR CLIENT ID",
})
let channels = await client.searchChannel("gweepcreative")
console.log(channels)
```

### Example Response
```js
[
  {
    broadcaster_language: 'tr',
    broadcaster_login: 'gweepcreative',
    display_name: 'GweepCreative',
    game_id: '516575',
    game_name: 'VALORANT',
    id: '571983883',
    is_live: false,
    tag_ids: [],
    tags: [ 'oyun', 'ghosts', 'valorant', 'espor', 'ESports', 'Türkçe' ],
    thumbnail_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/f618ba01-c0cb-45b1-930d-64a01b5568c9-profile_image-300x300.png',
    title: 'RANKED VALO',
    started_at: ''
  },
  {
    broadcaster_language: '',
    broadcaster_login: 'gweep_creative',
    display_name: 'gweep_creative',
    game_id: '0',
    game_name: '',
    id: '606695369',
    is_live: false,
    tag_ids: [],
    tags: [],
    thumbnail_url: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/ce57700a-def9-11e9-842d-784f43822e80-profile_image-300x300.png',
    title: '',
    started_at: ''
  },
  {
    broadcaster_language: '',
    broadcaster_login: 'gweepcreative2',
    display_name: 'gweepcreative2',
    game_id: '0',
    game_name: '',
    id: '678460694',
    is_live: false,
    tag_ids: [],
    tags: [],
    thumbnail_url: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-300x300.png',
    title: '',
    started_at: ''
  },
  {
    broadcaster_language: '',
    broadcaster_login: 'gweepcreative22',
    display_name: 'gweepcreative22',
    game_id: '0',
    game_name: '',
    id: '720647790',
    is_live: false,
    tag_ids: [],
    tags: [],
    thumbnail_url: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/75305d54-c7cc-40d1-bb9c-91fbe85943c7-profile_image-300x300.png',
    title: '',
    started_at: ''
  }
]
```

## searchUserByName(query)
> Paramaters
- query: Twitch channel/user name
- type: String

> Response
- Channel/User Data

### Example Usage
```js
import Twitcher from "twitcher"
let client = new Twitcher({
    token:"YOUR TOKEN",
    client_id:"YOUR CLIENT ID",
})
let user = await client.searchUserByName("gweepcreative")
console.log(user)
```

### Example Response
```js
{
  success: true,
  data: [
    {
      id: '571983883',
      login: 'gweepcreative',
      display_name: 'GweepCreative',
      type: '',
      broadcaster_type: '',
      description: 'Md. Backend Developer  //   @Discord Employee',
      profile_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/f618ba01-c0cb-45b1-930d-64a01b5568c9-profile_image-300x300.png',
      offline_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/fd7758e3-fdc6-4b28-9883-1da2fe560513-channel_offline_image-1920x1080.png',
      view_count: 0,
      created_at: '2020-08-24T06:51:19Z'
    }
  ]
}
```

## searchUserByUserId(query)
> Paramaters
- query: Twitch channel/user id
- type: String

> Response
- Channel/User Data

### Example Usage
```js
import Twitcher from "twitcher"
let client = new Twitcher({
    token:"YOUR TOKEN",
    client_id:"YOUR CLIENT ID",
})
let user = await client.searchUserByUserId("571983883")
console.log(user)
```

### Example Response
```js
{
  success: true,
  data: [
    {
      id: '571983883',
      login: 'gweepcreative',
      display_name: 'GweepCreative',
      type: '',
      broadcaster_type: '',
      description: 'Md. Backend Developer  //   @Discord Employee',
      profile_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/f618ba01-c0cb-45b1-930d-64a01b5568c9-profile_image-300x300.png',
      offline_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/fd7758e3-fdc6-4b28-9883-1da2fe560513-channel_offline_image-1920x1080.png',
      view_count: 0,
      created_at: '2020-08-24T06:51:19Z'
    }
  ]
}
```
