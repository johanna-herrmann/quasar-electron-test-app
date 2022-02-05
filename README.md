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
I have done the following steps to bring the project to its current state.
* executed command `quasar create test-app` \
  this creates a new project in directory *test-app* \
  all steps following were done in this new directory
* executed command `quasar mode add electron`
* added the icons in directory *src-electron/icons*
* modified the *quasar.conf.js* (see: electron->build)
* modified the *package.json* (from name to scripts)
* added the .sh file *deb-icons.sh*
* modified *src-electron/electron-main.js* (createWindow->mainWindow->icon (line: 22))
* executed command `yarn yarn add --dev "@vue/devtools@6.0.0-beta.19"`
