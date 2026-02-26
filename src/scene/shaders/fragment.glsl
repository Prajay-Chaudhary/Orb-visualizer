varying vec3 vNormal;

void main() {
    float fresnel = dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
    float mask = 1.0 - clamp(fresnel, 0.0, 1.0);
    vec3 darkCore = vec3(0.002, 0.0, 0.02); 
    vec3 midPurple = vec3(0.35, 0.1, 0.75);
    vec3 rimLight = vec3(0.9, 0.8, 1.0);
    vec3 color = mix(darkCore, midPurple, pow(mask, 1.5));
    color += rimLight * pow(mask, 8.0) * 2.0; 
    gl_FragColor = vec4(color, 1.0);
}