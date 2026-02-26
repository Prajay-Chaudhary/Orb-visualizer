varying vec3 vNormal;
uniform float uTime;
uniform float uIntensity;

float noise(vec3 p) {
  return sin(p.x * 2.0 + uTime) * cos(p.y * 2.1 + uTime * 1.2) * 0.15;
}

void main() {
  vNormal = normalize(normalMatrix * normal);
  float mask = pow(clamp(dot(vNormal, vec3(0,0,1)), 0.0, 1.0), 1.5);
  float displacement = noise(position) * uIntensity * mask;
  float breathe = sin(uTime * 1.5) * 0.04;
  vec3 newPos = position + normal * (displacement + breathe);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}