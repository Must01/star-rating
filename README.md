## 📄 README.md

# Star Rating Component
![20251230-1415-07 6266813](https://github.com/user-attachments/assets/b97ff2d4-6e9a-4c55-8d0a-0ca6d91af540)

A reusable, accessible, and interactive star rating component built with React and Tailwind CSS.

## ✨ Features

- **Interactive Hover:** Stars highlight as the user moves their mouse over them.
- **Persistent Selection:** Clicking a star sets a permanent rating.
- **Dynamic Scaling:** Supports any number of stars via the `numStar` prop.
- **Fully Tested:** Comprehensive test suite using Vitest and React Testing Library covering rendering, interaction, and state persistence.
- **Responsive Design:** Styled with Tailwind CSS for modern, flexible layouts.

## 🛠️ Tech Stack

- **Framework:** React 18+
- **Styling:** Tailwind CSS
- **Icons:** React Icons (Font Awesome)
- **Testing:** Vitest & React Testing Library

## 🚀 Getting Started

### Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install

```

### Usage

Import the component and pass the desired number of stars:

```TSX
import StarRating from "./components/StarRating";

function App() {
  return <StarRating numStar={5} />;
}
```

## 🧪 Testing

The component is verified against five core behaviors:

1. **Correct Count:** Renders the exact number of stars passed in props.
2. **Initial State:** Starts with zero stars selected (all gray).
3. **Click Logic:** Correctantly updates and holds the rating when clicked.
4. **Hover Logic:** Temporarily highlights stars on `mouseEnter` and reverts on `mouseLeave`.
5. **State Priority:** Ensures the hover state overrides the click state visually without losing the saved rating.

To run the tests:

```BASH
npm run test

```

## 🧩 Component Logic

The component determines the color of each star using a "Short-Circuit" evaluation to prioritize the user's immediate action:

```TSX
// Logic used for star coloring
const isActive = starValue <= (hover || stars);
```
