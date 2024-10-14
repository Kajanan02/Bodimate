import React, { useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { Viewer } from 'photo-sphere-viewer';
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import IMG360 from '../../assets/IMG20241012233641.jpg'; // Your 360 image

function DegreeView(props) {
    const viewerRef = useRef(null);

    const initializeViewer = () => {
        console.log('Viewer container:', viewerRef.current); // Debugging
        if (viewerRef.current) {
            const viewer = new Viewer({
                panorama: IMG360, // Ensure the path is correct and the image is 360-compatible
                container: viewerRef.current,
                size: { width: '100%', height: '500px' },
            });

            return () => {
                viewer.destroy(); // Clean up when unmounting
            };
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            onEntered={initializeViewer}  // Initialize viewer only when modal is fully opened
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title || '360 Degree View'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <div ref={viewerRef} style={{ width: '100%', height: '500px' }}></div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={props.onHide}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default DegreeView;
