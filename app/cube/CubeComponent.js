"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from 'three';
import { gsap } from "gsap";

function CubeComponent() {
  const ref = useRef(null);
  let scene, camera, renderer, cubeGroup;
  let scale = 1;
  let material;

  const yellowShader = {
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
  
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    uniform float time; // Время для анимации

    // Функции для генерации шума
    vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x) {
        return mod289(((x*34.0)+1.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
    }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

    // Функция для вычисления значения Гауссовой функции
    float gaussian(float x, float sigma) {
      return exp(-x * x / (2.0 * sigma * sigma)) / (sqrt(2.0 * 3.14159265359) * sigma);
    }
    
    void main() {
      // Простое искажение на основе координат текстуры и нормали
      vec2 distortedUv = vUv + vNormal.xy * 0.1;
    
      // Создаем радужный эффект на основе искаженных UV-координат и времени
      float rainbowX = abs(snoise(vec3(distortedUv.x + time, distortedUv.y, 0.0)));
      float rainbowY = abs(snoise(vec3(distortedUv.x, distortedUv.y + time, 0.0)));
      float rainbowZ = abs(snoise(vec3(distortedUv.x, distortedUv.y, time)));
      vec3 rainbowColor = vec3(rainbowX, rainbowY, rainbowZ);
    
      // Имитация искажения цвета на основе искаженных UV-координат и времени
      float distortion = sin((distortedUv.x + time) * 10.0) * sin((distortedUv.y + time) * 10.0);
    
      // Вычисляем значение Гауссовой функции для размытия
      float blurAmount = gaussian(length(distortedUv - 0.5), 0.7); // Увеличьте 0.4 для более сильного размытия
    
      // Применяем радужный эффект и размытие к фрагменту
      gl_FragColor = vec4(rainbowColor, 0.5) + vec4(distortion, distortion, distortion, 0.0) * 0.1;
      gl_FragColor.rgb *= mix(1.0, blurAmount, 0.5); // Применяем размытие к цвету, усиливая его на 50%
      gl_FragColor.a /= 2.0; // Увеличиваем прозрачность в 7 раз
    }
  `
  };


  useEffect(() => {
    initThree();
    const currentRef = ref.current;

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (renderer) {
        renderer.dispose();
        currentRef.removeChild(renderer.domElement);
      }
    };
  }, []);

  const initThree = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(renderer.domElement);

    // Материал для граней
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xdca76d });

    const geometry = new THREE.BoxGeometry(2, 2, 2);

    // Создаем материал для куба на основе желтого шейдера
    material = new THREE.ShaderMaterial({
      vertexShader: yellowShader.vertexShader,
      fragmentShader: yellowShader.fragmentShader,
      transparent: true,
      uniforms: { time: { value: 0.0 } }, // Добавьте uniforms для времени
      side: THREE.DoubleSide // Устанавливаем материал двусторонним
    });

    // Создаем куб с этим материалом
    const cube = new THREE.Mesh(geometry, material);

    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

    cubeGroup = new THREE.Group();
    cubeGroup.add(cube);  // Сначала добавляем куб
    cubeGroup.add(edges); // Затем добавляем ребра

    // Загрузка SVG как текстуры
    const loader = new THREE.TextureLoader();
    loader.load('/Cube/Logo.svg', (texture) => {
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });

      const planeGeometry = new THREE.PlaneGeometry(1.8, 1.8); //(1.8, 1.8);
      planeGeometry.translate(0, -0.1, -0.8);

      const plane = new THREE.Mesh(planeGeometry, material);

      // Добавляем плоскость напрямую в сцену
      scene.add(plane);
    });

    scene.add(cubeGroup);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    camera.position.z = 5;
    animate();
  };


  const animate = () => {
    requestAnimationFrame(animate);
    // Обновляем значение time в шейдере (увеличьте это значение для более медленной анимации)
    if (material.uniforms.time) {
      material.uniforms.time.value += 0.001; // Увеличьте это значение для более медленной анимации
    }
    // Инвертируем направление вращения по оси X
    cubeGroup.rotation.x -= 0.001; // теперь куб будет вращаться вверх
    cubeGroup.rotation.y += 0.001;

    // Получаем SVG плоскость из cubeGroup
    const plane = cubeGroup.children.find(child => child.isMesh && child.material.map);

    // Если плоскость с SVG найдена, то обновляем ее положение и ориентацию
    if (plane) {
      plane.lookAt(camera.position);
    }

    renderer.render(scene, camera);
  };

  // Добавляем переменную для отслеживания предыдущего положения скролла
  let previousScrollY = 0;

  const onScroll = () => {
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - previousScrollY;

    // Увеличиваем или уменьшаем масштаб в зависимости от направления прокрутки
    if (deltaY > 0) {
      scale += 0.20;
    } else {
      scale -= 0.20;
    }

    // Если достигнута верхняя граница, сразу устанавливаем масштаб на минимум
    if (currentScrollY <= 0) {
      scale = 1;
    }

    // Если достигнута нижняя граница, устанавливаем масштаб на максимум
    if (currentScrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      scale = 20; // или другое максимальное значение, которое вы хотите установить
    }

    // Ограничиваем масштаб
    scale = Math.min(Math.max(scale, 1), 20);

    gsap.to(cubeGroup.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration: 1,
      ease: "power3.out"
    });

    // Изменяем прозрачность куба в зависимости от его масштаба
    let opacity = 1;
    if (scale >= 2 && scale < 3) {
      opacity = 0.8;
    } else if (scale >= 3 && scale < 4) {
      opacity = 0.6;
    } else if (scale >= 4) {
      opacity = 0.4;
    }

    cubeGroup.children.forEach(child => {
      if (child.material) {
        gsap.to(child.material, {
          opacity: opacity,
          duration: 1,
          ease: "power3.out"
        });
      }
    });

    previousScrollY = currentScrollY;
  };

  return (
    <div ref={ref} style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "black",
      zIndex: -1 // Это значение делает куб фоновым
    }}></div>
  );

}

export default CubeComponent;