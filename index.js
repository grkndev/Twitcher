import axios from "axios";

class Twitcher {
    #token;
    #client_id;
    #client_secret;

    /*
    * Base class for Twitcher
    * @param {string} token - Twitch API token
    * @param {string} client_id - Twitch API client id
    * @param {string} client_secret - Twitch API client secret
    */
    constructor({ token, client_id, client_secret }) {
        this.#token = token;
        this.#client_id = client_id;
        this.#client_secret = client_secret;
    }

    /**
    * Get Twitch API token
    * @returns {object} - Twitch API token
    */
    async getToken() {
        let res = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${this.#client_id}&client_secret=${this.#client_secret}&grant_type=client_credentials`)
        return res.data;
    }

    /**
    * Get Twitch Clip
    * @param {string} clipURL - Twitch clip URL
    * @returns {object} - Twitch clip
    * @example
    * let clip = await client.getClip("https://clips.twitch.tv/IncredulousTastyPoxPJSugar")
    * console.log(clip)
    * // {
    * //   success: true,
    * //   streamer: {
    * //     id: '123456789',
    * //     login: 'streamer',
    * //     display_name: 'Streamer',
    * //     type: '',
    * //     broadcaster_type: 'partner',
    * //     description: 'Streamer',
    * //     profile_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/123456789-profile_image-300x300.png',
    * //     offline_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/123456789-channel_offline_image-1920x1080.png',
    * //     view_count: 123456789
    * //   },
    * //   creator: {
    * //     id: '123456789',
    * //     login: 'creator',
    * //     display_name: 'Creator',
    * //     type: '',
    * //     broadcaster_type: 'partner',
    * //     description: 'Creator',
    * //     profile_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/123456789-profile_image-300x300.png',
    * //     offline_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/123456789-channel_offline_image-1920x1080.png',
    * //     view_count: 123456789
    * //   },
    * //   clip: {
    * //     id: 'IncredulousTastyPoxPJSugar',
    * //     url: 'https://clips.twitch.tv/IncredulousTastyPoxPJSugar',
    * //     video_url: 'https://clips-media-assets2.twitch.tv/AT-cm%7C123456789.mp4',
    * //     embed_url: 'https://clips.twitch.tv/embed?clip=IncredulousTastyPoxPJSugar',
    * //     video_id: '123456789',
    * //     game_id: '123456789',
    * //     language: 'en',
    * //     title: 'Streamer',
    * //     view_count: 123456789,
    * //     created_at: '2021-01-01T00:00:00Z',
    * //     thumbnail_url: 'https://clips-media-assets2.twitch.tv/AT-cm%7C123456789-preview-480x272.jpg',
    * //     duration: 30.01,
    * //     vod_offset: 0.0,
    * //     is_featured: false
    * //   }
    * // }
    */
    async getClip(clipURL) {
        let clipId = '';
        if (clipURL.includes("https://clips.twitch.tv/")) {
            clipId = clipURL.replace("https://clips.twitch.tv/", "");
        } else if (clipURL.includes("https://www.twitch.tv/") && clipURL.includes("/clip/")) {
            clipId = clipURL.replace("https://www.twitch.tv/", "");
        }

        let res = await axios.get("https://api.twitch.tv/helix/clips?id=" + clipId, {
            headers: {
                "Authorization": `Bearer ${this.#token}`,
                "Client-Id": this.#client_id
            }
        })
        if (res.data.data.length == 0) return {
            error: "Clip not found",
            success: false
        };
        let streamerInfo = (await this.searchUserByUserId(res.data.data[0].broadcaster_id)).data[0];
        let creatorInfo = (await this.searchUserByUserId(res.data.data[0].creator_id)).data[0];
        let VideoURL = res.data.data[0].thumbnail_url.replace(/-preview.*$/, '.mp4');
        return {
            success: true,
            streamer: streamerInfo,
            creator: creatorInfo,
            clip: {
                id: res.data.data[0].id,
                url: res.data.data[0].url,
                video_url: VideoURL,
                embed_url: res.data.data[0].embed_url,
                video_id: res.data.data[0].video_id,
                game_id: res.data.data[0].game_id,
                language: res.data.data[0].language,
                title: res.data.data[0].title,
                view_count: res.data.data[0].view_count,
                created_at: res.data.data[0].created_at,
                thumbnail_url: res.data.data[0].thumbnail_url,
                duration: res.data.data[0].duration,
                vod_offset: res.data.data[0].vod_offset,
                is_featured: res.data.data[0].is_featured
            }
        }

    }

    /**
     * Get Game
     * @param {Number} game_id - Twitch game id
     * @returns {object} - Twitch Game
     * @example
     * let game = await client.getGameById("123456789")
     * console.log(game)
     * //response:
     * {
            "data": [
                {
                    "id": "33214",
                    "name": "Fortnite",
                    "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/33214-{width}x{height}.jpg",
                    "igdb_id": "1905"
                }
                ...
            ],
            "pagination": {
            "cursor": "eyJiIjpudWxsLCJhIjp7IkN"
        }
     */
    async getGameById(game_id) {
        if (typeof game_id !== "number") {
            game_id = Number(game_id)
            if (isNaN(game_id)) return {
                error: "Game id must be number",
                success: false
            }
        }
        const res = await axios.get("https://api.twitch.tv/helix/games?id=" + game_id, {
            headers: {
                Authorization: `Bearer ${this.#token}`,
                "Client-Id": this.#client_id
            }
        });
        if (res.data.data.length == 0) return {
            error: "Game not found",
            success: false
        }
        return {
            success: true,
            data: res.data.data
        }
    }

    /**
     * Get Game
     * @param {string} game_name - Twitch game name
     * @returns {object} - Twitch Game
     * @example
     * let game = await client.getGameByName("Fortnite")
     * console.log(game)
     * //response:
     * {
     *  success: true,
     * data: [
     * {
     * id: '33214',
     * name: 'Fortnite',
     * box_art_url: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-{width}x{height}.jpg',
     * igdb_id: '1905'
     * }
     * ]
     * }
     */
    async getGameByName(game_name) {
        const res = await axios.get("https://api.twitch.tv/helix/games?name=" + game_name, {
            headers: {
                Authorization: `Bearer ${this.#token}`,
                "Client-Id": this.#client_id
            }
        });
        if (res.data.data.length == 0) return {
            error: "Game not found",
            success: false
        }
        return {
            success: true,
            data: res.data.data
        }
    }

    /**
    * Search Twitch Channel
    * @param {string} channelName - Twitch channel name
    * @returns {object} - Twitch channel
    * @example
    * let channel = await client.searchChannel("Streamer")
    * console.log(channel)
    * //[
  //{
   // broadcaster_language: 'tr',
  //  broadcaster_login: 'gweepcreative',
  //  display_name: 'GweepCreative',
  //  game_id: '516575',
  //  game_name: 'VALORANT',
 //   id: '571983883',
  //  is_live: false,
  //  tag_ids: [],
  //  tags: [ 'oyun', 'ghosts', 'valorant', 'espor', 'ESports', 'Türkçe' ],
  //  thumbnail_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures///f618ba01-c0cb-45b1-930d-64a01b5568c9-profile_image-300x300.png',
  //  title: 'RANKED VALO',
  //  started_at: ''
 // },
 // {
  //  broadcaster_language: '',
  //  broadcaster_login: 'gweep_creative',
  //  display_name: 'gweep_creative',
  //  game_id: '0',
  //  game_name: '',
   // id: '606695369',
   // is_live: false,
  //  tag_ids: [],
  //  tags: [],
  //  thumbnail_url: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/ce57700a-def9-11e9-842d-784f43822e80-profile_image-300x300.png',
  //  title: '',
 //   started_at: ''
 // },
  // ...
]
    */
    async searchChannel(channelName) {
        const res = await axios.get("https://api.twitch.tv/helix/search/channels?query=" + channelName, {
            headers: {
                Authorization: `Bearer ${this.#token}`,
                "Client-Id": this.#client_id
            }
        });
        return res.data.data;

    }

    /**
     * Search Twitch User
     * @param {string} userName - Twitch user name
     * @returns {object} - Twitch user
     * @example
     * let user = await client.searchUserByName("Streamer")
     * console.log(user)
     * // {
     * //   success: true,
     * //   data: [
     * //     {
     * //       id: '123456789',
     * //       login: 'streamer',
     * //       display_name: 'Streamer',
     * //       type: '',
     * //       broadcaster_type: 'partner',
     * //       description: 'Streamer',
     * //       profile_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/123456789-profile_image-300x300.png',
     * //       offline_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/123456789-channel_offline_image-1920x1080.png',
     * //       view_count: 123456789
     * //     }
     * //   ]
     * // }
     */
    async searchUserByName(userName) {
        const res = await axios.get("https://api.twitch.tv/helix/users?login=" + userName, {
            headers: {
                Authorization: `Bearer ${this.#token}`,
                "Client-Id": this.#client_id
            }
        });
        if (res.data.data.length == 0) return {
            error: "User not found",
            success: false
        }
        return {
            success: true,
            data: res.data.data
        };
    }

    /**
     * Search Twitch User
     * @param {string} userId - Twitch user id
     * @returns {object} - Twitch user
     * @example
     * let user = await client.searchUserByUserId("123456789")
     * console.log(user)
     * // {
     * //   success: true,
     * //   data: [
     * //     {
     * //       id: '123456789',
     * //       login: 'streamer',
     * //       display_name: 'Streamer',
     * //       type: '',
     * //       broadcaster_type: 'partner',
     * //       description: 'Streamer',
     * //       profile_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/123456789-profile_image-300x300.png',
     * //       offline_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/123456789-channel_offline_image-1920x1080.png',
     * //       view_count: 123456789
     * //     }
     * //   ]
     * // }
     */
    async searchUserByUserId(userId) {
        const res = await axios.get("https://api.twitch.tv/helix/users?id=" + userId, {
            headers: {
                Authorization: `Bearer ${this.#token}`,
                "Client-Id": this.#client_id
            }
        });
        if (res.data.data.length == 0) return {
            error: "User not found",
            success: false
        }
        return {
            success: true,
            data: res.data.data
        };
    }
}
export default Twitcher;