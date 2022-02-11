# testapp (test-app)

A Quasar Framework app

## Install the dependencies

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
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
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## Done
I have done the following steps to bring the project to its current state. \
(Omitted steps, reverted or fixed later)

* executed command `quasar create test-app` \
  this creates a new project in directory *test-app* \
  all steps following were done in this new directory
* executed command `quasar mode add electron`
* modified the *quasar.conf.js* (see: electron section)
* modified the *package.json* (from name to devDependencies)
* added the .sh file *deb-icons.sh*
* modified *src-electron/electron-main.js* (createWindow->mainWindow->icon (line: 22))
* executed command `yarn yarn add --dev "@vue/devtools@6.0.0-beta.19"`
* modified file *src-electron/electron-preload.js*
* modified file *src/components/EssentialLink.vue*
* created file *src/storage.js*
* executed commands
  ```bash
  quasar mode add cordova
  cd src-cordova
  cordova platform add android
  ```
* modified file *scr-cordova/config.xml* (platform and plugin tags)
* created file *icon.png*
* created file *generate-icons.sh*
* executed file *generate-icons.sh* \
  replace *icon.png* (recommended size: 1024x1024, must be a .png with transparency)
  and re-run *generate-icons.sh* to replace all icons. \
  modify color hex in *generate-icons.sh* line 4 to change splashscreen background color

## filesystem locations
apps will store data at the following places (I list what I know)
* linux (ubuntu):
  * .AppImage: ~/.config/<app-name>/
