varying vec2 vUv;
uniform float uProgress;
uniform float uBrightness;

void main() {
    float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
    float normalizedAngle = (angle + 3.14159) / 6.28318;
    vec3 colorBlue = vec3(0.4, 0.3, 1.0);
    vec3 colorOrange = vec3(1.0, 0.5, 0.2);
    vec3 finalColor = mix(colorBlue, colorOrange, vUv.x);
    float mask = step(1.0 - uProgress, normalizedAngle);
    float headGlow = pow(normalizedAngle, 10.0) * 2.0;
    
    gl_FragColor = vec4(finalColor * (uBrightness + headGlow), mask);
}