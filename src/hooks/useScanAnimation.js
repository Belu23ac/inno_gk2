import { useRef, useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import SAMPLE_BEERS from './MockBeers';

export default function useScanAnimation() {
  const scanAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, []);

  const startScan = (onFinish) => {
    setIsScanning(true);
    scanAnim.setValue(0);

    const cycle = Animated.sequence([
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scanAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);

    const loopAnim = Animated.loop(cycle, { iterations: 1 });
    animationRef.current = loopAnim;

    loopAnim.start(() => {
      animationRef.current = null;
      setIsScanning(false);

      // Pick a random beer and call onFinish
      const beer = SAMPLE_BEERS[Math.floor(Math.random() * SAMPLE_BEERS.length)];
      if (typeof onFinish === 'function') onFinish(beer);
    });
  };

  const stopScan = () => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
    setIsScanning(false);
  };

  return { scanAnim, isScanning, startScan, stopScan };
}
