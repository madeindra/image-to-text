# Image to Text (OCR)

Simple Image to Text using Tesseract.js for the OCR.

![preview](https://raw.githubusercontent.com/madeindra/image-to-text/master/preview.png "preview")

## Installation

1. Clone the repository
```
git clone https://github.com/madeindra/image-to-text.git
```

2. Install dependencies
```
npm install
```

3. Build the project
```
npm run build
```

4. Export environment variables:
```
export PORT=3000
export HOST=localhost
```

5. Start the server 
```
npm start
```

## Usage

1. Open your browser and visit `http://localhost:3000`

2. Select your image file (try `sample.png` from this repository)

3. Click `Read Image` button

4. Result will be shown in the textarea

## API Documentation

### Recognize Text in an Image

POST /recognize

```
form/multipart-data

file: yourimagefile
```

## TODOs
- [X] Homepage
- [X] Multiple language support
- [ ] Adjust image adjustment before OCR
- [ ] Docker support
- [ ] Testings
