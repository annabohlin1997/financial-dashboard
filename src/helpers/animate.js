const clamp = (v, min, max) => Math.max(Math.min(v, max), min);

const smootherstep = (x, v0, v1) => {
  return v0 + (v1 - v0) * (x ** 3 * (x * (x * 6 - 15) + 10));
};

const animate = ({ animations, refCallBack }) => {
  const startTimeMs = Date.now();

  const completedAnimations = [];

  const animFrame = () => {
    refCallBack(
      requestAnimationFrame(() => {
        for (let [
          animationIndex,
          { timeMs, delayMs, startValue, endValue, callBack },
        ] of animations.entries()) {
          if (completedAnimations.includes(animationIndex)) continue;

          const progress = clamp(
            (Date.now() - startTimeMs - delayMs) / timeMs,
            0,
            1
          );

          if (progress === 0) {
            continue;
          } else if (progress === 1) {
            completedAnimations.push(animationIndex);
          }

          callBack(smootherstep(progress, startValue, endValue));
        }

        if (animations.length !== completedAnimations.length) {
          animFrame();
        }
      })
    );
  };

  animFrame();
};

export default animate;
