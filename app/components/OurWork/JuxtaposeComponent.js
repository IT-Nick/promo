import { useEffect, useRef } from 'react';
import Juxtapose from 'juxtaposejs';

const JuxtaposeComponent = ({ id, initialPosition, imageUrlBefore, imageUrlAfter }) => {
  const juxtaposeRef = useRef();

  useEffect(() => {
    const options = {
      id: `juxtapose-${id}`,
      startingPosition: initialPosition,
      showLabels: true, // You can customize this based on your needs
      showCredits: false, // You can customize this based on your needs
      animate: true, // You can customize this based on your needs
      slider: true, // You can customize this based on your needs
    };

    const juxtapose = new Juxtapose(options);
    juxtapose.addSlider(imageUrlBefore);
    juxtapose.addSlider(imageUrlAfter);

    // Attach the Juxtapose instance to the ref
    juxtaposeRef.current = juxtapose;

    // Clean up when the component unmounts
    return () => {
      juxtapose.destroy();
    };
  }, [id, initialPosition, imageUrlBefore, imageUrlAfter]);

  return <div id={`juxtapose-${id}`} ref={juxtaposeRef} />;
};

export default JuxtaposeComponent;