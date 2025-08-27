# Challenge 3: JWT Security - Weak Secret

This challenge demonstrates a critical security vulnerability in applications that use JSON Web Tokens (JWTs) for session management: the use of a weak or guessable secret key for signing tokens.

## The Security Principle

JWTs are often used to manage user sessions. A token contains claims (e.g., username, role) and is signed by the server with a secret key. The signature ensures that the token has not been tampered with. If an attacker can guess the secret key, they can create their own valid tokens with forged claims, potentially escalating their privileges.

## How to Run the Application

1.  Navigate to the `challenge_3` directory.
2.  Install the dependencies: `npm install`
3.  Start the server: `npm start`
4.  Open your browser and go to `http://localhost:3001`.

## Your Objective: Security Assessment

Your task is to assess the security of the JWT implementation in this application. You will attempt to escalate your privileges from a regular user to an administrator.

1.  **Login**: Use the web interface to log in with any username.
2.  **Inspect the Token**: Use your browser's developer tools to find the `session_token` cookie. Copy its value.
3.  **Decode the Token**: Use a JWT debugger (like the one on jwt.io) to decode the token. Observe the payload, which should contain a claim like `"isAdmin": false`.
4.  **Identify the Vulnerability**: The application uses the HS256 signing algorithm, which relies on a shared secret. The vulnerability here is that the secret is weak and easily guessable. The secret is `'secretkey'`.
5.  **Forge a New Token**: Modify the payload of the token to change the claim to `"isAdmin": true`. Using the same debugger and the discovered weak secret (`'secretkey'`), a new signature will be generated for your modified token.
6.  **Gain Admin Access**: Replace the original `session_token` cookie value in your browser with the newly forged token.
7.  **Verify**: Refresh the dashboard page. If successful, you should now see the administrator panel.

This exercise highlights the importance of using strong, unpredictable secret keys for signing JWTs to prevent privilege escalation vulnerabilities.
