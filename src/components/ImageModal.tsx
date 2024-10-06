import React, { useRef, useEffect } from 'react';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onRequestClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  onRequestClose,
}) => {
  const lightGallery = useRef<any>(null);

  useEffect(() => {
    if (isOpen && lightGallery.current) {
      lightGallery.current.openGallery();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (lightGallery.current) {
        lightGallery.current.destroy(true);
        lightGallery.current = null;
      }
    };
  }, []);

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <LightGallery
        onInit={(detail) => {
          lightGallery.current = detail.instance;
        }}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={[{ src: imageUrl, thumb: imageUrl }]}
      />
    </div>
  );
};

export default ImageModal;