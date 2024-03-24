"use client"; // This is a Client Component

export default function QuickExitButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="ml-4 rounded-md bg-red-500 px-4 py-2 font-bold text-white"
    >
      QUICK EXIT
    </button>
  );
}