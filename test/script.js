import Twitcher from "../index.js";
const client = new Twitcher({
    token: "", client_id: "", client_secret: ""
})
let user = await client.searchChannel("gweepcreative")
console.log(user)