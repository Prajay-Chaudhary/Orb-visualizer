uniform float uProgress;
uniform vec3 uColorWarm;
uniform vec3 uColorLight;

varying vec3 vPos;

void main() {
    float angle = atan(vPos.y, vPos.x);
    float normalizedAngle = fract((angle / 6.28318) + 0.75);
    if (normalizedAngle > uProgress) discard;
    float headGlow = pow(normalizedAngle / uProgress, 6.0);
    float fade = smoothstep(0.0, 0.1, normalizedAngle);
    vec3 color = mix(uColorWarm, uColorLight, headGlow);
    gl_FragColor = vec4(color * (1.2 + headGlow), fade * 0.8);
}