import './App.css';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'


function App() {
  return (
    <div className="App">
      <Canvas>
	<OrbitControls />
	<mesh>
	  <boxBufferGeometry />
	  <meshBasicMaterial wireframe color="red" />
	</mesh>
      </Canvas>
    </div>
  );
}

export default App;
