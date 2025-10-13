# How to Build a Controlled TextInput with AsyncStorage in React Native

*A step-by-step guide to implementing persistent notes editing in your React Native app*

---

## The Problem

You have a house details screen with a notes field, but when users type in the TextInput and press "Save", nothing happens. The notes aren't being saved to AsyncStorage, and the form feels broken.

This is a common issue in React Native apps where developers use `defaultValue` instead of controlled components, or forget to properly manage local state.

## The Solution: Controlled Components

The key is to make your TextInput a **controlled component** by managing its value with local state and connecting it to your data persistence layer.

---

## Step 1: Understanding the Architecture

Before diving into the code, let's understand the data flow:

```
User types → Local State → Save Button → Context → AsyncStorage
```

1. **Local State**: Tracks what the user is typing in real-time
2. **Context**: Manages the global state and persistence
3. **AsyncStorage**: The actual storage mechanism

---

## Step 2: Setting Up Local State

First, you need to track the user's input with local state:

```typescript
import { useState, useEffect } from 'react';

export default function HouseDetails() {
    const [textNotes, setTextNotes] = useState("");
    
    // ... rest of your component
}
```

**Why local state?** Because you need to track what the user is typing *before* they save it. Without local state, the TextInput would be "uncontrolled" and you'd lose the user's input.

---

## Step 3: Initializing with Existing Data

When the component loads, you need to populate the TextInput with any existing notes:

```typescript
useEffect(() => {
    if (house) {
        setTextNotes(house.notes || "");
    }
}, [house]);
```

This ensures that if the house already has notes, they appear in the TextInput when the user opens the screen.

---

## Step 4: Making the TextInput Controlled

Now, connect your local state to the TextInput:

```typescript
<TextInput
    placeholder="Enter your notes"
    value={textNotes}  // Controlled by local state
    onChangeText={setTextNotes}  // Updates local state on every keystroke
    style={styles.notesInput}
    multiline
    numberOfLines={4}
/>
```

**Key points:**
- `value={textNotes}` makes it controlled
- `onChangeText={setTextNotes}` updates state on every keystroke
- No more `defaultValue` - that's for uncontrolled components

---

## Step 5: Saving to AsyncStorage

Create a save function that uses your context:

```typescript
const saveNotes = () => {
    updateHouse(id as string, { notes: textNotes });
    router.back(); // Optional: navigate back after saving
};
```

And connect it to your save button:

```typescript
<TouchableOpacity onPress={saveNotes}>
    <Text style={styles.saveButton}>Save</Text>
</TouchableOpacity>
```

---

## Step 6: Handling the ID Type Issue

Since `useLocalSearchParams()` can return either a string or string array, handle it properly:

```typescript
const saveNotes = () => {
    const houseId = Array.isArray(id) ? id[0] : id;
    updateHouse(houseId, { notes: textNotes });
    router.back();
};
```

---

## The Complete Solution

Here's how all the pieces fit together:

```typescript
import { useState, useEffect } from 'react';
import { useHouses } from "@/contexts/HousesContext";

export default function HouseDetails() {
    const { id } = useLocalSearchParams();
    const { houses, updateHouse } = useHouses();
    const [textNotes, setTextNotes] = useState("");

    const house = houses.find(h => h.id === id);

    // Initialize with existing notes
    useEffect(() => {
        if (house) {
            setTextNotes(house.notes || "");
        }
    }, [house]);

    // Save function
    const saveNotes = () => {
        const houseId = Array.isArray(id) ? id[0] : id;
        updateHouse(houseId, { notes: textNotes });
        router.back();
    };

    return (
        // ... your JSX
        <TextInput
            placeholder="Enter your notes"
            value={textNotes}
            onChangeText={setTextNotes}
            style={styles.notesInput}
            multiline
            numberOfLines={4}
        />
        
        <TouchableOpacity onPress={saveNotes}>
            <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
        // ... rest of JSX
    );
}
```

---

## Why This Works

1. **Controlled Component**: The TextInput value is controlled by `textNotes` state
2. **Real-time Updates**: `onChangeText` updates state on every keystroke
3. **Persistence**: The save function calls your context's `updateHouse` method
4. **Data Flow**: Local state → Context → AsyncStorage

---

## Common Pitfalls to Avoid

❌ **Don't use `defaultValue`** - This makes the component uncontrolled
❌ **Don't forget `useEffect`** - You need to initialize with existing data
❌ **Don't ignore the ID type** - `useLocalSearchParams` can return arrays
❌ **Don't save the original notes** - Save the local state value instead

---

## Key Takeaways

- **Controlled components** give you full control over form state
- **Local state** is essential for tracking user input before saving
- **useEffect** ensures existing data populates the form
- **Proper type handling** prevents runtime errors
- **Context + AsyncStorage** provides reliable persistence

This pattern works for any form field in React Native - not just notes. The same principles apply to editing names, descriptions, or any other text input in your app.

---

## Before vs After

### Before (Broken)
```typescript
<TextInput
    defaultValue={notes || "???"}  // ❌ Uncontrolled
    editable={false}  // ❌ Can't edit
/>
```

### After (Working)
```typescript
<TextInput
    value={textNotes}  // ✅ Controlled
    onChangeText={setTextNotes}  // ✅ Updates state
    // ✅ Editable by default
/>
```

---

*Happy coding! 🚀*

---

**Author**: AI Assistant  
**Date**: December 2024  
**Tags**: React Native, AsyncStorage, Controlled Components, Form Handling
