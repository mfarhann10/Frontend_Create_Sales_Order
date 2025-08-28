# Frontend Create Sales Order

A simple sales order management frontend built with **React + TypeScript + Vite**.  
This project demonstrates usage of **React Hook Form (RHF)** for form handling and **Zustand** for global state management.

## Features
- ⚡️ Vite + React + TypeScript
- 📋 Form handling with [React Hook Form](https://react-hook-form.com/)
- 🗂️ Global state with [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- 🎨 Styled with Tailwind CSS
- 🔄 State persistence between pages (Sales Order Form → Result Page)

## Pages
- **Sales Order Form** → Input order data (managed with RHF).
- **Result Page** → Display submitted data from Zustand state.

## Project Structures
src/
 ├─ pages/
 │   ├─ SalesOrderForm.tsx   # Form with RHF
 │   └─ Result.tsx           # Show submitted data from Zustand
 ├─ store/
 │   └─ resultOrderStore.ts  # Zustand store
 ├─ main.tsx                 # Entry point
 └─ App.tsx                  # Router setup

## Tech Stack
- React 19
- Vite
- TypeScript
- React Hook Form
- Zustand
- Tailwind CSS

## Development Notes
- After submitting the form, data is stored in Zustand using setResultOrderData.
- The Result page fetches state with useResultOrderStore.
- methods.reset() from RHF is used to clear form after submit.

## Install
```bash
git clone git@github.com:mfarhann10/Frontend_Create_Sales_Order.git
cd Frontend_Create_Sales_Order
npm install
npm run dev



