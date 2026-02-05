## Project Summary
BundlyPlus is a premium digital subscription marketplace tailored for the Lebanese and global markets. It follows a high-end agency aesthetic inspired by Floka, featuring high-contrast UI, off-white backgrounds (#F8F8F8), massive typography, and smooth Framer Motion animations.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, Lucide React icons
- **Payments**: Stripe (Visa/Mastercard), OMT, Whish Money (Manual/API integration)

## Architecture
- `src/app`: Page routes and layouts
- `src/components/sections`: Main section components (Hero, Features, ProductGrid, etc.)
- `src/components/ui`: Reusable UI components (Dialog, Button, etc.)
- `src/lib`: Utility functions and third-party initializations (Stripe, etc.)

## User Preferences
- **Color Palette**: Off-white (#F8F8F8) background, Black (#000000) text, Vibrant Orange (#FF4F01) as primary brand color.
- **Typography**: Responsive "clamp" sizing for massive headlines.
- **Market Focus**: Specific emphasis on the Lebanese market with local payment methods (OMT, Whish) and support, while maintaining USD pricing.

## Project Guidelines
- Keep the aesthetic high-end and "agency-like".
- Use responsive font sizes for large typography.
- Ensure all interactive elements have smooth transitions or animations.
- Maintain case consistency in file imports (App Router standards).

## Common Patterns
- **Checkout Flow**: Opens a `CheckoutModal` with multiple payment options (Visa, OMT, Whish, Crypto).
- **Responsive Grids**: Usually 12-column grids on desktop, stacking on mobile.
- **Visual Badges**: Used for "SAVE %", "Verified", and "Instant Setup" indicators.
