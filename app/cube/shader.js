// Шейдер для стекла закаленного
const glassShader = {
    uniforms: {},
    vertexShader: `
      varying vec3 vNormal;
  
      void main() {
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
  
      void main() {
        vec3 normal = normalize(vNormal);
        float reflection = 0.5 + 0.5 * dot(normal, vec3(0.0, 0.0, 1.0));
        gl_FragColor = vec4(reflection, reflection, reflection, 1.0);
      }
    `,
  };
  