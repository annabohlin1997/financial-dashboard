const clamp = (v, min, max) => Math.max(Math.min(v, max), min);

const smootherstep = (x, v0, v1) => {
  return v0 + (v1 - v0) * (x ** 3 * (x * (x * 6 - 15) + 10));
};

const animate = ({ animations, refCallBack }) => {
  const animStartTime = Date.now();

  const completedAnimations = [];

  const animFrame = () => {
    refCallBack(
      requestAnimationFrame(() => {
        for (let [animationIndex, animation] of animations.entries()) {
          if (completedAnimations.includes(animationIndex)) continue;

          const animProgress = clamp(
            (Date.now() - animStartTime - animation.animDelayMs) /
              animation.animTimeMs,
            0,
            1
          );

          if (animProgress === 0) {
            continue;
          } else if (animProgress === 1) {
            completedAnimations.push(animationIndex);
          }

          animation.animCallBack(
            smootherstep(animProgress, animation.animStartV, animation.animEndV)
          );
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
