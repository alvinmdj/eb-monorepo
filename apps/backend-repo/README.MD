# Backend repo

## Run app

```bash
# with firebase emulators functions
npm run emulator
# base url should be: http://127.0.0.1:5001/<project-id>/us-central1/api

# dev mode
npm run dev
# base url: localhost:4000
```

## Setup firebase

in order to utilize firebase in a node.js app, we need to generate service account json.

after creating a firebase project, we can generate the service account from `project settings` => `service accounts` => `generate new private key`.

save and put it to the root project directory, rename as `serviceAccountKey.json`.

after that, we can reference it inside `config/firebaseConfig.ts`.

## Run local emulator

```bash
# install firebase: https://firebase.google.com/docs/cli#mac-linux-npm
npm i -g firebase-tools


# ref: https://firebase.google.com/docs/emulator-suite/install_and_configure

# login to firebase cli
firebase login

# init
firebase init

# init emulators (if needed)
firebase init emulators
```
