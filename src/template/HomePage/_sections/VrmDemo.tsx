'use client'

import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { loadMixamoAnimation } from '@/utils/vrm';
// Button of nextui
import { Button } from "@nextui-org/react"


const VrmDemo = () => {
    const demoActions = [
        {
            "name": "Dance for me",
            "url": "/assets/animations/Snake Hip Hop Dance.fbx"
        },
        {
            "name": "Give me a kiss",
            "url": "/assets/animations/Blow A Kiss.fbx"
        },
        {
            "name": "Send me private photos",
            "url": "/assets/animations/Send Me Private Photos.fbx",
            "is_premium": true
        }
    ]

  const containerRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [currentVrm, setCurrentVrm] = useState(null);
  const [currentMixer, setCurrentMixer] = useState<THREE.AnimationMixer | null>(null);
  const clock = useRef(new THREE.Clock());

  useEffect(() => {
    const heightAcceptPercent = 60
    const height = window.innerHeight * heightAcceptPercent / 100
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const newScene = new THREE.Scene();
    const newCamera = new THREE.PerspectiveCamera(30.0, window.innerWidth / window.innerHeight, 0.1, 20.0);
    const newRenderer = new THREE.WebGLRenderer({
      alpha: true,  // Enable transparency
      antialias: true,
      premultipliedAlpha: false  // Add this to ensure proper transparency
    });

    // Set clear color to fully transparent
    newRenderer.setClearColor(0x000000, 0);
    newRenderer.setClearAlpha(0);  // Add this line
    newScene.background = null;

    // Setup scene
    newCamera.position.set(0.0, 1.0, 5.0);
    
    const width = containerRef.current.clientWidth;
   
    newRenderer.setSize(width, height);
    newRenderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(newRenderer.domElement);

    // Add lights
    const light = new THREE.DirectionalLight(0xffffff, Math.PI);
    light.position.set(1.0, 1.0, 1.0).normalize();
    newScene.add(light);

    // Setup controls
    const controls = new OrbitControls(newCamera, newRenderer.domElement);
    controls.screenSpacePanning = true;
    controls.target.set(0.0, 1.0, 0.0);
    controls.update();

    // Background texture loading
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/assets/images/bg-demo.png',
      function (texture) {
        // Optional: add fade-in effect
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0
        });

        // Create a scene background with the texture
        newScene.background = texture;

        // Fade in the background
        const fadeIn = () => {
          if (material.opacity < 1) {
            material.opacity += 0.02;
            requestAnimationFrame(fadeIn);
          }
        };
        fadeIn();

        // Handle resize to maintain aspect ratio
        function resizeBackground() {
          const canvas = newRenderer.domElement;
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          const aspect = width / height;
          const imageAspect = texture.image.width / texture.image.height;

          if (aspect > imageAspect) {
            texture.offset.x = 0;
            texture.repeat.x = 1;
            texture.offset.y = (1 - aspect / imageAspect) / 2;
            texture.repeat.y = aspect / imageAspect;
          } else {
            texture.offset.x = (1 - imageAspect / aspect) / 2;
            texture.repeat.x = imageAspect / aspect;
            texture.offset.y = 0;
            texture.repeat.y = 1;
          }
        }

        // Initial resize
        resizeBackground();

        // Handle window resize
        window.addEventListener('resize', resizeBackground);

        // Cleanup resize listener
        return () => window.removeEventListener('resize', resizeBackground);
      },
      undefined, // Progress callback
      () => {
        // Error callback - keep background transparent if image fails to load
        console.warn('Background image failed to load, keeping transparent background');
        newScene.background = null;
      }
    );

    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (currentMixer) {
        currentMixer.update(clock.current.getDelta());
      }

      if (currentVrm) {
        currentVrm.update(clock.current.getDelta());
      }

      newRenderer.render(newScene, newCamera);
    };

    animate();

    // Cleanup
    return () => {
      containerRef.current?.removeChild(newRenderer.domElement);
      newRenderer.dispose();
    };
  }, []);
  
  // Add function to load and play animations
  const loadAnimation = async (animationUrl: string) => {
    if (!currentVrm || !scene) return;

    // Reset any existing animation
    if (currentMixer) {
      currentMixer.stopAllAction();
      currentMixer.uncacheRoot(currentVrm.scene);
    }

    // Create new mixer for VRM
    const mixer = new THREE.AnimationMixer(currentVrm.scene);
    setCurrentMixer(mixer);

    try {
      // Load and play animation
      const clip = await loadMixamoAnimation(animationUrl, currentVrm);
      mixer.clipAction(clip).play();
    } catch (error) {
      console.error('Failed to load animation:', error);
    }
  };


  // Load VRM model
  useEffect(() => {
    if (!scene) return;

    const loader = new GLTFLoader();
    loader.crossOrigin = 'anonymous';

    loader.register((parser) => {
      return new VRMLoaderPlugin(parser, { boneVisibility: false });
    });

    loader.load(
      '/assets/vrm/test.vrm',
      (gltf) => {
        const vrm = gltf.userData.vrm;
        
        if (currentVrm) {
          scene.remove(currentVrm.scene);
          VRMUtils.deepDispose(currentVrm.scene);
        }

        setCurrentVrm(vrm);
        scene.add(vrm.scene);
        VRMUtils.rotateVRM0(vrm);
      },
      (progress) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),
      (error) => console.error(error)
    );


  }, [scene]);

  // Update animation loop
  useEffect(() => {
    if (!scene || !camera || !renderer) return;

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (currentMixer) {
        currentMixer.update(clock.current.getDelta());
      }

      if (currentVrm) {
        currentVrm.update(clock.current.getDelta());
      }

      renderer.render(scene, camera);
    };

    animate();

  }, [scene, camera, renderer, currentMixer, currentVrm]);

  useEffect(() => {
    loadAnimation('/assets/animations/Idle.fbx');
  }, [currentVrm]);

  return (
    <div className="w-full">
        <div className="flex gap-2 justify-center my-10">
            {demoActions.map((action) => (
                <Button className="bg-white px-6 text-black rounded-full" onClick={() => loadAnimation(action.url)}>{action.name}</Button>
            ))}
        </div>
        <div 
            ref={containerRef} 
            style={{ 
                background: 'transparent',
                width: '100%',
                height: 'auto'
            }} 
        />
   
    </div>
  )

};

export default VrmDemo;
