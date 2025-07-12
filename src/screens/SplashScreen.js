import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Easing,
  Image,
} from 'react-native';
import {Colors, Typography} from '../styles/globalStyles';
import Icons from '../utils/icons';
import { MainLogo } from '../utils/images';

const {width, height} = Dimensions.get('window');

const SplashScreen = ({onFinish}) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Main animations
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const backgroundScale = useRef(new Animated.Value(1.5)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  
  // Text animations
  const titleSlideX = useRef(new Animated.Value(-width)).current;
  const subtitleSlideX = useRef(new Animated.Value(width)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineScale = useRef(new Animated.Value(0.8)).current;
  
  // Progress and loading
  const progressWidth = useRef(new Animated.Value(0)).current;
  const loadingDots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];
  
  // Particle system
  const particles = Array.from({length: 12}, () => ({
    translateY: useRef(new Animated.Value(height + 100)).current,
    translateX: useRef(new Animated.Value(Math.random() * width)).current,
    opacity: useRef(new Animated.Value(0)).current,
    scale: useRef(new Animated.Value(0)).current,
    rotation: useRef(new Animated.Value(0)).current,
  }));

  // Ripple effect
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    startSplashSequence();
    
    const timer = setTimeout(() => {
      onFinish();
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const startSplashSequence = () => {
    // Step 1: Background fade in
    Animated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Step 2: Background scale animation
    Animated.timing(backgroundScale, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    // Step 3: Logo entrance with bounce
    setTimeout(() => {
      setCurrentStep(1);
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 80,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]).start();

      // Ripple effect
      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 4,
          duration: 1200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]).start();
    }, 300);

    // Step 4: Text animations
    setTimeout(() => {
      setCurrentStep(2);
      
      // Title slides in from left
      Animated.spring(titleSlideX, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();

      // Subtitle slides in from right with delay
      setTimeout(() => {
        Animated.spring(subtitleSlideX, {
          toValue: 0,
          tension: 80,
          friction: 10,
          useNativeDriver: true,
        }).start();
      }, 200);

      // Tagline fades in
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(taglineOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(taglineScale, {
            toValue: 1,
            tension: 150,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      }, 600);
    }, 800);

    // Step 5: Particles and loading
    setTimeout(() => {
      setCurrentStep(3);
      startParticleAnimation();
      startLoadingAnimation();
      
      // Progress bar
      Animated.timing(progressWidth, {
        toValue: width - 80,
        duration: 1800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }, 1200);
  };

  const startParticleAnimation = () => {
    particles.forEach((particle, index) => {
      const animateParticle = () => {
        // Reset particle
        particle.translateY.setValue(height + 50);
        particle.opacity.setValue(0);
        particle.scale.setValue(0);
        particle.rotation.setValue(0);
        particle.translateX.setValue(Math.random() * width);

        // Animate particle up
        Animated.parallel([
          Animated.timing(particle.translateY, {
            toValue: -100,
            duration: 2000 + Math.random() * 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(particle.opacity, {
              toValue: 0.8,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0,
              duration: 800,
              delay: 500,
              useNativeDriver: true,
            }),
          ]),
          Animated.spring(particle.scale, {
            toValue: 1,
            tension: 200,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(particle.rotation, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setTimeout(animateParticle, Math.random() * 1000);
        });
      };

      setTimeout(animateParticle, index * 100);
    });
  };

  const startLoadingAnimation = () => {
    const animateDots = () => {
      loadingDots.forEach((dot, index) => {
        setTimeout(() => {
          Animated.sequence([
            Animated.timing(dot, {
              toValue: 1,
              duration: 300,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0,
              duration: 300,
              easing: Easing.in(Easing.cubic),
              useNativeDriver: true,
            }),
          ]).start();
        }, index * 150);
      });
    };

    animateDots();
    const interval = setInterval(animateDots, 1200);
    
    setTimeout(() => clearInterval(interval), 3000);
  };

  const logoRotationInterpolate = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" hidden />
      
      {/* Animated Background */}
      <Animated.View 
        style={[
          styles.backgroundGradient,
          {
            opacity: backgroundOpacity,
            transform: [{scale: backgroundScale}],
          },
        ]}>
        <View style={styles.gradientOverlay} />
      </Animated.View>

      {/* Ripple Effect */}
      <View style={styles.rippleContainer}>
        <Animated.View
          style={[
            styles.ripple,
            {
              opacity: rippleOpacity,
              transform: [{scale: rippleScale}],
            },
          ]}
        />
      </View>

      {/* Particles */}
      <View style={styles.particleContainer}>
        {particles.map((particle, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                opacity: particle.opacity,
                transform: [
                  {translateX: particle.translateX},
                  {translateY: particle.translateY},
                  {scale: particle.scale},
                  {
                    rotate: particle.rotation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoSection}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [
                  {scale: logoScale},
                  {rotate: logoRotationInterpolate},
                ],
              },
            ]}>
            <View style={styles.logoInner}>
                <Image source={MainLogo} style={styles.logo}/>
            </View>
            <View style={styles.logoGlow} />
          </Animated.View>
        </View>

        {/* Text Content */}
        <View style={styles.textSection}>
          <Animated.View
            style={[
              styles.titleContainer,
              {transform: [{translateX: titleSlideX}]},
            ]}>
            <Text style={styles.appTitle}>Social</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.subtitleContainer,
              {transform: [{translateX: subtitleSlideX}]},
            ]}>
            <Text style={styles.appSubtitle}>Media</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.taglineContainer,
              {
                opacity: taglineOpacity,
                transform: [{scale: taglineScale}],
              },
            ]}>
            <Text style={styles.tagline}>Connect • Share • Discover</Text>
          </Animated.View>
        </View>
      </View>

      {/* Loading Section */}
      <View style={styles.loadingSection}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                {width: progressWidth},
              ]}
            />
          </View>
        </View>

        {/* Loading Dots */}
        <View style={styles.dotsContainer}>
          {loadingDots.map((dot, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  transform: [{scale: dot}],
                  opacity: dot,
                },
              ]}
            />
          ))}
        </View>

        <Text style={styles.loadingText}>
          {currentStep === 0 && 'Initializing...'}
          {currentStep === 1 && 'Loading Resources...'}
          {currentStep === 2 && 'Preparing Experience...'}
          {currentStep >= 3 && 'Almost Ready...'}
        </Text>
      </View>

      {/* Version */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>v1.0.0 • React Native 0.78</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  backgroundGradient: {
    position: 'absolute',
    width: width * 2,
    height: height * 2,
    top: -height * 0.5,
    left: -width * 0.5,
    backgroundColor: Colors.primary,
    borderRadius: width,
  },
  gradientOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  rippleContainer: {
    position: 'absolute',
    top: height * 0.5 - 100,
    left: width * 0.5 - 100,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  particleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: Colors.white,
    borderRadius: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    position: 'relative',
  },
  logoInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 2,
  },
    logo: {
    width: 90,
    height: 90,
    borderRadius:50
  },
  logoGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -10,
    left: -10,
    zIndex: 1,
  },
  textSection: {
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 5,
  },
  appTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  subtitleContainer: {
    marginBottom: 20,
  },
  appSubtitle: {
    fontSize: 42,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 2,
  },
  taglineContainer: {
    marginBottom: 30,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1.5,
    fontWeight: '400',
  },
  loadingSection: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  progressContainer: {
    width: width - 80,
    marginBottom: 20,
  },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 2,
    shadowColor: Colors.white,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginHorizontal: 4,
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1,
  },
  versionContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
});

export default SplashScreen;