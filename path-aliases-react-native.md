# How to Use Path Aliases in React Native with Expo: A Complete Guide

## The Problem with Relative Imports

If you've worked on a React Native project, you've probably seen imports like this:

```typescript
import { useHouses } from '../../../contexts/HousesContext';
import { uploadImage } from '../../../../utils/cloudinary';
import { API_URL } from '../../../../../config/env';
```

These relative paths are hard to read, break when you move files, and make refactoring painful. There's a better way.

## Enter Path Aliases: The `@` Symbol

Path aliases let you use clean, absolute-style imports from your project root:

```typescript
import { useHouses } from '@/contexts/HousesContext';
import { uploadImage } from '@/utils/cloudinary';
import { API_URL } from '@/config/env';
```

The `@` symbol maps to your project root, making imports consistent and maintainable.

## Setting Up Path Aliases in Expo

Setting this up in Expo requires two steps: TypeScript configuration and Babel configuration.

### Step 1: Configure TypeScript

First, update your `tsconfig.json` to define the path alias:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

This tells TypeScript that `@/*` maps to `./*` (your project root). TypeScript will now understand these imports and provide autocomplete.

### Step 2: Configure Babel (The Missing Piece)

TypeScript alone isn't enough. React Native uses Babel to transform your code, so Babel also needs to resolve these paths.

Install the required plugin:

```bash
npm install --save-dev babel-plugin-module-resolver
```

Or if you're using Bun:

```bash
bun add -d babel-plugin-module-resolver
```

Then update your `babel.config.js`:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
          },
        },
      ],
      // ... your other plugins
    ],
  };
};
```

The `module-resolver` plugin tells Babel how to resolve the `@` alias at runtime.

### Step 3: Restart Your Metro Bundler

After making these changes, restart your Metro bundler:

```bash
# Stop your current expo start process (Ctrl+C)
# Then restart it
expo start --clear
```

The `--clear` flag clears the Metro cache, ensuring your new configuration is picked up.

## Troubleshooting Common Issues

### Issue 1: "Maximum call stack size exceeded" during installation

If you encounter this error when installing `babel-plugin-module-resolver`, try:

**Solution 1: Clear npm cache**
```bash
npm cache clean --force
npm install --save-dev babel-plugin-module-resolver
```

**Solution 2: Use legacy peer deps**
```bash
npm install --save-dev babel-plugin-module-resolver --legacy-peer-deps
```

**Solution 3: Clean reinstall**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm install --save-dev babel-plugin-module-resolver
```

### Issue 2: Module not found errors

If you're getting "Module not found" errors after setup:

1. Verify your `babel.config.js` has the `module-resolver` plugin
2. Make sure you restarted Metro with `--clear`
3. Check that your file paths are correct (case-sensitive on some systems)
4. Verify the alias matches your `tsconfig.json` paths

### Issue 3: TypeScript errors but runtime works

If TypeScript complains but the app runs fine, check:
- Your `tsconfig.json` includes the correct file patterns
- The `paths` configuration matches your Babel alias
- Your IDE has reloaded the TypeScript configuration

## Advanced Configuration

### Multiple Aliases

You can define multiple aliases for different directories:

```javascript
// babel.config.js
[
  'module-resolver',
  {
    root: ['./'],
    alias: {
      '@': './',
      '@components': './components',
      '@utils': './utils',
      '@contexts': './contexts',
    },
  },
]
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@components/*": ["./components/*"],
      "@utils/*": ["./utils/*"],
      "@contexts/*": ["./contexts/*"]
    }
  }
}
```

Then use them like:

```typescript
import { Button } from '@components/Button';
import { formatDate } from '@utils/dateHelpers';
```

### Custom Root Directory

If your source code is in a `src` directory:

```javascript
// babel.config.js
[
  'module-resolver',
  {
    root: ['./src'],
    alias: {
      '@': './src',
    },
  },
]
```

## Best Practices

1. **Keep it simple**: Start with a single `@` alias for the root
2. **Be consistent**: Use the same alias pattern across your project
3. **Document it**: Add a comment in your config files explaining the alias
4. **Update imports gradually**: You don't need to refactor everything at once

## Benefits

- ✅ **Cleaner imports**: No more `../../../` chains
- ✅ **Easier refactoring**: Move files without breaking imports
- ✅ **Better autocomplete**: IDEs understand your project structure
- ✅ **Improved readability**: Clear, absolute-style paths
- ✅ **Team consistency**: Everyone uses the same import style

## Conclusion

Path aliases make React Native development smoother. With a few configuration changes, you can replace messy relative imports with clean, maintainable paths. Your future self (and your teammates) will thank you.

---

**Pro tip**: If you're starting a new project, set this up from day one. It's much easier than refactoring later!

Have you set up path aliases in your React Native projects? Share your experience in the comments below!

