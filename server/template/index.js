const defaultSnippet = `
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body {
      display: flex;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }

    .container {
      text-align: center;
    }

    .message {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .link {
      font-size: 16px;
      color: #007BFF;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <p class="message">This is default route. <br/>Go to <b><a class="link" href="http://localhost:3000/addresses">http://localhost:3000/addresses</a></b></p>
  </div>
</body>
</html>
`;

module.exports = defaultSnippet