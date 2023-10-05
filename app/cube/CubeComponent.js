"use client";
import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from 'three';
import { gsap } from "gsap";

function throttle(func, delay) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= delay) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
}


function CubeComponent() {
  const ref = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const cubeGroupRef = useRef(null);
  const scaleRef = useRef(1);
  const materialRef = useRef(null);
  const previousScrollYRef = useRef(0);
  const planeRef = useRef(null); // Добавлено для оптимизации вызова анимации
  const planeMaterialRef = useRef(null);

  const FOV = 75;
  const NEAR = 0.1;
  const FAR = 1000;
  const BOX_SIZE = 2;
  const LIGHT_COLOR = 0xffffff;
  const EDGE_COLOR = 0xdca76d;


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

    vec3 baseCoffeeColor = vec3(220.0/255.0, 167.0/255.0, 109.0/255.0); // #dca76d

    
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
  
      // Создаем эффект на основе искаженных UV-координат и времени
      float noiseX = abs(snoise(vec3(distortedUv.x + time, distortedUv.y, 0.0)));
      float noiseY = abs(snoise(vec3(distortedUv.x, distortedUv.y + time, 0.0)));
      float noiseZ = abs(snoise(vec3(distortedUv.x, distortedUv.y, time)));
      
      // Модулируем кофейный цвет шумом
      vec3 coffeeShade = baseCoffeeColor * (0.5 + 0.5 * vec3(noiseX, noiseY, noiseZ));
      
      // Имитация искажения цвета на основе искаженных UV-координат и времени
      float distortion = sin((distortedUv.x + time) * 10.0) * sin((distortedUv.y + time) * 10.0);
  
      // Вычисляем значение Гауссовой функции для размытия
      float blurAmount = gaussian(length(distortedUv - 0.5), 0.7);
  
      // Применяем эффект кофейных оттенков и размытие к фрагменту
      gl_FragColor = vec4(coffeeShade, 0.5) + vec4(distortion, distortion, distortion, 0.0) * 0.1;
      gl_FragColor.rgb *= mix(1.0, blurAmount, 0.5); // Применяем размытие к цвету, усиливая его на 50%
      gl_FragColor.a /= 3.0; // Увеличиваем прозрачность в 2 раза
  }
  `
  };

  const animate = useCallback(() => {
    requestAnimationFrame(animate);
    if (materialRef.current.uniforms.time) {
      materialRef.current.uniforms.time.value += 0.01;
    }
    cubeGroupRef.current.rotation.x -= 0.001;
    cubeGroupRef.current.rotation.y += 0.001;

    if (planeRef.current) {
      planeRef.current.lookAt(cameraRef.current.position);
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, []);

  const onScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

    const isNearStart = currentScrollY < 10;  // Находимся близко к началу
    const isNearEnd = (maxScrollY - currentScrollY) < 10;  // Находимся близко к концу

    // Если пользователь в начале или в конце страницы
    if (isNearStart || isNearEnd) {
      scaleRef.current = 1;  // минимальный размер
    } else {
      // Интерполируем значение масштаба на основе текущей позиции прокрутки
      scaleRef.current = 20;
    }

    gsap.to(cubeGroupRef.current.scale, {
      x: scaleRef.current,
      y: scaleRef.current,
      z: scaleRef.current,
      duration: 1.5,  // увеличено с 1 до 1.5 для более плавной анимации
      ease: "power3.out"
    });

    // Предположим, что начальное значение scaleRef.current = 1
    const initialScale = 1;

    // Анимация изменения цвета логотипа на черный при изменении scaleRef
    const targetColor = new THREE.Color(scaleRef.current !== initialScale ? "black" : "white");
    if (planeMaterialRef.current) {
      gsap.to(planeMaterialRef.current.color, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        duration: 1.5,
        ease: "power3.out"
      });
    }

    previousScrollYRef.current = currentScrollY;
  }, []);



  const initThree = useCallback(() => {
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(rendererRef.current.domElement);
    // Материал для граней
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xdca76d });

    const geometry = new THREE.BoxGeometry(2, 2, 2);

    // Создаем материал для куба на основе желтого шейдера
    materialRef.current = new THREE.ShaderMaterial({
      vertexShader: yellowShader.vertexShader,
      fragmentShader: yellowShader.fragmentShader,
      transparent: true,
      uniforms: { time: { value: 0.0 } }, // Добавьте uniforms для времени
      side: THREE.DoubleSide // Устанавливаем материал двусторонним
    });


    // Создаем куб с этим материалом
    const cube = new THREE.Mesh(geometry, materialRef.current);

    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

    const cubeGroup = new THREE.Group();
    cubeGroupRef.current = cubeGroup;

    cubeGroup.add(cube);  // Сначала добавляем куб
    cubeGroup.add(edges); // Затем добавляем ребра

    // Load SVG as a texture
    const loader = new THREE.TextureLoader();
    loader.load('/Cube/Logo.svg', (texture) => {
      texture.anisotropy = rendererRef.current.capabilities.getMaxAnisotropy();
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0,
        depthWrite: false
      });

      planeMaterialRef.current = material;


      const planeGeometry = new THREE.PlaneGeometry(1.8, 1.8);
      planeGeometry.translate(0, -0.1, -0.8);

      const plane = new THREE.Mesh(planeGeometry, material);

      // Add the plane directly to the scene
      sceneRef.current.add(plane);
      planeRef.current = plane;  // Сохраняем ссылку на объект plane
      // Установите начальную прозрачность логотипа в 1 после успешной загрузки
      planeMaterialRef.current.opacity = 1;

    }, undefined, (error) => {
      console.error("Error loading texture:", error);
    });

    sceneRef.current.add(cubeGroup); // Only add the cubeGroup once

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    sceneRef.current.add(light); // Fixed the reference error

    cameraRef.current.position.z = 5; // Fixed the reference error
    animate();
  }, [yellowShader.vertexShader, yellowShader.fragmentShader, animate]);


  useEffect(() => {
    initThree();

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', throttle(onScroll, 1000));

    // Сохраните текущее значение ref.current в переменной
    const currentRef = ref.current;

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);

      // Улучшенная очистка ресурсов
      sceneRef.current.children.forEach(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      if (rendererRef.current) {
        rendererRef.current.dispose();
        // Используйте сохраненное значение ref вместо ref.current
        currentRef.removeChild(rendererRef.current.domElement);
      }
    };
  }, [initThree, onScroll]);

  return (
    <div ref={ref} style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "black",
      zIndex: -1
    }}></div>
  );
}

export default CubeComponent;