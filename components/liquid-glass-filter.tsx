export default function LiquidGlassFilter() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <filter id="liquid-glass" x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.011 0.011" numOctaves="2" seed="14" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="3.2" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="57.1" xChannelSelector="R" yChannelSelector="G" result="dR" />
        <feColorMatrix in="dR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="cR" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="49" xChannelSelector="R" yChannelSelector="G" result="dG" />
        <feColorMatrix in="dG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="cG" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="40.9" xChannelSelector="R" yChannelSelector="G" result="dB" />
        <feColorMatrix in="dB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="cB" />
        <feBlend in="cR" in2="cG" mode="screen" result="rg" />
        <feBlend in="rg" in2="cB" mode="screen" />
      </filter>
    </svg>
  );
}
