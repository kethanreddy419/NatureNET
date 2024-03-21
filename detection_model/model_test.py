import torch
from ultralytics import YOLO

def predict_with_yolo(image_path):
    # Load a pre-trained model
    model = YOLO('best.pt')

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

    return results

# # Example usage:
# image_file_path = 'path/to/your/image.jpg'
# prediction_results = predict_with_yolo(image_file_path)
