# Twitch.tv chat enhancer

Let's admit it: for most popular streams Twitch's built-in chat functionality is basically useless for anything other than seeing dozens of emote icons pass by at the speed of light at certain noteworthy moments. Although only Twitch themselves can fix that mess, this userscript aims to help a bit while being relatively easy to use.

The main functionality is that instead of having the chat messages fly through by the dozens, it will instead show you a few messages only at once and give you more time to read them. On top of that, you are able to vote "like" or "dislike" on each message, which will affect the likelihood of more messages from the same user being selected for next chat snapshots.

Note that all likes and dislikes are lost as soon as you close the window or navigate away from chat (you can keep the windows minimized on the background or similar, as long as it's still open). Given the very large number of chat messages common on Twitch and having to process all that data in real-time, long-term storage of your votes is unfeasible at this time.

## How to use

1. Install a userscript manager extension for your browser, such as [Tampermonkey](http://www.tampermonkey.net/).
2. Click [here](https://github.com/tukkek/twitch-chat-enhancer/raw/master/Twitch%20chat%20enhancer.user.js) and install the script.
3. Alternatively, right-click the link, select "Save file as..." and then import the saved file from your extension's control panel.
4. Alternatively, you can also simply create a new script and copy-paste the file content's into your brand-new script.
5. Navigate to a Twitch stream of your choice and under the chat options click "pop out chat".
6. All done! The enhanced chat should be working on the new chat window, enjoy!

Note that this userscript may break if Twitch makes significant changes to chat. Feel free to [open a bug report](https://github.com/tukkek/twitch-chat-enhancer/issues/new) if that happens.
