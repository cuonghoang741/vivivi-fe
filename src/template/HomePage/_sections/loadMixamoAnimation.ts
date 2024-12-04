import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { mixamoVRMRigMap } from '@/constants/vrm';

export function loadMixamoAnimation(url: string, vrm: any) {
  const loader = new FBXLoader();
  
  return loader.loadAsync(url).then((asset) => {
    const clip = THREE.AnimationClip.findByName(asset.animations, 'mixamo.com');
    const tracks: THREE.KeyframeTrack[] = [];

    const restRotationInverse = new THREE.Quaternion();
    const parentRestWorldRotation = new THREE.Quaternion();
    const _quatA = new THREE.Quaternion();
    const _vec3 = new THREE.Vector3();

    // Adjust with reference to hips height
    const motionHipsHeight = asset.getObjectByName('mixamorigHips').position.y;
    const vrmHipsY = vrm.humanoid?.getNormalizedBoneNode('hips').getWorldPosition(_vec3).y;
    const vrmRootY = vrm.scene.getWorldPosition(_vec3).y;
    const vrmHipsHeight = Math.abs(vrmHipsY - vrmRootY);
    const hipsPositionScale = vrmHipsHeight / motionHipsHeight;

    clip.tracks.forEach((track) => {
      const [mixamoRigName, propertyName] = track.name.split('.');
      const vrmBoneName = mixamoVRMRigMap[mixamoRigName];
      const vrmNodeName = vrm.humanoid?.getNormalizedBoneNode(vrmBoneName)?.name;
      const mixamoRigNode = asset.getObjectByName(mixamoRigName);

      if (vrmNodeName != null) {
        mixamoRigNode.getWorldQuaternion(restRotationInverse).invert();
        mixamoRigNode.parent.getWorldQuaternion(parentRestWorldRotation);

        if (track instanceof THREE.QuaternionKeyframeTrack) {
          // Handle rotation tracks
          for (let i = 0; i < track.values.length; i += 4) {
            const flatQuaternion = track.values.slice(i, i + 4);
            _quatA.fromArray(flatQuaternion);
            
            _quatA
              .premultiply(parentRestWorldRotation)
              .multiply(restRotationInverse);
            
            _quatA.toArray(flatQuaternion);
            flatQuaternion.forEach((v, index) => {
              track.values[index + i] = v;
            });
          }

          tracks.push(
            new THREE.QuaternionKeyframeTrack(
              `${vrmNodeName}.${propertyName}`,
              track.times,
              track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v))
            )
          );
        } else if (track instanceof THREE.VectorKeyframeTrack) {
          // Handle position tracks
          const value = track.values.map((v, i) => 
            (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) * hipsPositionScale
          );
          tracks.push(
            new THREE.VectorKeyframeTrack(
              `${vrmNodeName}.${propertyName}`,
              track.times,
              value
            )
          );
        }
      }
    });

    return new THREE.AnimationClip('vrmAnimation', clip.duration, tracks);
  });
} 