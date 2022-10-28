# Preface
Are you tired of using those commercial music bots that always need a paywall to actually work? Then it's time to host your own!

Search no further: **Funny Discord Music Player is for you!** 😎😍✌️👌😉😏

# Introduction
A lightweight, feature-packed and fun-themed alternative music player for Discord.

Based on **[discord-player](https://github.com/Androz2091/discord-player)**.

This bot is meant to be self-hosted.

# Features
- Simple & easy to use 🤘
- Beginner friendly 😎
- Audio filters 🎸
- Lightweight ☁️
- Custom extractors support 🌌
- Multiple sources support ✌
- Does not inject anything to discord.js or your discord.js client 💉
- God-tier queue control 👑

# Setting Up
<!-- [![downloadsBadge](https://img.shields.io/badge/Download-npmjs-brightgreen)](https://npmjs.com/funny-discord-music-bot) -->
<!-- [![versionBadge](https://img.shields.io/npm/v/discord-player?style=for-the-badge)](https://npmjs.com/discord-player)
[![discordBadge](https://img.shields.io/discord/558328638911545423?style=for-the-badge&color=7289da)](https://androz2091.fr/discord)
[![wakatime](https://wakatime.com/badge/github/Androz2091/discord-player.svg)](https://wakatime.com/badge/github/Androz2091/discord-player)
[![CodeFactor](https://www.codefactor.io/repository/github/androz2091/discord-player/badge/v5)](https://www.codefactor.io/repository/github/androz2091/discord-player/overview/v5) -->

## Installation

### Clone the project

```sh
$ git clone https://github.com/nhdtxdy/Funny-Discord-Music-Player
```

### Install the necessary packages
```sh
$ npm i
```

### Install FFmpeg or Avconv
- Official FFMPEG Website: **[https://www.ffmpeg.org/download.html](https://www.ffmpeg.org/download.html)**

- Node Module (FFMPEG): **[https://npmjs.com/package/ffmpeg-static](https://npmjs.com/package/ffmpeg-static)**

- Avconv: **[https://libav.org/download](https://libav.org/download)**

## Getting Started

First of all, you need to have a Discord developer account. Get started on [Discord Developer Portal](https://discord.com/developers/applications).

Then, create an application and give it the necessary permissions. Copy the app's **token** and put it in `config.json`.

```json
{
    "prefix": "!",
    "token": "", <--- your token here
    "bannedFiles": []
}
```

Now you can start the bot:

```sh
$ node index.js
```
