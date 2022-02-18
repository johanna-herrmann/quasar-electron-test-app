# testapp (test-app)

A Quasar Framework test-app (for proof of concept)

## Prerequisites
* On Windows systems: install git bash
* you will need imageMagic to be installed, to use the tool, named convert
  * check: run command `convert --version` \
    if it fails, install imageMagic
  * installation
    * windows: Download [imageMagic](https://imagemagick.org/script/download.php) and install it. \
      Remember to check the checkbox: "install legacy utils (e.g. convert)"
    * linux: install imageMagic via default package manager (apt-get, yum, etc.) \
      debian/ubuntu example: `sudo apt install imageMagic` \
      redhat example: `sudo yum install imageMagic`
    * mac: install imageMagic via homebrew: `brew install imageMagic`
* Install NPM (version >= 14) and yarn (version  >= 1)
* make sure that the [Yarn global install location](https://classic.yarnpkg.com/en/docs/cli/global/) is in your $PATH environment variable
* Run following commands to install quasar, cordova and icongenie globally:
  ```
  yarn add -g quasar
  yarn add -g cordova
  yarn add -g icongenie
  ```
* [Install AndroidStudio](https://quasar.dev/quasar-cli/developing-cordova-apps/preparation) \
  important: also add path to $ANDROID_SDK_ROOT/emulator to your $PATH environment variable
* Setup your android device (enable USB-Debugging)
* Connect your Android Smartphone via USB
* Open Android Studio and select your smartphone as physical device

## Remote Debugging Android apps on dev
On development mode (`yarn dev:android`) you can remote debug your application following the steps below:
* run app in development mode with `yarn dev:android`
* Open Chrome and go to chrome://inspect/#devices
* Below *Remote Target* click on the linked name of your application
* Now you can debug your app via Chrome Devtools, using your desktop.

## Install the dependencies

```bash
# simple
yarn i

# clean
yarn ci
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
# desktop
yarn dev:desktop

# android (smartphone must be connected via usb)
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
  cordova plugin add cordova-plugin-file
  cordova plugin add cordova.plugins.diagnostic
  cd -

  # install dependencies
  yarn add --dev "@vue/devtools@6.0.0-beta.19"
  yarn add pouchdb
  yarn add pouchdb-adapter-cordova-sqlite
  yarn add fs
  ```
* modified/created following files
  * modified .gitignore
  * created *./scripts* directory with shell scripts *generate-icons.sh* and *unpkg.sh* \
    (see comments in script files)
  * modified *./package.json* (from name to scripts) \
    (change name and other metadata to match your projects properties)
  * modified the *./quasar.conf.js* (see: electron section) \
    (change category and other metadata to match your projects properties)
  * modified *./src-electron/electron-main.js* (createWindow->mainWindow->icon (line: 22))
  * created icon *./icon.png* (at least 512x512, png, with transparency)
  * modified file *./scr-cordova/config.xml* (platform and plugin tags, mainly for icons)
  * modified file *./scr-electron/electron-preload.js* (added electronApi binding for fs)
  * created file *./src/storage/storage.js* (add and get functions for local pouchdb storage)
  * created file *./src/files/fileAccess.js* (add and get functions for local pouchdb storage)
  * modified file *./src/components/App.vue* (to simply test some things)
* executed file *./scripts/generate-icons.sh* \
  replace *./icon.png* (recommended size: 1024x1024, must be a .png with transparency)
  and re-run *./scripts/generate-icons.sh* to replace all icons. \
  modify color hex in *generate-icons.sh* line 4 to change splashscreen background color

## filesystem locations
apps will store data at the following places (I list what I know at the moment)
* linux (ubuntu):
  * .AppImage: ~/.config/<app-name>/
