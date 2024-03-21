import torch
from ultralytics import YOLO
from roboflow import Roboflow

# Configuration
dataset_version = 2

# Load a dataset
rf = Roboflow(api_key="QQgIcFbpKGuWFRsrcMlI")
project = rf.workspace("naturenet").project("dangerous-animals-sk11h")
dataset = project.version(dataset_version).download("yolov8")
print("\ndataset " + dataset.location + " is used.\n")

# Find GPU
if torch.backends.mps.is_available():
    device = "mps"
elif torch.cuda.is_available():
    device = "cuda"
else:
    device = "cpu"
print("device " + device + " is used.\n")

# Load a model
model = YOLO('yolov8m.pt')
model.to(device)

# Train the model
model.train(data=dataset.location + "/data.yaml", epochs=30, imgsz=640)