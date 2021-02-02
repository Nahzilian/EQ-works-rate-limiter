---
## Live production:
The endpoint is available at:  
- https://eq-work-rate-limiter.herokuapp.com/

## Overview:
Dynamic endpoints for requesting GET HTTP requests, with throttle system implemented with a simple "Leaky bucket" algorithm. Endpoints includes normal sql queries and Join table sql queries

## Installation:
Navigate to where the "package.json" is and type in the command: 
```npm install```

## Dependencies:
The following dependencies are being used:
- cors: 2.8.5,
- dotenv: 8.2.0,
- express: 4.17.1,
- nodemon: 2.0.7,
- pg: 8.5.1,
- request-ip: 2.1.3


MIT License

Copyright (c) 2021 Duc Nguyen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
