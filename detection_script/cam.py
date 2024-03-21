import cv2
import os
import requests

def capture_frames():
    save_dir = "captured_frames"
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)
    
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
                frame_name = os.path.join(save_dir, f"frame_{frame_count}.jpg")
                cv2.imwrite(frame_name, frame)
                print(f"Saved {frame_name}")

                upload_url = "http://127.0.0.1:5000/upload"
                files = {'file': open(frame_name, 'rb')}
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
