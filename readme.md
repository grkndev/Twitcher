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
### getToken()
> Return your token information

### getClip(clipURL)
> 
