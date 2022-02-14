# testapp (test-app)

A Quasar Framework test-app (for proof of concept)

## Install the dependencies

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
# desktop
yarn dev:desktop

# android
yarn dev:android
```

### Lint the files

```bash
yarn lint
```

### Format the files

```bash
yarn format
```

### Build the app for production

```bash
# desktop
quasar build -m electron
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## Done
steps done, to bring this project to current state (ordered, categorized and condensed)
* executed following commands
  ```bash
  # create new app in directory, named test-app
  quasar create test-app

  # add and prepare platforms
  quasar mode add electron
  quasar mode add cordova
  cd src-cordova
  cordova platform add android
  cordova plugin add cordova-sqlite-storage
  cd -

  # install dependencies
  yarn add --dev "@vue/devtools@6.0.0-beta.19"
  yarn add pouchdb
  yarn add pouchdb-adapter-cordova-sqlite
  ```
* modified/created following files
  * created *./scripts* directory with shell scripts *generate-icons.sh* and *unpkg.sh* \
    (see comments in script files)
  * modified *./package.json* (from name to scripts) \
    (change name and other metadata to match your projects properties)
  * modified the *./quasar.conf.js* (see: electron section) \
    (change category and other metadata to match your projects properties)
  * modified *./src-electron/electron-main.js* (createWindow->mainWindow->icon (line: 22))
  * created icon *./icon.png* (at least 512x512, png, with transparency)
  * modified file *./scr-cordova/config.xml* (platform and plugin tags, mainly for icons)
  * created file *./src/storage/storage.js* (add and get functions for local pouchdb storage)
  * modified file *./src/components/EssentialLink.vue* (to test the storage functions)
* executed file *./scripts/generate-icons.sh* \
  replace *./icon.png* (recommended size: 1024x1024, must be a .png with transparency)
  and re-run *./scripts/generate-icons.sh* to replace all icons. \
  modify color hex in *generate-icons.sh* line 4 to change splashscreen background color

## filesystem locations
apps will store data at the following places (I list what I know at the moment)
* linux (ubuntu):
  * .AppImage: ~/.config/<app-name>/
