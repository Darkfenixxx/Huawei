import cv2 as cv

class Camera:
    def __init__(self, camera_id=0):
        self.camera_id = camera_id
        self.capture =cv.VideoCapture(camera_id)
        if not self.capture.isOpened():
            raise ValueError(f"Camara no se pudo abrir {camera_id} .")

    def get_frame(self):
        ret, frame = self.capture.read()
        if not ret:
            raise RuntimeError("No se pudo leer el cuadro de la cámara.")
        return frame

    def release(self):
        self.capture.release()

    def __del__(self):
        self.release()
