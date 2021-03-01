from torchvision import transforms
import torch
import urllib
from PIL import Image
from flask import Flask, jsonify, request
import io
from json import *
import json

app = Flask(__name__)

transform_test = transforms.Compose([
    transforms.Resize((600, 600), Image.BILINEAR),
    transforms.CenterCrop((448, 448)),
    # transforms.RandomHorizontalFlip(),  # only if train
    transforms.ToTensor(),
    transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
])


model = torch.hub.load('nicolalandro/ntsnet-cub200', 'ntsnet', pretrained=True, **{'topN': 6, 'device':'cpu', 'num_classes': 200})
model.eval()



ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(filename):
    # xxx.png
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



def get_prediction(img):
    with torch.no_grad():
        top_n_coordinates, concat_out, raw_logits, concat_logits, part_logits, top_n_index, top_n_prob = model(img)
        _, predict = torch.max(concat_logits, 1)
        pred_id = predict.item()
        name = model.bird_classes[pred_id][4:].replace("_"," ")
        data = {'id': pred_id, 'name': name}
    print(data)
    return jsonify(data)

@app.route('/predict', methods=['POST'])
def predict():
    url = request.get_json(force=True)
    url = json.loads(url)['value']
    print(url)
    
    
    if request.method == 'POST':
        file = request.files.get('file')

   
        if file is None or file.filename == "":
            if url == None:
                return jsonify({'error': 'no file'})
            else:
                img = Image.open(urllib.request.urlopen(url))
                    
        else:    
            if not allowed_file(file.filename):
                return jsonify({'error': 'format not supported'})
            else:
                img = file.read()
                img = Image.open(io.BytesIO(img)) 
      
        
        
        scaled_img = transform_test(img)
        torch_images = scaled_img.unsqueeze(0)
        prediction = get_prediction(img=torch_images)

        return prediction


