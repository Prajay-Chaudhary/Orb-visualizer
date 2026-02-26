varying vec2 vUv;
uniform float uProgress;
uniform vec3 uColorWarm;
uniform vec3 uColorLight;
uniform float uGlowIntensity;

void main() {
    vec2 uv = vUv - 0.5;
    float angle = atan(uv.y, uv.x);
    float normalizedAngle = (angle / 6.28318) + 0.5; 
    vec3 brightPurple = vec3(0.8, 0.4, 1.0); 
    vec3 sunColor = mix(uColorWarm, uColorLight, vUv.x);
    float check = step(normalizedAngle, uProgress);
    vec3 completedPart = sunColor * uGlowIntensity * 1.0; 
    vec3 remainingPart = brightPurple * uGlowIntensity * 2.5;
    vec3 finalColor = mix(remainingPart, completedPart, check);
    float finalAlpha = mix(0.6, 1.0, check);
    finalColor += pow(finalColor, vec3(1.5)) * 0.3;
    gl_FragColor = vec4(finalColor, finalAlpha);
}