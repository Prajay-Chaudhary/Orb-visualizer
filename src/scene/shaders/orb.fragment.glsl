varying vec3 vNormal;

void main() {
  float fresnel = 1.0 - clamp(dot(normalize(vNormal), vec3(0,0,1)), 0.0, 1.0);
  vec3 darkCore = vec3(0.005, 0.0, 0.02); 
  vec3 midPurple = vec3(0.3, 0.1, 0.7);
  vec3 rimLight = vec3(0.9, 0.8, 1.0);
  vec3 color = mix(darkCore, midPurple, pow(fresnel, 1.5));
  color += rimLight * pow(fresnel, 8.0) * 2.5;
  gl_FragColor = vec4(color, 1.0);
}