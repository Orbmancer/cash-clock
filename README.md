# Cash Clock :moneybag: / :hourglass:

Whether you are launching a startup, a blog, a t-shirt brand, a music band or whatever, you don’t make enough money at first.

This adventure is limited by the amount of cash you have right now. Therefore you are limited in time by your cash consumption.

Track this time left using this Chrome extension :rocket:

## Contributing

The images come from [Unsplash](https://unsplash.com). They are generated using their api, then stored in `backgrounds.json` with a curl command:
```bash
curl "https://api.unsplash.com/search/photos?query=landscape" > backgrounds.json
```

Propose a pull request if you offer a better image pack :wink:

The `dist/` package is where the extension lives. The main app code is contained in `/app.js`. Launch webpack to write the javascript bundle `dist/bundle.js`, using:
```bash
npm start
```

## Roadmap

The features below might be implemented in the future. Tell me which ones do you need to have !
- random motivational quote
- picture location
- multiple projects tracking
- picture base refresh without upgrading the extension

## The author

[Damien BRY](https://damien-bry.com) - launching [mentorleo.co](https://mentorleo.co) a community of developers mentored by professionals :heart:

**“Build and learn something everyday”**

Fast learner, creative full stack developer
Twitter: [@Orbmancer](https://twitter.com/Orbmancer)
Medium: [@orbmancer](https://medium.com/@orbmancer)
LinkedIn: [damienbry](https://www.linkedin.com/in/damienbry/)

