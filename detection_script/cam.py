import cv2
import requests
import os
from datetime import datetime

def capture_frames():
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not open video capture device.")
        return
    
    frame_count = 0
    
    try:
        while True:
            # Capture frame-by-frame
            ret, frame = cap.read()
            
            if not ret:
                print("Error: Could not read frame.")
                break
            
            if frame_count % 100 == 0:
                # Convert frame to JPEG format in memory
                _, img_encoded = cv2.imencode('.jpg', frame)
                
                # Generate filename with date and time
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = f"frame_{timestamp}.jpg"
                
                # Send frame data to API route
                upload_url = "http://127.0.0.1:5000/upload"
                files = {'file': (filename, img_encoded.tostring(), 'image/jpeg')}
                response = requests.post(upload_url, files=files)
                
                if response.status_code == 200:
                    print("Frame processed successfully")
                else:
                    print(f"Error processing frame: {response.text}")

            frame_count += 1
            
            cv2.imshow('Frame', frame)
            
            # Press 'q' to exit the loop
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
    finally:
        # When everything done, release the capture
        cap.release()
        cv2.destroyAllWindows()

if __name__ == '__main__':
    capture_frames()
