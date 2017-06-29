/**
 * Created by henryjohnson on 6/22/17.
 */

/*
 Configuration information for Twitter API authorization. DO NOT push this to github
 Note: rename this file to twitter.js to match the require AND move to /config folder

 authTwitter/callback ???
 */

const Twitter = {
    CONSUMER_KEY: 'rFGT3DYe8cpfD0B6BguZ8ilHh',
    CONSUMER_SECRET: 'vZXN95NRIFaR9W3o4ES3qQUvH907JvKucvR5FAB7yoFjQfUF2q',
    OWNER_ID: '856922216386134016',
    CALLBACK_URL: 'http://localhost:3000/',
    REQ_TOKEN_URL: 'https://api.twitter.com/oauth/request_token',
    AUTHORIZE_URL: 'https://api.twitter.com/oauth/authorize',
    ACCESS_TOKEN_URL: 'https://api.twitter.com/oauth/access_token'
}

module.exports = Twitter