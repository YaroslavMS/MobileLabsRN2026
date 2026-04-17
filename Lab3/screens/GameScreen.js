import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated as RNAnimated } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView, Directions } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS, withSequence, withDelay } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { GameContext } from '../context/GameContext'; 

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const { score, addPoints, settings } = useContext(GameContext);
  const [pulseAnim] = useState(new RNAnimated.Value(1));
  const [lastAction, setLastAction] = useState('');
  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    if (showEffect) {
      const timer = setTimeout(() => setShowEffect(false), 500);
      return () => clearTimeout(timer);
    }
  }, [showEffect]);

  const triggerEffect = (action, points) => {
    setLastAction(`${action} +${points}`);
    setShowEffect(true);
  };

  const handleAction = (points, type, actionName) => {
    addPoints(points, type);
    runOnJS(triggerEffect)(actionName, points);
    runOnJS(animatePulse)();
  };

  const animatePulse = () => {
    RNAnimated.sequence([
      RNAnimated.timing(pulseAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      RNAnimated.timing(pulseAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleRandomSwipe = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    addPoints(random, 'swipes');
    runOnJS(triggerEffect)('Свайп', random);
    runOnJS(animatePulse)();
  };

  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => { offset.value = { x: e.translationX + start.value.x, y: e.translationY + start.value.y }; })
    .onEnd(() => { start.value = { x: offset.value.x, y: offset.value.y }; });

  const flingGesture = Gesture.Fling().direction(Directions.RIGHT | Directions.LEFT)
    .onEnd(() => { runOnJS(handleRandomSwipe)(); });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => { scale.value = savedScale.value * e.scale; })
    .onEnd(() => { 
      runOnJS(handleAction)(5, 'pinches', 'Розтягнення'); 
      scale.value = withSpring(1); 
      savedScale.value = 1; 
    });

  const singleTap = Gesture.Tap()
    .onEnd(() => { 
      glowOpacity.value = withSequence(
        withSpring(1),
        withDelay(200, withSpring(0.3))
      );
      runOnJS(handleAction)(1, 'clicks', 'Торкання'); 
    });
    
  const doubleTap = Gesture.Tap().numberOfTaps(2)
    .onEnd(() => { 
      glowOpacity.value = withSequence(
        withSpring(1),
        withDelay(200, withSpring(0.3))
      );
      runOnJS(handleAction)(10, 'doubleClicks', 'Подвійний квант'); 
    });
    
  const longPress = Gesture.LongPress().minDuration(800)
    .onEnd(() => { 
      glowOpacity.value = withSequence(
        withSpring(1),
        withDelay(400, withSpring(0.3))
      );
      runOnJS(handleAction)(50, 'longPresses', 'Квантовий імпульс'); 
    });

  const composedGesture = Gesture.Race(
    flingGesture, 
    panGesture, 
    pinchGesture, 
    Gesture.Exclusive(doubleTap, singleTap, longPress)
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value.x }, 
      { translateY: offset.value.y }, 
      { scale: scale.value }
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const bgColor = settings.darkTheme ? '#0a0a0a' : '#f0f4ff';
  const cardBg = settings.darkTheme ? '#1a1a2a' : '#fff';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <LinearGradient
          colors={['#0a0a2a', '#1a1a4a']}
          style={[styles.scoreBadge, { backgroundColor: cardBg }]}
        >
          <Text style={styles.scoreLabel}>⚛️ Квантова енергія</Text>
          <Text style={styles.scoreText}>{score}</Text>
        </LinearGradient>

        {showEffect && (
          <View style={styles.effectContainer}>
            <Text style={styles.effectText}>✨ {lastAction} ⚡</Text>
          </View>
        )}

        <View style={styles.gameBox}>
          <GestureDetector gesture={composedGesture}>
            <Animated.View style={[styles.target, animatedStyle]}>
              <Animated.View style={[styles.glow, glowStyle]} />
              <LinearGradient
                colors={['#00d4ff', '#0099cc', '#006699']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.targetGradient}
              >
                <RNAnimated.Text style={[styles.targetText, { transform: [{ scale: pulseAnim }] }]}>
                  ⚛️
                </RNAnimated.Text>
                <Text style={styles.targetSubtext}>КВАНТОВИЙ КУБ</Text>
              </LinearGradient>
            </Animated.View>
          </GestureDetector>
        </View>

        <View style={[styles.hintContainer, { backgroundColor: cardBg }]}>
          <Text style={styles.hintTitle}>📡 Квантові взаємодії:</Text>
          <Text style={styles.hint}>
            ⚛️ Торкання → +1 енергія{"\n"}
            ✨ Подвійний квант → +10 енергія{"\n"}
            💫 Квантовий імпульс (0.8с) → +50 енергія{"\n"}
            🌊 Свайп → випадкова енергія{"\n"}
            🔮 Розтягнення → +5 енергія
          </Text>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center' 
  },
  scoreBadge: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
  },
  scoreText: { 
    fontSize: 42, 
    fontWeight: 'bold', 
    color: '#00d4ff',
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  effectContainer: {
    position: 'absolute',
    top: 120,
    zIndex: 10,
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#00d4ff',
  },
  effectText: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  gameBox: { 
    flex: 1, 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  target: {
    width: 200,
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  glow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: 44,
    backgroundColor: '#00d4ff',
  },
  targetGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetText: { 
    color: '#fff', 
    fontWeight: '900', 
    fontSize: 64,
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  targetSubtext: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
    letterSpacing: 2,
  },
  hintContainer: {
    marginHorizontal: 20,
    marginBottom: 40,
    padding: 16,
    borderRadius: 16,
    width: width - 40,
  },
  hintTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 10,
  },
  hint: { 
    fontSize: 13, 
    lineHeight: 22,
    color: '#888',
  },
});