# Sanctuary - Proper React Native Structure

This project follows a professional React Native structure with clear separation of concerns.

## Project Structure

```text
react-native-sanctuary/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── BentoCards.tsx
│   │   ├── BottomNav.tsx
│   │   ├── TaskItem.tsx
│   │   └── TopBar.tsx
│   ├── constants/       # App-wide constants
│   │   └── theme.ts     # Design tokens (colors, spacing)
│   ├── screens/         # Main application screens
│   │   ├── HistoryScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── TasksScreen.tsx
│   └── types/           # TypeScript definitions
│       └── index.ts
├── App.tsx              # Entry point & Navigation logic
└── README.md
```

## Setup Instructions

1.  **Create a new React Native project**:
    ```bash
    npx react-native init Sanctuary
    ```

2.  **Install dependencies**:
    ```bash
    npm install lucide-react-native react-native-svg react-native-safe-area-context react-native-linear-gradient
    ```

3.  **Copy files**:
    *   Copy the `src` folder and `App.tsx` into your project root.

4.  **Run the app**:
    *   **iOS**: `npx react-native run-ios`
    *   **Android**: `npx react-native run-android`

## Exporting as ZIP
To download these files, click the **Settings** icon in the top right of the AI Studio interface and select **Export to ZIP**.
