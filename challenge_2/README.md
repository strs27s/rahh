# Challenge 2: Local Storage Data Tampering

This challenge demonstrates a common security pitfall where an application trusts data stored on the client-side in local storage.

## The Vulnerability

The application is a simple game where your score is stored in your browser's local storage. The game logic checks this score to determine if you have "won". Since local storage is controlled by the client, a user can easily modify the data stored there, bypassing the intended game mechanics.

## How to Run

1.  There is no server to run for this challenge. Simply open the `index.html` file in your web browser.
2.  You can do this by navigating to the `challenge_2` directory and opening the `index.html` file, or by running a simple web server in this directory (e.g., `python -m http.server` or `npx http-server`).

## Your Mission

1.  Open the `index.html` file and observe the game. You can click the button to increase your score, but reaching the winning score of 1000 would be tedious.
2.  Your goal is to "win" the game by tampering with the score.
3.  Use your browser's developer tools to inspect the local storage for the page. You should find a key named `userScore`.
4.  Modify the value of `userScore` to `1000` or higher.
5.  Refresh the page. You should now see the "You Win!" message.

This challenge teaches you that client-side storage like local storage is not secure and should not be trusted for sensitive data or for controlling application logic. Always validate and manage important data on the server-side.
