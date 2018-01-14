# fireChat

> Real-time chat app using VueJS Vuex and Firebase. This's a simple implementation with more modifications coming soon :)

## Installation

1. Clone the repository to `<yourdocumentroot>`

  ```bash
  git clone https://github.com/giddyeffects/rtchat.git <yourdocumentroot>`
  ```

2. Change directory to `<yourdirectoryroot>` and create a **config.js** file in the **src** folder with the contents
```javascript
  // Firebase config
  const config = {
    apiKey: "<Your API KEY>",
    authDomain: "<your-project-id>.firebaseapp.com",
    databaseURL: "https://<your-project-id>.firebaseio.com",
    projectId: "<your-project-id>",
    storageBucket: "",
    messagingSenderId: "<Your Messaging Sender ID>"
  };

  export default config
  ```
  3. Install dependencies and serve/build project

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

