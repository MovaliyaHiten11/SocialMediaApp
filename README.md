# Social Media Feed App

A React Native social media application that mimics popular social media platforms with features like infinite scrolling, likes, comments, and user profiles.

## 🚀 Features

- **Feed Display**: Posts with user avatars, names, content, and images
- **Infinite Scrolling**: Seamless loading of more posts as you scroll
- **Like/Unlike**: Interactive like functionality with real-time count updates
- **Comments**: Mock comment system for each post
- **Tab Navigation**: Home, Profile, and Notifications tabs
- **Profile Management**: Edit user details and view profile information
- **Responsive Design**: Optimized for both iOS and Android

## 🛠️ Tech Stack

- **React Native**: 0.78.0
- **React Navigation**: v6 (Tab and Stack navigation)
- **Async Storage**: For local data persistence
- **React Native Vector Icons**: For UI icons
- **React Native Image Picker**: For profile image selection
- **JSON Placeholder API**: Mock data source

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/social-media-app.git
   cd social-media-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Android Setup**
   - Make sure Android Studio is installed
   - Configure Android SDK path in your environment variables
   - Create an Android Virtual Device (AVD) or connect a physical device

## 🏃‍♂️ Running the App

### Android
```bash
npx react-native run-android
```

### iOS
```bash
npx react-native run-ios
```

### Metro Bundler
```bash
npx react-native start
```

## 📁 Project Structure

```
SocialMediaApp/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── PostCard.js
│   │   ├── CommentModal.js
│   │   ├── LoadingSpinner.js
│   │   └── Avatar.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── NotificationsScreen.js
│   │   ├── EditProfileScreen.js
│   │   └── SplashScreen.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   ├── storage.js
│   │   ├── icons.js
│   │   ├── images.js
│   │   └── helpers.js
│   ├── hooks/
│   │   └── usePosts.js
│   └── styles/
│       └── globalStyles.js
├── assets/
│   └── images/
├── android/
├── ios/
├── package.json
└── README.md
```

## 🏗️ Architecture & Design Decisions

### Component Architecture
- **Functional Components**: Used throughout the app with React Hooks
- **Custom Hooks**: `usePosts` hook for managing post data and API calls
- **Modular Design**: Separate components for reusability and maintainability

### Navigation
- **React Navigation v6**: Bottom tab navigation with stack navigation
- **Three main tabs**: Home (Feed), Profile, Notifications

### State Management
- **React Hooks**: useState, useEffect, useCallback for local state
- **AsyncStorage**: For persisting user preferences and cached data
- **Context API**: For global state management (user authentication, theme)

### API Integration
- **JSONPlaceholder**: Mock API for posts, users, and comments
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Caching**: Basic caching mechanism for improved performance

### Performance Optimizations
- **FlatList**: For efficient rendering of large lists
- **Image Optimization**: Lazy loading and caching for post images
- **Memoization**: React.memo and useMemo for preventing unnecessary re-renders
- **Pagination**: Infinite scroll with batch loading

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 🔧 Build for Production

### Android APK
```bash
cd android
./gradlew assembleRelease
```

The APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`

### iOS Build
```bash
npx react-native run-ios --configuration Release
```

## 🌟 Bonus Features Implemented

- **Push Notifications**: Mock notification system
- **Profile Editing**: Complete profile management
- **Image Picker**: Profile picture selection
- **Pull-to-Refresh**: Refresh feed with pull gesture
- **Search**: Basic search functionality
- **Dark Mode**: Theme switching capability

## 🐛 Known Issues

- iOS simulator may have slower performance
- Some animations may lag on older Android devices
- Network-dependent features require internet connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Authors

- **Your Name** - *Initial work* -(https://github.com/MovaliyaHiten11/SocialMediaApp)

## 🙏 Acknowledgments

- JSONPlaceholder for providing mock API
- React Native community for excellent documentation
- All contributors who helped improve this project


