import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve) => {
      let timeoutId: number = 0;
      
      // Add timeout for mobile
      const mobileTimeout = () => {
        timeoutId = window.setTimeout(() => {
          console.log('Character loading timeout, resolving with null');
          resolve(null); // Resolve with null instead of rejecting
        }, 8000); // 8 second timeout
      };

      mobileTimeout();

      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            clearTimeout(timeoutId);
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            clearTimeout(timeoutId);
            console.error("Error loading GLTF model:", error);
            resolve(null); // Resolve with null instead of rejecting to prevent loading stall
          }
        );
      } catch (err) {
        clearTimeout(timeoutId);
        console.error("Character loading error:", err);
        resolve(null); // Resolve with null instead of rejecting
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
