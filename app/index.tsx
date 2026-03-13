import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, SafeAreaView } from "react-native";

export default function TimerScreen() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.circleDecorator} />

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        <Text style={styles.label}>{isActive ? "RUNNING" : "PAUSED"}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          activeOpacity={0.7}
          style={[styles.button, styles.resetButton]} 
          onPress={reset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          activeOpacity={0.7}
          style={[styles.button, isActive ? styles.pauseButton : styles.startButton]} 
          onPress={() => setIsActive(!isActive)}
        >
          <Text style={[styles.buttonText, { color: isActive ? '#FF453A' : '#32D74B' }]}>
            {isActive ? "Pause" : "Start"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Subtle Branding */}
      <View style={styles.footer}>
        <Text style={styles.brandingText}>AC PRODUCTION</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000", 
    justifyContent: "space-between", // Pushes footer to bottom
    alignItems: "center",
    paddingVertical: 40
  },
  circleDecorator: {
    position: 'absolute',
    top: '20%',
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 1,
    borderColor: '#1C1C1E',
  },
  timerContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: { 
    fontSize: 90, 
    fontWeight: "200", 
    color: "#fff",
    fontVariant: ['tabular-nums'],
  },
  label: {
    color: '#8E8E93',
    letterSpacing: 4,
    fontSize: 10,
    fontWeight: '700',
    marginTop: -5,
  },
  buttonRow: { 
    flexDirection: "row", 
    width: '100%', 
    justifyContent: 'space-evenly',
    marginBottom: 100
  },
  button: { 
    width: 85, 
    height: 85, 
    borderRadius: 42.5, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  startButton: { backgroundColor: "#1C2E1E" },
  pauseButton: { backgroundColor: "#2C1414" },
  resetButton: { backgroundColor: "#1C1C1E" },
  buttonText: { 
    fontSize: 16,
    fontWeight: "500",
    color: "#fff"
  },
  footer: {
    marginBottom: 10,
  },
  brandingText: {
    color: '#2C2C2E', // Very dark gray - "hidden in plain sight"
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '600',
  }
});