import torch
from ultralytics import YOLO

# Load a model
# model = YOLO('path/to/best.pt')  # Load a custom model
model = YOLO('best.pt')  # Load a pre-trained model

# Specify test data
folder_path = './cv_animal/test_data/'
image_path = [
    folder_path + "alligator.jpg",
    folder_path + "bear.jpg",
    folder_path + "boar.jpg",
    folder_path + "cougar.jpg",
    folder_path + "coyote.jpg",
    folder_path + "deer.jpg",
    folder_path + "fox.jpg",
    folder_path + "moose.jpg",
    folder_path + "raccoon.jpg",
    folder_path + "skunk.jpg",
    folder_path + "snake.jpg",
    folder_path + "wolf.jpg"
]

# Find GPU
if torch.backends.mps.is_available():
    device = "mps"
elif torch.cuda.is_available():
    device = "cuda"
else:
    device = "cpu"
print("\ndevice " + device + " is used.")
model.to(device)

# Predict with the model
results = model(image_path, save=True)