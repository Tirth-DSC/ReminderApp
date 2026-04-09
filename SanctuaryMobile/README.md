# Sanctuary Mobile - React Native CLI

This is a complete React Native CLI project structure for the Sanctuary app.

## Project Structure

```text
SanctuaryMobile/
├── android/                # Native Android configuration
├── ios/                    # Native iOS configuration (Podfile)
├── src/                    # JavaScript/TypeScript Source
│   ├── components/         # Reusable UI components
│   ├── constants/          # Theme and global constants
│   ├── screens/            # Application screens
│   └── types/              # TypeScript definitions
├── App.tsx                 # Main Application Hub
├── index.js                # JS Entry Point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── babel.config.js         # Babel configuration
└── metro.config.js         # Metro bundler configuration
```

## Getting Started

1.  **Extract the ZIP**: Download the project as a ZIP from the Settings menu.
2.  **Install Dependencies**:
    ```bash
    cd SanctuaryMobile
    npm install
    ```
3.  **iOS Setup** (macOS only):
    ```bash
    cd ios && pod install && cd ..
    ```
4.  **Run the App**:
    *   **Android**: `npm run android`
    *   **iOS**: `npm run ios`

## Note on Native Folders
The `android` and `ios` folders provided here contain the essential configuration files (`build.gradle`, `Podfile`). For a full native build, it is recommended to run `npx react-native init Sanctuary` in a separate folder and then copy these `src` and root configuration files into it.
