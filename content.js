document.documentElement.innerHTML = `
<html>
  <head>
    <title>this website is blocked. nice try nerd</title>
  </head>
  <body style="font-family: Arial, Helvetica, sans-serif;" >
    <div style="width: 80%; display: flex; flex-direction: column; align-items: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
      <div style="text-align: center">
        <div style="font-size: 3rem; letter-spacing: 0.3rem; margin-bottom: 1rem;">Buddy, what happened to locking in?</div>
        <br />
        just take a moment and think to yourself, "what am i doing with my life?"
        <br />
      </div>

      <br/>

      <iframe src="https://giphy.com/embed/q9EUjcUOT1aYE" width="480" height="245" frameBorder="0" class="giphy-embed" allowFullScreen>
      </iframe>
      <!-- Block Giphy Embed hover popup -->
      <div style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"></div>
    </div>
  </body>
</html>
`;
