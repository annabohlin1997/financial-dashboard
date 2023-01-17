const clamp = (v, min, max) => Math.max(Math.min(v, max), min);

const smootherstep = (x, v0, v1) => {
  return v0 + (v1 - v0) * (x ** 3 * (x * (x * 6 - 15) + 10));
};

const animate = ({ animTimeMs, animations, refCallBack }) => {
  const animStartTime = Date.now();

  const animFrame = () => {
    const animProgress = clamp((Date.now() - animStartTime) / animTimeMs, 0, 1);

    refCallBack(
      requestAnimationFrame(() => {
        for (let animation of animations) {
          animation.animCallBack(
            smootherstep(animProgress, animation.animStartV, animation.animEndV)
          );
        }

        if (animProgress < 1) {
          animFrame();
        }
      })
    );
  };

  animFrame();
};

export default animate;
