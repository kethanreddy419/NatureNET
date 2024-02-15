from ultralytics import YOLO

model = YOLO('yolov8n.pt')
# path to data.yaml file in the dataset of YOLOv8 format
data_path = '/Users/jaejin_cha/Documents/TAMU/Spring_2024/csce482/nature-net/cv_animal/dangerous-animals.v1i.yolov8/data.yaml'
model.train(data=data_path, epochs=20, imgsz=640, device='mps')


results = model(['b1.jpg', 'b2.jpg', 'c1.jpg'])

i = 0

for result in results:
    i = i + 1
    boxes = result.boxes
    probs = result.probs
    result.show()
    result.save(filename='result' + i + '.jpg')