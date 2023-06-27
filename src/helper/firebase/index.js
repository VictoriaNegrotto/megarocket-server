import * as admin from 'firebase-admin';

require('dotenv').config();

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJKK6APexlBFG5\nev6qwdqiHyjJ0rvVM/Y8cKzxb5s4/R+MiydR0cq/Zm5Z0m+v7hTlxHZPIfrHhMVR\n2Nvyd5p9Hl0ZUbb0U6k0+dUk1D1TL9tBF2HvfqoMQnSWeeSfF0zz7kr1UcXwy4Fe\ndcllrOWzBRByKTeT7AZGTliZq4WbDhTxtfrkPlV4N3Q9xZm/WexwfcpdfZvLaKFJ\nSGJtHCqDLkHWt6WBVsZ7MJVStsxsKlFIrSaKF9a6P0BgcunxbKSOZqucauNGzueo\nqM6OoX1qiy72ypnNrbVYA22BzveCRTGSWyYhUuLELzgbVoc8biv2AMW3YsJqEuCh\nxkZdX3yNAgMBAAECggEAArzS5YjlZ8yJJjD2OH5+sLhW1qq1038R1oNVpZi2VpS1\nsk50gKJBYNB09DQvQLticNJ3Jh8l9naOm7OlVQvrczd2EeTXf6shzhUP7jpIAvlP\ndRFrfxX/6Qtm4paSSQrJCWrQfb0yqFL34qa2UNo4OAyVS2oKYrESg5ahkXNqbcOo\nAp2lO5Eg0R4bbH4ZW+2H50LYqnup4sKu0Pr5ESozY03F5dHpLFcGGQJKBbRxJqmv\ntcLJ1MTl+nciqdhjo1hPAzeW/ieyY9DP0xyTZWKNphD7KbrThN1/AMxhoKxADcko\nOwG/UYLqEOeHW0dVQc0Gl4kd9MK5BSDm7Z3r8Vx/oQKBgQDv9O0E2MTiYeZZbl55\nU/B2qyi+xzq0QmiiGUnoL/MTzccDoxGPAJ345/XUoN6++2LQmJKOMB7eBIZPxJKl\ne7mIBXCNsXaLDkYALI6Bd/FJgK6LFYFgMOo5DJyiZzrwYgHGAP9E8/+wgJYNTJFd\nLsz0ZaxKLJYovNrvsAGIAGT1kQKBgQDWm7I+SUEGSmBy5ihWvwan+WnY1P9CzZR0\nRtDa7X2pHsDwTfAknCmfcLuId7spVpd2SLAyPTuMXggQrOkOJPIC7LtF+VZouKnX\n69BU9uZw/MS46oCxiPRRaggnI1bEuef370fd1KcZ3H/c0fWMAY0DKeMjQkX9Z2+N\nBk4vHNDpPQKBgQCzMxebCgOnCPPND/av5zbqeJJaP1Eg84NOo1Ile0GuJXwdxDdF\ns3FGRHy7SVRwDi7Sl07Drz4uEfT4N1ZJDWgWI/HVb5WW7ZbrZFscZyWj/dzb87iF\nzKHu7vM++ZbzlE28wFvi89Gcz7q/vdHFZEEdt5x+XGPbkoZyf9/04E6FcQKBgQCH\n48q3ufbcntf3qVk9pHP4hOvLCwQfLsGj5vt0xRDet8R/5Tn8VI3ekamNvhLbGCOM\nGHbJORCtzxTYSkTAWhCMXY4vvrRCVzvkp0Mhqb09KjD+zi5zPD9IFhXXgn78zqLd\n0bv18SNmMsMb9i6/WnQJ3soel2ZuEMMHz0hOeLaoGQKBgDGhtQvN8w88UgRKb3f8\nnYbs/D/7hRlrpQg3i0fdLxLe/r7hBqTr8eUfsbziv/E15pfSd9rdcuXMc8v5gLLJ\nveAP99tXXU50d9yXvnKR248nO5T74NMWtoNGd3Z6RkohvezO8szOWsHbf+NvQx2Q\nYujQZR9E4QyNw9qpcDk5Mz9k\n-----END PRIVATE KEY-----\n',
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_url: process.env.FIREBASE_FIREBASE_AUTH_URI,
    token_url: process.env.FIREBASE_TOKEN_URI,
    auth_auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
});

export default firebaseApp;
