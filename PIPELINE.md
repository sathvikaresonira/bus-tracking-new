# Project Pipeline

To ensure code quality and stability, please follow this pipeline before pushing changes:

## 1. Linting
Check for code style and potential errors.
```bash
npm run lint
```

## 2. Testing
Run the test suite to verify functionality.
```bash
npm test
```

## 3. Building
Build the project for production.
```bash
npm run build
```

## Automated Check
You can run this single command to verify everything:
```bash
npm run lint && npm test run && npm run build
```
